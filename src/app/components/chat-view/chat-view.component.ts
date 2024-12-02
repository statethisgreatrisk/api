import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Chat, ChatMessage, Code, Project, User, Variable, View } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { selectChats, selectCodes, selectMainProject, selectUser, selectVariables, selectView } from '../../store/selectors/app.selector';
import { Subscription, combineLatest } from 'rxjs';
import { CodeViewService } from '../../services/code-view.service';
import { ResizableWidthDirective } from '../../directives/resizable-width.directive';
import { createChat, createChatError, createChatSuccess, streamChat, updateChat, updateChatError, updateChatSuccess } from '../../store/actions/app.action';
import { Actions, ofType } from '@ngrx/effects';
import ObjectId from 'bson-objectid';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-chat-view',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, NgClass, FormsModule, ResizableWidthDirective],
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss'
})
export class ChatViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  variables: Variable[] | null = null;
  codes: Code[] | null = null;
  chats: Chat[] | null = null;
  chat: Chat | null = null;

  code: string = '';
  name: string = '';
  version: string | number = '';
  versionId: string = '';
  versionStatus: string = '';

  text: string = '';
  running: boolean = false;
  showTotalTokens: boolean = false;

  models: string[] = ['gpt-4o', 'gpt-4o-mini'];

  apiKeyId: string = ''; // variable _id
  modelId: string = ''; // model name
  historyId: string = '';

  apiKeyDropdown: boolean = false;
  modelDropdown: boolean = false;
  historyDropdown: boolean = false;

  sub: Subscription | null = null;
  codeDataSub: Subscription | null = null;
  createSuccessSub: Subscription | null = null;
  createErrorSub: Subscription | null = null;
  updateSuccessSub: Subscription | null = null;
  updateErrorSub: Subscription | null = null;

  sidebarView = true;

  chatViewWidth: string = localStorage.getItem('chatViewWidth') || '400';

  @ViewChild('chatViewContainer') chatViewContainer!: ElementRef;
  @ViewChild('textinput') textInput!: ElementRef;

  constructor(
    private store: Store<AppStateInit>,
    private codeViewService: CodeViewService,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initCodeData();
    this.initCreates();
    this.initUpdates();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.codeDataSub?.unsubscribe();
    this.codeViewService.clearCodeData();
    this.createSuccessSub?.unsubscribe();
    this.createErrorSub?.unsubscribe();
    this.updateSuccessSub?.unsubscribe();
    this.updateErrorSub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectVariables),
      this.store.select(selectCodes),
      this.store.select(selectChats),
    ]).subscribe(([user, view, project, variables, codes, chats]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.variables = variables;
      this.codes = codes;
      this.chats = [...chats].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
      
      if (this.chats && this.chats.length) {
        this.chat = this.chats[0];
        this.selectHistory(this.chat._id);
      }
    });
  }

  initCodeData() {
    this.codeDataSub = this.codeViewService.codeData$.subscribe((codeData) => {
      this.code = codeData?.code || '';
      this.name = codeData?.name || '';
      this.version = codeData?.version || '';
      this.versionId = codeData?.versionId || '';
      this.versionStatus = codeData?.versionStatus || '';
    });
  }

  initCreates() {
    this.createSuccessSub = this.actions$.pipe((ofType(createChatSuccess))).subscribe(({ chat }) => {
      if (!this.chats) return;

      const foundChat = this.chats.find((existingChat) => existingChat._id === chat._id)!;

      this.chat = cloneDeep(foundChat);
      this.selectHistory(this.chat._id);
      // this.running = false;
    });
    this.createErrorSub = this.actions$.pipe((ofType(createChatError))).subscribe(({ err, chat }) => {
      // this.running = false;
    });
  }

  initUpdates() {
    this.updateSuccessSub = this.actions$.pipe((ofType(updateChatSuccess))).subscribe(({ chat }) => {
      this.store.dispatch(streamChat({ projectId: this.project!._id, chatId: chat._id }));
    });
    this.updateErrorSub = this.actions$.pipe((ofType(updateChatError))).subscribe(({ err, chat }) => {
      // this.running = false;
    });
  }

  createChat() {
    if (this.apiKeyDropdown) this.apiKeyDropdown = !this.apiKeyDropdown;
    if (this.modelDropdown) this.modelDropdown = !this.modelDropdown;
    if (this.historyDropdown) this.historyDropdown = !this.historyDropdown;

    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'New Chat';
    const date = new Date().toISOString();
    const active = true;
    const type = 'chat';
    const messages: ChatMessage[] = [];

    this.store.dispatch(createChat({ projectId, chat: { _id, projectId, userId, date, active, name, type, messages } }));
    // this.running = true;

    if (this.variables) this.apiKeyId = this.variables[0]._id;
    if (this.models) this.modelId = 'gpt-4o-mini';
  }

  updateChat() {
    if (!this.project) return;
    if (!this.user) return;
    if (!this.modelId) return;
    if (!this.apiKeyId) return;
    if (!this.historyId) return;
    if (!this.text) return;
    if (!this.chats) return;

    let chat = this.chats.find((chat) => chat._id === this.historyId);
    chat = cloneDeep(chat);

    if (!chat) return;

    const _id = new ObjectId().toHexString();
    const modelId = this.modelId;
    const variableId = this.apiKeyId;
    const inputTokens = 0;
    const outputTokens = 0;

    chat.messages = [{ _id, modelId, variableId, inputTokens, outputTokens, role: 'user', content: this.text }];

    this.store.dispatch(updateChat({ projectId: this.project._id, chat }));
    this.text = '';
    // this.running = true;
  }

  selectAPIKey(variableId: string) {
    this.apiKeyId = variableId;
  }

  selectModel(modelName: string) {
    this.modelId = modelName;
  }

  selectHistory(historyId: string) {
    if (!this.chats) return;
    if (this.historyId === historyId) return;

    const chat = this.chats.find((chat) => chat._id === historyId);

    if (!chat) return;

    this.chat = chat;
    this.historyId = historyId;
    this.text = '';

    if (!chat.messages.length) return;

    const lastMessage = chat.messages[chat.messages.length - 1];

    this.modelId = lastMessage.modelId;
    this.apiKeyId = lastMessage.variableId;
  }

  findVariable(variableId: string) {
    if (!this.variables) return;

    return this.variables.find((variable) => variable._id === variableId)!.name;
  }

  findChat(chatId: string) {
    if (!this.chats) return;

    return this.chats.find((chat) => chat._id === chatId)!._id.slice(-6);
  }

  get findRecentTokens() {
    if (!this.chat) return null;
    if (!this.chat.messages.length) return null;
    
    const lastMessage = this.chat.messages[this.chat.messages.length - 1];

    if (lastMessage.role !== 'assistant') return null;

    return { inputTokens: lastMessage.inputTokens, outputTokens: lastMessage.outputTokens };
  }

  get findTotalTokens() {
    if (!this.chat) return null;
    if (!this.chat.messages.length) return null;
    
    const outputMessages = this.chat.messages.filter((message) => message.role === 'assistant');

    if (!outputMessages.length) return null;

    return outputMessages.reduce((acc, curr) => {
      acc.inputTokens+=curr.inputTokens;
      acc.outputTokens+=curr.outputTokens;

      return acc;
    }, { inputTokens: 0, outputTokens: 0 });
  }

  autoResize() {
    this.textInput.nativeElement.style.height = '18px';
    this.textInput.nativeElement.style.height = (this.textInput.nativeElement.scrollHeight) + 'px';
  }

  resizeReset() {
    this.textInput.nativeElement.style.height = '18px';
  }

  toggleSidebar() {
    this.sidebarView = !this.sidebarView;

    if (!this.sidebarView) this.chatViewWidth = 'auto';
    else this.chatViewWidth = localStorage.getItem('chatViewWidth') || '400';
  }

  toggleAPIKeyDropdown() {
    if (this.modelDropdown) this.modelDropdown = !this.modelDropdown;
    if (this.historyDropdown) this.historyDropdown = !this.historyDropdown;

    this.apiKeyDropdown = !this.apiKeyDropdown;
  }

  toggleModelDropdown() {
    if (this.apiKeyDropdown) this.apiKeyDropdown = !this.apiKeyDropdown;
    if (this.historyDropdown) this.historyDropdown = !this.historyDropdown;

    this.modelDropdown = !this.modelDropdown;
  }

  toggleHistoryDropdown() {
    if (this.apiKeyDropdown) this.apiKeyDropdown = !this.apiKeyDropdown;
    if (this.modelDropdown) this.modelDropdown = !this.modelDropdown;
    
    this.historyDropdown = !this.historyDropdown;
  }

  toggleTokens() {
    this.showTotalTokens = !this.showTotalTokens;
  }
}

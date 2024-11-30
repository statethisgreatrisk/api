import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Chat, ChatMessage, Code, Project, User, Variable, View } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { selectChats, selectCodes, selectMainProject, selectUser, selectVariables, selectView } from '../../store/selectors/app.selector';
import { Subscription, combineLatest } from 'rxjs';
import { CodeViewService } from '../../services/code-view.service';
import { ResizableWidthDirective } from '../../directives/resizable-width.directive';
import { createChat } from '../../store/actions/app.action';

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

  code: string = '';
  name: string = '';
  version: string | number = '';
  versionId: string = '';
  versionStatus: string = '';

  text: string = '';
  running: boolean = false;

  models: string[] = ['gpt-4o', 'gpt-4o-mini'];

  apiKeyId: string = ''; // variable _id
  modelId: string = ''; // model name
  historyId: string = '';

  apiKeyDropdown: boolean = false;
  modelDropdown: boolean = false;
  historyDropdown: boolean = false;

  sub: Subscription | null = null;
  codeDataSub: Subscription | null = null;

  sidebarView = true;

  chatViewWidth: string = localStorage.getItem('chatViewWidth') || '400';

  @ViewChild('chatViewContainer') chatViewContainer!: ElementRef;
  @ViewChild('textinput') textInput!: ElementRef;

  constructor(
    private store: Store<AppStateInit>,
    private codeViewService: CodeViewService,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initCodeData();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.codeDataSub?.unsubscribe();
    this.codeViewService.clearCodeData();
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

  createChat() {
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
  }

  selectAPIKey(variableId: string) {
    this.apiKeyId = variableId;
  }

  selectModel(modelName: string) {
    this.modelId = modelName;
  }

  selectHistory(historyId: string) {
    this.historyId = historyId;
    this.text = '';
  }

  findVariable(variableId: string) {
    if (!this.variables) return;

    return this.variables.find((variable) => variable._id === variableId)!.name;
  }

  findChat(chatId: string) {
    if (!this.chats) return;

    return this.chats.find((chat) => chat._id === chatId)!.name;
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
}

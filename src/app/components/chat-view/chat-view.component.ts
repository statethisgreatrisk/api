import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, SecurityContext, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Chat, ChatMessage, Code, Project, User, Variable, View } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { selectChats, selectCodes, selectMainProject, selectUser, selectVariables, selectView } from '../../store/selectors/app.selector';
import { Subscription, combineLatest } from 'rxjs';
import { CodeViewService } from '../../services/code-view.service';
import { ResizableWidthDirective } from '../../directives/resizable-width.directive';
import { chunkChat, createChat, createChatError, createChatSuccess, streamChat, updateChat, updateChatError, updateChatSuccess } from '../../store/actions/app.action';
import { Actions, ofType } from '@ngrx/effects';
import ObjectId from 'bson-objectid';
import { cloneDeep } from 'lodash';
import { OutputPipe } from '../../services/output.pipe';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { DomSanitizer } from '@angular/platform-browser';

hljs.registerLanguage('javascript', javascript);

@Component({
  selector: 'app-chat-view',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, NgClass, FormsModule, ResizableWidthDirective, OutputPipe],
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

  text: string = '';
  running: boolean = false;
  showTotalTokens: boolean = false;

  models: string[] = ['gpt-4o', 'gpt-4o-mini'];

  apiKeyId: string = ''; // variable _id
  modelId: string = ''; // model name
  historyId: string = '';
  contextCode: boolean = false;
  contextServices: boolean = false;
  contextStorage: boolean = false;
  contextFunctions: boolean = false;
  contextConstants: boolean = false;

  apiKeyDropdown: boolean = false;
  modelDropdown: boolean = false;
  historyDropdown: boolean = false;
  contextDropdown: boolean = false;

  sub: Subscription | null = null;
  createSuccessSub: Subscription | null = null;
  createErrorSub: Subscription | null = null;
  updateSuccessSub: Subscription | null = null;
  updateErrorSub: Subscription | null = null;
  streamSub: Subscription | null = null;

  sidebarView = true;

  chatViewWidth: string = localStorage.getItem('chatViewWidth') || '400';

  @ViewChild('chatViewContainer') chatViewContainer!: ElementRef;
  @ViewChild('textinput') textInput!: ElementRef;

  constructor(
    private store: Store<AppStateInit>,
    private codeViewService: CodeViewService,
    private actions$: Actions,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initCreates();
    this.initUpdates();
    this.initStreams();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.codeViewService.clearCodeData();
    this.createSuccessSub?.unsubscribe();
    this.createErrorSub?.unsubscribe();
    this.updateSuccessSub?.unsubscribe();
    this.updateErrorSub?.unsubscribe();
    this.streamSub?.unsubscribe();
  }

  ngAfterViewInit() {
    this.highlightCode();
  }

  highlightCode() {
    this.cdr.detectChanges();

    const blocks = document.querySelectorAll('.code-block');

    blocks.forEach((block, index) => {
      if (block.hasAttribute('data-highlighted')) return;

      const formattedCode = block.innerHTML.replace(/<br\s*\/?>/g, '\n');
      block.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, formattedCode)!;

      this.cdr.detectChanges();

      hljs.highlightElement(block as HTMLElement);
    });
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
      
      if (!this.chat && this.chats && this.chats.length) {
        this.chat = this.chats[0];
        this.selectHistory(this.chat._id);
      } else if (this.chat && this.chats && this.chats.length) {
        this.chat = this.chats.find((chat) => chat._id === this.chat!._id)!;
      }
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
      this.scrollToMessageFooter();
    });
    this.updateErrorSub = this.actions$.pipe((ofType(updateChatError))).subscribe(({ err, chat }) => {
      // this.running = false;
    });
  }

  initStreams() {
    this.streamSub = this.actions$.pipe((ofType(chunkChat))).subscribe(({ chatId, chunk }) => {
      if (chunk.done) {
        this.highlightCode();
      }

      this.scrollToMessageFooter();
    });
  }

  createChat() {
    if (this.apiKeyDropdown) this.apiKeyDropdown = !this.apiKeyDropdown;
    if (this.modelDropdown) this.modelDropdown = !this.modelDropdown;
    if (this.historyDropdown) this.historyDropdown = !this.historyDropdown;
    if (this.contextDropdown) this.contextDropdown = !this.contextDropdown;

    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = '';
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
    const contextCode = this.contextCode;
    const contextServices = this.contextServices;
    const contextStorage = this.contextStorage;
    const contextFunctions = this.contextFunctions;
    const contextConstants = this.contextConstants;

    chat.messages = [{ _id, modelId, variableId, inputTokens, outputTokens, role: 'user', content: this.text, contextCode, contextServices, contextStorage, contextFunctions, contextConstants }];

    this.store.dispatch(updateChat({ projectId: this.project._id, chat }));
    this.text = '';
    this.scrollToMessageFooter();
    // this.running = true;

    this.contextCode = false;
    this.contextServices = false;
    this.contextStorage = false;
    this.contextFunctions = false;
    this.contextConstants = false;
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
    this.contextCode = lastMessage.contextCode;
    this.contextServices = lastMessage.contextServices;
    this.contextStorage = lastMessage.contextStorage;
    this.contextFunctions = lastMessage.contextFunctions;
    this.contextConstants = lastMessage.contextConstants;

    this.highlightCode();
    this.scrollToMessageFooter();
  }

  findVariable(variableId: string) {
    if (!this.variables) return;

    return this.variables.find((variable) => variable._id === variableId)!.name;
  }

  findChat(chatId: string) {
    if (!this.chats) return;

    const chat = this.chats.find((chat) => chat._id === chatId)!;

    if (chat.name) return chat.name;

    return chat._id.slice(-6);
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

  hasOutputCode(messageId: string): boolean {
    if (!messageId) return false;
    if (!this.chat) return false;
    if (!this.chat.messages.length) return false;

    const message = this.chat.messages.find((message) => message._id === messageId);

    if (!message) return false;

    const prefix = `"updatedCode":"`;
    const suffix = `"}}`;

    const prefixStartIndex = message.content.indexOf(prefix);
    
    if (prefixStartIndex === -1) return false;

    const content = message.content.slice(prefixStartIndex + prefix.length);

    const suffixStartIndex = content.indexOf(suffix);

    if (suffixStartIndex === -1) return false;

    const codeToUpdate = content.slice(0, suffixStartIndex);

    if (!codeToUpdate.length) return false;

    return true;
  }

  updateCode(messageId: string) {
    if (!messageId) return;
    if (!this.chat) return;
    if (!this.chat.messages.length) return;
    if (!this.codeViewService.updateCodeCallback) return;

    const message = this.chat.messages.find((message) => message._id === messageId);

    if (!message) return;

    const prefix = `"updatedCode":"`;
    const suffix = `"}}`;

    const prefixStartIndex = message.content.indexOf(prefix);
    
    if (prefixStartIndex === -1) return;

    const content = message.content.slice(prefixStartIndex + prefix.length);

    const suffixStartIndex = content.indexOf(suffix);

    if (suffixStartIndex === -1) return;

    const codeToUpdate = content.slice(0, suffixStartIndex).replace(/\\n/g, '\n').replace(/\\"/g, '"');

    this.codeViewService.updateCodeCallback(codeToUpdate);
  }

  scrollToMessageFooter() {
    const element = document.getElementById('messages-footer');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  autoResize() {
    this.textInput.nativeElement.style.height = '18px';
    this.textInput.nativeElement.style.height = (this.textInput.nativeElement.scrollHeight) + 'px';
  }

  resizeReset() {
    this.textInput.nativeElement.style.height = '18px';
  }

  toggleSidebar() {
    if (this.apiKeyDropdown) this.apiKeyDropdown = !this.apiKeyDropdown;
    if (this.modelDropdown) this.modelDropdown = !this.modelDropdown;
    if (this.historyDropdown) this.historyDropdown = !this.historyDropdown;
    if (this.contextDropdown) this.contextDropdown = !this.contextDropdown;

    this.sidebarView = !this.sidebarView;

    if (!this.sidebarView) this.chatViewWidth = 'auto';
    else this.chatViewWidth = localStorage.getItem('chatViewWidth') || '400';

    this.highlightCode();
    this.scrollToMessageFooter();
  }

  toggleAPIKeyDropdown() {
    if (this.modelDropdown) this.modelDropdown = !this.modelDropdown;
    if (this.historyDropdown) this.historyDropdown = !this.historyDropdown;
    if (this.contextDropdown) this.contextDropdown = !this.contextDropdown;

    this.apiKeyDropdown = !this.apiKeyDropdown;
  }

  toggleModelDropdown() {
    if (this.apiKeyDropdown) this.apiKeyDropdown = !this.apiKeyDropdown;
    if (this.historyDropdown) this.historyDropdown = !this.historyDropdown;
    if (this.contextDropdown) this.contextDropdown = !this.contextDropdown;

    this.modelDropdown = !this.modelDropdown;
  }

  toggleHistoryDropdown() {
    if (this.apiKeyDropdown) this.apiKeyDropdown = !this.apiKeyDropdown;
    if (this.modelDropdown) this.modelDropdown = !this.modelDropdown;
    if (this.contextDropdown) this.contextDropdown = !this.contextDropdown;
    
    this.historyDropdown = !this.historyDropdown;
  }

  toggleContextDropdown() {
    if (this.apiKeyDropdown) this.apiKeyDropdown = !this.apiKeyDropdown;
    if (this.modelDropdown) this.modelDropdown = !this.modelDropdown;
    if (this.historyDropdown) this.historyDropdown = !this.historyDropdown;

    this.contextDropdown = !this.contextDropdown;
  }

  toggleTokens() {
    this.showTotalTokens = !this.showTotalTokens;
  }
}

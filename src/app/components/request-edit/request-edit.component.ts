import { DOCUMENT, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, ViewChild } from '@angular/core';
import { UpperCasePipe } from '../../services/uppercase.pipe';
import { basicSetup, EditorView } from 'codemirror';
import { EditorState, Extension } from '@codemirror/state';
import { json } from '@codemirror/lang-json';
import { oneDarkSmall } from '../../styles/one-dark-small';
import { Store } from '@ngrx/store';
import { DeleteService } from '../../services/delete.service';
import { createRequest, createRequestSuccess, deleteRequest, deselectService, updateRequest } from '../../store/actions/app.action';
import { AppStateInit, Project, User, View, Request, RequestBodyForm, RequestHeader, RequestParameter } from '../../store/interfaces/app.interface';
import { Subscription, combineLatest, startWith } from 'rxjs';
import { selectUser, selectView, selectMainProject, selectRequests } from '../../store/selectors/app.selector';
import { FormsModule } from '@angular/forms';
import { SelectRequestService } from '../../services/select-request.service';
import ObjectId from 'bson-objectid';
import { Actions, ofType } from '@ngrx/effects';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-request-edit',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, NgStyle, UpperCasePipe, FormsModule],
  templateUrl: './request-edit.component.html',
  styleUrl: './request-edit.component.scss'
})
export class RequestEditComponent {
  @Input() requestEditWide = true;

  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  requests: Request[] = [];
  request: Request | null = null;

  sub: Subscription | null = null;
  createRequestSub: Subscription | null = null;

  requestDropdown = false;
  actionDropdown = false;
  contentTypeDropdown = false;
  authorizationTypeDropdown = false;
  apiKeyPassByDropdown = false;

  tab: string = 'parameters';

  @ViewChild('jsonEditor') jsonEditor: any;
  jsonState!: EditorState;
  jsonView!: EditorView;

  @ViewChild('textEditor') textEditor: any;
  textState!: EditorState;
  textView!: EditorView;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
    private selectRequestService: SelectRequestService,
    private actions$: Actions,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initCreateRequestListener();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  initCreateRequestListener() {
    this.createRequestSub = this.actions$.pipe((ofType(createRequestSuccess))).subscribe(({ request, wideRequest }) => {
      if (!request) return;
      if (!wideRequest) return;

      this.selectRequestService.selectRequest(request);
    });
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectRequests),
      this.selectRequestService.request$.pipe(startWith(this.createBlankRequest())),
    ]).subscribe(([user, view, project, requests, selectedRequest]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.requests = requests;

      if (this.user && this.view && !this.requestEditWide && this.view.serviceId) {
        const request = requests.find((existingRequest) => existingRequest._id === this.view.serviceId);
        this.request = request ? cloneDeep(request) : null;
      } else if (this.user && this.view && this.requestEditWide && selectedRequest) {
        const request = requests.find((existingRequest) => existingRequest._id === selectedRequest._id);
        this.request = request ? cloneDeep(request) : this.createBlankRequest();
      }
    });
  }

  get requestsWithIds() {
    return this.requests.filter((request) => request._id);
  }

  toggleRequestDropdown() {
    this.requestDropdown = !this.requestDropdown;
  }

  toggleActionDropdown() {
    this.actionDropdown = !this.actionDropdown;
  }

  toggleContentTypeDropdown() {
    this.contentTypeDropdown = !this.contentTypeDropdown;
  }

  toggleAuthorizationTypeDropdown() {
    this.authorizationTypeDropdown = !this.authorizationTypeDropdown;
  }

  toggleApiKeyPassByDropdown() {
    this.apiKeyPassByDropdown = !this.apiKeyPassByDropdown;
  }

  selectRequest(_id: string) {
    const request = this.requests.find((existingRequest) => existingRequest._id === _id);
    
    if (request) {
      this.request = cloneDeep(request);
    }

    this.toggleRequestDropdown();
  }

  selectAction(action: Request['action']) {
    if (!this.request) return;
    this.request.action = action;
    this.toggleActionDropdown();
  }

  selectContentType(contentType: Request['contentType']) {
    if (!this.request) return;
    this.request.contentType = contentType;
    this.toggleContentTypeDropdown();
    this.configureEditor();
  }

  selectAuthorizationType(authorizationType: Request['authorizationType']) {
    if (!this.request) return;
    this.request.authorizationType = authorizationType;
    this.toggleAuthorizationTypeDropdown();
  }

  selectApiKeyPassBy(apiKeyPassBy: Request['apiKeyPassBy']) {
    if (!this.request) return;
    this.request.apiKeyPassBy = apiKeyPassBy;
    this.toggleApiKeyPassByDropdown();
  }

  selectTab(tab: string) {
    if (this.tab === 'body' && this.request?.contentType === 'json') this.parseJsonEditor();
    if (this.tab === 'body' && this.request?.contentType === 'text') this.parseTextEditor();

    this.tab = tab;
    this.requestDropdown = false;
    this.actionDropdown = false;
    this.contentTypeDropdown = false;
    this.authorizationTypeDropdown = false;
    this.apiKeyPassByDropdown = false;

    this.configureEditor();
  }

  addParameter() {
    if (!this.request) return;

    const parameter: RequestParameter = {
      _id: new ObjectId().toHexString(),
      active: true,
      key: '',
      value: '',
    };
    this.request.parameters = [...this.request.parameters, parameter];
  }

  addHeader() {
    if (!this.request) return;

    const header: RequestHeader = {
      _id: new ObjectId().toHexString(),
      active: true,
      key: '',
      value: '',
    };
    this.request.headers = [...this.request.headers, header];
  }

  addBodyForm() {
    if (!this.request) return;

    const bodyForm: RequestBodyForm = {
      _id: new ObjectId().toHexString(),
      active: true,
      parameter: '',
      value: '',
      file: '',
    };
    this.request.bodyForm = [...this.request.bodyForm, bodyForm];
  }

  toggleParameterActive(parameter: RequestParameter) {
    parameter.active = !parameter.active;
  }

  toggleHeaderActive(header: RequestHeader) {
    header.active = !header.active;
  }

  toggleBodyFormActive(bodyForm: RequestBodyForm) {
    bodyForm.active = !bodyForm.active;
  }

  removeParameter(_id: string) {
    if (!this.request) return;
    this.request.parameters = this.request.parameters.filter((parameter) => parameter._id !== _id);
  }

  removeHeader(_id: string) {
    if (!this.request) return;
    this.request.headers = this.request.headers.filter((header) => header._id !== _id);
  }

  removeBodyForm(_id: string) {
    if (!this.request) return;
    this.request.bodyForm = this.request.bodyForm.filter((bodyForm) => bodyForm._id !== _id);
  }

  configureEditor() {
    if (this.tab === 'body' && this.request && this.request.contentType === 'json') {
      this.cdr.detectChanges();
      this.createJsonEditor();
    } else if (this.tab === 'body' && this.request && this.request.contentType === 'text') {
      this.cdr.detectChanges();
      this.createTextEditor();
    }
  }

  createJsonEditor() {
    if (this.jsonEditor.nativeElement.hasChildNodes()) return;

    let codeEditorElement = this.jsonEditor.nativeElement;
    let myExt: Extension = [basicSetup, json(), oneDarkSmall];
    const jsonDoc = this.request && this.request.bodyJson ? this.request.bodyJson : JSON.stringify({}, null, 2);
    
    try {
      this.jsonState = EditorState.create({
        doc: jsonDoc,
        extensions: myExt,
      });
    } catch (e) {
      console.error(e);
    }

    this.jsonView = new EditorView({
      state: this.jsonState,
      parent: codeEditorElement,
    });

    this.jsonView.focus();
  }

  createTextEditor() {
    if (this.textEditor.nativeElement.hasChildNodes()) return;

    let codeEditorElement = this.textEditor.nativeElement;
    let myExt: Extension = [basicSetup, oneDarkSmall];
    const textDoc = this.request && this.request.bodyText ? this.request.bodyText : '';
    
    try {
      this.textState = EditorState.create({
        doc: textDoc,
        extensions: myExt,
      });
    } catch (e) {
      console.error(e);
    }

    this.textView = new EditorView({
      state: this.textState,
      parent: codeEditorElement,
    });

    this.textView.focus();
  }

  parseJsonEditor() {
    if (!this.request) return;
    if (!this.jsonView || !this.jsonView.state) return;

    this.request.bodyJson = this.jsonView.state.doc.toString();
  }

  parseTextEditor() {
    if (!this.request) return;
    if (!this.textView || !this.textView.state) return;

    this.request.bodyText = this.textView.state.doc.toString();
  }

  createBlankRequest(): Request {
    const userId = this.user ? this.user._id : '';
    const projectId = this.project ? this.project._id : '';
    const _id = '';
    const name = 'Request';
    const date = new Date().toISOString();
    const active = true;
    const action = 'get';
    const url = '';
    const parameters: RequestParameter[] = [];
    const headers: RequestHeader[] = [];
    const contentType = 'none';
    const authorizationType = 'none';
    const apiKeyPassBy = 'headers';
    const bodyJson = '';
    const bodyText = '';
    const bodyForm: RequestBodyForm[] = [];
    const apiKeyKey = '';
    const apiKeyValue = '';
    const basicAuthUsername = '';
    const basicAuthPassword = '';
    const bearerToken = '';

    const request = { _id, projectId, userId, name, date, active, action, url, parameters, headers, contentType, authorizationType, apiKeyPassBy, bodyJson, bodyText, bodyForm, apiKeyKey, apiKeyValue, basicAuthUsername, basicAuthPassword, bearerToken };
    return request as Request;
  }

  cancel() {
    if (this.requestEditWide) {
      if (this.request && this.request._id) {
        this.request = this.requests.find((request) => request._id === this.request!._id)!;
      } else {
        this.request = this.createBlankRequest();
      }
    } else {
      this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
    }
  }

  save() {
    if (!this.project) return;
    if (!this.request) return;

    this.parseJsonEditor();
    this.parseTextEditor();

    if (this.requestEditWide) {
      if (this.request && this.request._id) {
        this.store.dispatch(updateRequest({ projectId: this.project._id, request: this.request }));
      } else {
        this.store.dispatch(createRequest({ projectId: this.project._id, wideRequest: true, request: this.request }));
      }
    } else {
      this.store.dispatch(updateRequest({ projectId: this.project._id, request: this.request }));
    }
  }

  delete() {
    if (!this.project) return;
    if (!this.request) return;

    const request = this.request;

    this.deleteService.initDelete({
      service: 'Request',
      serviceData: request,
      deleteFn: () => {
        this.store.dispatch(deleteRequest({ projectId: this.project!._id, requestId: request._id }));
        this.cancel();
      },
    });
  }
}

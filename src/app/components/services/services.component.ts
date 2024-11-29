import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AppStateInit, Service, View, API, Validator, Storage, Schema, Workflow, User, WorkflowRow, Project, Obj, Fn, Request, RequestParameter, RequestHeader, RequestBodyForm, Variable, Queue, Scheduler, Arr, WorkflowVersion, Code, CodeVersion } from '../../store/interfaces/app.interface';
import { changeProject, clearData, createAPI, createArr, createCode, createFn, createObj, createProject, createQueue, createRequest, createScheduler, createSchema, createStorage, createValidator, createVariable, createWorkflow, deselectService, selectService, selectWindow } from '../../store/actions/app.action';
import { selectAPIs, selectArrs, selectCodes, selectFns, selectMainProject, selectObjs, selectProjects, selectQueues, selectRequests, selectSchedulers, selectSchemas, selectStorages, selectUser, selectValidators, selectVariables, selectView, selectWorkflows } from '../../store/selectors/app.selector';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from '../../services/auth.service';
import { combineLatest, Subscription } from 'rxjs';
import ObjectId from 'bson-objectid';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  allProjects: Project[] | null = null;
  project: Project | null = null;

  sub: Subscription | null = null;

  apis: API[] = [];
  validators: Validator[] = [];
  storages: Storage[] = [];
  schemas: Schema[] = [];
  workflows: Workflow[] = [];
  codes: Code[] = [];
  fns: Fn[] = [];
  objs: Obj[] = [];
  arrs: Arr[] = [];
  requests: Request[] = [];
  variables: Variable[] = [];
  // websockets: Websocket[] = [];
  queues: Queue[] = [];
  schedulers: Scheduler[] = [];

  services: Service[] =  [
    { name: 'Workflows', icon: '/workflow.png' },
    { name: 'Codes', icon: '/workflow.png' },
    { name: 'APIs', icon: '/news.png' },
    { name: 'Storages', icon: '/folder.png' },
    { name: 'Validators', icon: '/binoculars.png' },
    { name: 'Schemas', icon: '/tool.png' },
    { name: 'Objects', icon: '/tool.png' },
    { name: 'Arrays', icon: '/tool.png' },
    { name: 'Functions', icon: '/tool.png' },
    { name: 'Requests', icon: '/tool.png' },
    { name: 'Variables', icon: '/tool.png' },
    // { name: 'WebSockets', icon: '/tool.png' },
    // { name: 'Queues', icon: '/tool.png' },
    // { name: 'Schedulers', icon: '/tool.png' },
  ];

  dropdown: boolean = false;

  constructor(
    private store: Store<AppStateInit>,
    private settingsService: SettingsService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.initLatest();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  selectService(serviceName: string, serviceId: string) {
    if (serviceName === this.view.service && serviceId === this.view.serviceId) {
      this.store.dispatch(deselectService({ serviceName, serviceId }));
      return;
    }

    this.store.dispatch(selectService({ serviceName, serviceId }));

    if (serviceName === 'Storages') this.store.dispatch(selectWindow({ windowName: 'Storage', windowId: serviceId }));
    if (serviceName === 'Workflows') this.store.dispatch(selectWindow({ windowName: 'Workflows', windowId: serviceId }));
    if (serviceName === 'Codes') this.store.dispatch(selectWindow({ windowName: 'Codes', windowId: serviceId }));
  }

  hideSidebar() {
    if (!this.view.service) return;
    if (!this.view.serviceId) return;
    
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  changeProject(projectId: string) {
    if (!this.project || projectId === this.project._id) {
      this.toggleDropdown();
      return;
    }

    this.toggleDropdown();
    this.store.dispatch(changeProject({ projectId }));
  }

  openSettings() {
    this.settingsService.openSettings();
  }

  openLogin() {
    this.authService.openLogin();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectProjects),
      this.store.select(selectMainProject),
      this.store.select(selectAPIs),
      this.store.select(selectStorages),
      this.store.select(selectValidators),
      this.store.select(selectSchemas),
      this.store.select(selectWorkflows),
      this.store.select(selectCodes),
      this.store.select(selectFns),
      this.store.select(selectObjs),
      this.store.select(selectArrs),
      this.store.select(selectRequests),
      this.store.select(selectVariables),
      // this.store.select(selectWebsockets),
      this.store.select(selectQueues),
      this.store.select(selectSchedulers)
    ]).subscribe(([user, view, allProjects, project, apis, storages, validators, schemas, workflows, codes, fns, objs, arrs, requests, variables, queues, schedulers]) => {
      this.user = user;
      this.view = view;
      this.allProjects = allProjects;
      this.project = project;
      this.apis = apis;
      this.storages = storages;
      this.validators = validators;
      this.schemas = schemas;
      this.workflows = workflows;
      this.codes = codes;
      this.fns = fns;
      this.objs = objs;
      this.arrs = arrs;
      this.requests = requests;
      this.variables = variables;
      // this.websockets = websockets;
      this.queues = queues;
      this.schedulers = schedulers;
    });
  }

  create(service: string) {
    if (service === 'APIs') return this.createAPI();
    if (service === 'Storages') return this.createStorage();
    if (service === 'Schemas') return this.createSchema();
    if (service === 'Validators') return this.createValidator();
    if (service === 'Workflows') return this.createWorkflow();
    if (service === 'Codes') return this.createCode();
    if (service === 'Functions') return this.createFn();
    if (service === 'Objects') return this.createObj();
    if (service === 'Arrays') return this.createArr();
    if (service === 'Requests') return this.createRequest();
    if (service === 'Variables') return this.createVariable();
    // if (service === 'WebSockets') return this.createWebsocket();
    if (service === 'Queues') return this.createQueue();
    if (service === 'Schedulers') return this.createScheduler();
    if (service === 'Projects') return this.createProject();
  }

  createProject() {
    if (!this.user) return;

    const userId = this.user._id;
    const _id = '';
    const name = 'New Project';
    const date = new Date().toISOString();
    const active = true;

    this.toggleDropdown();
    this.store.dispatch(clearData());
    this.store.dispatch(createProject({ project: { _id, userId, name, date, active }}));
  }

  createAPI() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Endpoint';
    const date = new Date().toISOString();
    const active = true;
    const action = 'get';
    const url = '/hello-world';
    const validators: string[] = [];
    const workflowId = '';
    const codeId = '';

    this.store.dispatch(createAPI({ projectId, api: { _id, projectId, userId, name, date, active, action, url, validators, workflowId, codeId } }));
  }

  createStorage() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Storage';
    const date = new Date().toISOString();
    const active = true;
    const schemaId = '';

    this.store.dispatch(createStorage({ projectId, storage: { _id, projectId, userId, name, date, active, schemaId } }));
  }

  createSchema() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Schema';
    const date = new Date().toISOString();
    const active = true;
    const schema = '';
    const version = 0;
    const valid = false;

    this.store.dispatch(createSchema({ projectId, schema: { _id, projectId, userId, name, date, active, schema, version, valid } }));
  }

  createValidator() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Validator';
    const date = new Date().toISOString();
    const active = true;
    const validator = '';
    const valid = false;

    this.store.dispatch(createValidator({ projectId, validator: { _id, projectId, userId, name, date, active, validator, valid } }));
  }

  createWorkflow() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Workflow';
    const date = new Date().toISOString();
    const active = true;
    const versionId = new ObjectId().toHexString();
    const versions: WorkflowVersion[] = [{
      _id: versionId,
      version: 0,
      rows: [],
    }];

    this.store.dispatch(createWorkflow({ projectId, workflow: { _id, projectId, userId, name, date, active, versionId, versions } }));
  }

  createCode() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Code';
    const date = new Date().toISOString();
    const active = true;
    const versionId = new ObjectId().toHexString();
    const versions: CodeVersion[] = [{
      _id: versionId,
      version: 0,
      code: '',
    }];

    this.store.dispatch(createCode({ projectId, code: { _id, projectId, userId, name, date, active, versionId, versions } }));
  }

  createFn() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Function';
    const date = new Date().toISOString();
    const active = true;
    const fn = '';

    this.store.dispatch(createFn({ projectId, fn: { _id, projectId, userId, name, date, active, fn } }));
  }

  createObj() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Object';
    const date = new Date().toISOString();
    const active = true;
    const obj = '';

    this.store.dispatch(createObj({ projectId, obj: { _id, projectId, userId, name, date, active, obj } }));
  }

  createArr() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Array';
    const date = new Date().toISOString();
    const active = true;
    const arr = '';

    this.store.dispatch(createArr({ projectId, arr: { _id, projectId, userId, name, date, active, arr } }));
  }

  createRequest() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Request';
    const date = new Date().toISOString();
    const active = true;
    const action  = 'get';
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
    const wideRequest = false;

    this.store.dispatch(createRequest({ projectId, wideRequest, request: { _id, projectId, userId, name, date, active, action, url, parameters, headers, contentType, authorizationType, apiKeyPassBy, bodyJson, bodyText, bodyForm, apiKeyKey, apiKeyValue, basicAuthUsername, basicAuthPassword, bearerToken } }));
  }

  createVariable() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Variable';
    const date = new Date().toISOString();
    const active = true;
    const value = '';
    const put = false;

    this.store.dispatch(createVariable({ projectId, variable: { _id, projectId, userId, name, date, active, value, put } }));
  }

  // createWebsocket() {
  //   if (!this.project) return;
  //   if (!this.user) return;

  //   const userId = this.user._id;
  //   const projectId = this.project._id;
  //   const _id = '';
  //   const name = 'WebSocket';
  //   const date = new Date().toISOString();
  //   const active = true;

  //   this.store.dispatch(createWebsocket({ projectId, websocket: { _id, projectId, userId, name, date, active } }));
  // }

  createQueue() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Queue';
    const date = new Date().toISOString();
    const active = true;
    const workflowId = '';

    this.store.dispatch(createQueue({ projectId, queue: { _id, projectId, userId, name, date, active, workflowId } }));
  }

  createScheduler() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const name = 'Scheduler';
    const date = new Date().toISOString();
    const active = true;
    const cron = '';
    const cronType = 'none';
    const cronHour = 0;
    const cronMinute = 0;
    const cronTimezone = 'America/New_York';
    const workflowId = '';

    this.store.dispatch(createScheduler({ projectId, scheduler: { _id, projectId, userId, name, date, active, cron, cronType, cronHour, cronMinute, cronTimezone, workflowId } }));
  }
}

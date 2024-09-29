import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AppStateInit, Service, View, API, Validator, Storage, Schema, Workflow, User, WorkflowRow, Project, Obj, Fn } from '../../store/interfaces/app.interface';
import { changeProject, clearData, createAPI, createFn, createObj, createProject, createSchema, createStorage, createValidator, createWorkflow, deselectService, deselectWindow, selectService, selectWindow } from '../../store/actions/app.action';
import { selectAPIs, selectFns, selectMainProject, selectObjs, selectProjects, selectSchemas, selectStorages, selectUser, selectValidators, selectView, selectWorkflows } from '../../store/selectors/app.selector';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from '../../services/auth.service';
import { combineLatest, Subscription } from 'rxjs';

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
  fns: Fn[] = [];
  objs: Obj[] = [];

  services: Service[] =  [
    { name: 'Workflows', icon: '/workflow.png' },
    { name: 'APIs', icon: '/news.png' },
    { name: 'Validators', icon: '/binoculars.png' },
    { name: 'Storages', icon: '/folder.png' },
    { name: 'Schemas', icon: '/tool.png' },
    { name: 'Functions', icon: '/tool.png' },
    { name: 'Objects', icon: '/tool.png' },
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
    } else {
      this.store.dispatch(selectService({ serviceName, serviceId }));
    }
  }

  selectWorkflow(windowName: string, windowId: string) {
    if (windowName === this.view.window && windowId === this.view.windowId) {
      this.store.dispatch(deselectWindow({ windowName, windowId }));
    } else {
      this.store.dispatch(selectWindow({ windowName, windowId }));
    }
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
      this.store.select(selectFns),
      this.store.select(selectObjs),
    ]).subscribe(([user, view, allProjects, project, apis, storages, validators, schemas, workflows, fns, objs]) => {
      this.user = user;
      this.view = view;
      this.allProjects = allProjects;
      this.project = project;
      this.apis = apis;
      this.storages = storages;
      this.validators = validators;
      this.schemas = schemas;
      this.workflows = workflows;
      this.fns = fns;
      this.objs = objs;
    });
  }

  create(service: string) {
    if (service === 'APIs') return this.createAPI();
    if (service === 'Storages') return this.createStorage();
    if (service === 'Schemas') return this.createSchema();
    if (service === 'Validators') return this.createValidator();
    if (service === 'Workflows') return this.createWorkflow();
    if (service === 'Functions') return this.createFn();
    if (service === 'Objects') return this.createObj();
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

    this.store.dispatch(createAPI({ projectId, api: { _id, projectId, userId, name, date, active, action, url, validators } }));
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

    this.store.dispatch(createSchema({ projectId, schema: { _id, projectId, userId, name, date, active, schema } }));
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

    this.store.dispatch(createValidator({ projectId, validator: { _id, projectId, userId, name, date, active, validator } }));
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
    const rows: WorkflowRow[] = [];

    this.store.dispatch(createWorkflow({ projectId, workflow: { _id, projectId, userId, name, date, active, rows } }));
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
}
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AppStateInit, Service, View, API, Validator, Storage, Schema, Workflow, User, WorkflowRow, SchemaRow } from '../../store/interfaces/app.interface';
import { createAPI, createSchema, createStorage, createValidator, createWorkflow, deselectService, deselectWindow, selectService, selectWindow } from '../../store/actions/app.action';
import { selectAPIs, selectSchemas, selectStorages, selectUser, selectValidators, selectView, selectWorkflows } from '../../store/selectors/app.selector';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from '../../services/auth.service';
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

  apis: API[] = [];
  validators: Validator[] = [];
  storages: Storage[] = [];
  schemas: Schema[] = [];
  workflows: Workflow[] = [];

  services: Service[] =  [
    { name: 'Workflow', icon: '/workflow.png' },
    { name: 'API', icon: '/news.png' },
    { name: 'Storage', icon: '/folder.png' },
    { name: 'Schema', icon: '/tool.png' },
    { name: 'Validator', icon: '/binoculars.png' },
  ];

  dropdown: boolean = false;

  constructor(
    private store: Store<AppStateInit>,
    private settingsService: SettingsService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.initUser();
    this.initView();
    this.initAPIs();
    this.initStorages();
    this.initValidators();
    this.initSchemas();
    this.initWorkflows();
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

  openSettings() {
    this.settingsService.openSettings();
  }

  openLogin() {
    this.authService.openLogin();
  }

  initUser() {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  initView() {
    this.store.select(selectView).subscribe((view) => {
      if (!view) return;
      this.view = view;
    });
  }

  initAPIs() {
    this.store.select(selectAPIs).subscribe((apis) => {
      this.apis = apis;
    });
  }

  initStorages() {
    this.store.select(selectStorages).subscribe((storages) => {
      this.storages = storages;
    });
  }

  initValidators() {
    this.store.select(selectValidators).subscribe((validators) => {
      this.validators = validators;
    });
  }

  initSchemas() {
    this.store.select(selectSchemas).subscribe((schemas) => {
      this.schemas = schemas;
    });
  }

  initWorkflows() {
    this.store.select(selectWorkflows).subscribe((workflows) => {
      this.workflows = workflows;
    });
  }

  create(service: string) {
    if (service === 'API') return this.createAPI();
    if (service === 'Storage') return this.createStorage();
    if (service === 'Schema') return this.createSchema();
    if (service === 'Validator') return this.createValidator();
    if (service === 'Workflow') return this.createWorkflow();
  }

  createAPI() {
    if (!this.user) return;

    const userId = this.user._id;
    const _id = '';
    const name = 'Endpoint';
    const date = new Date().toISOString();
    const active = true;
    const action = 'get';
    const url = '/hello-world';
    const validators: string[] = [];

    this.store.dispatch(createAPI({ api: { _id, userId, name, date, active, action, url, validators } }));
  }

  createStorage() {
    if (!this.user) return;

    const userId = this.user._id;
    const _id = '';
    const name = 'Storage';
    const date = new Date().toISOString();
    const active = true;
    const schemaId = '';

    this.store.dispatch(createStorage({ storage: { _id, userId, name, date, active, schemaId } }));
  }

  createSchema() {
    if (!this.user) return;

    const userId = this.user._id;
    const _id = '';
    const name = 'Schema';
    const date = new Date().toISOString();
    const active = true;
    const rows: SchemaRow[] = [{ _id: new ObjectId().toHexString(), key: '', type: '' }];

    this.store.dispatch(createSchema({ schema: { _id, userId, name, date, active, rows } }));
  }

  createValidator() {
    if (!this.user) return;

    const userId = this.user._id;
    const _id = '';
    const name = 'Validator';
    const date = new Date().toISOString();
    const active = true;
    const field = 'param';
    const path = '';
    const validation = '';

    this.store.dispatch(createValidator({ validator: { _id, userId, name, date, active, field, path, validation } }));
  }

  createWorkflow() {
    if (!this.user) return;

    const userId = this.user._id;
    const _id = '';
    const name = 'Workflow';
    const date = new Date().toISOString();
    const active = true;
    const rows: WorkflowRow[] = [];

    this.store.dispatch(createWorkflow({ workflow: { _id, userId, name, date, active, rows } }));
  }
}
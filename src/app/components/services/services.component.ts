import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AppStateInit, Service, View, API, Validator, Storage, Schema, Workflow, User, SchemaKey, WorkflowRow } from '../../store/interfaces/app.interface';
import { createAPI, createSchema, createStorage, createValidator, createWorkflow, deselectService, selectService } from '../../store/actions/app.action';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  user: User | null = null;
  view: View = { service: '', serviceDataId: '', window: '', windowId: '' };

  api: API[] = [];
  validator: Validator[] = [];
  storage: Storage[] = [];
  schema: Schema[] = [];
  workflow: Workflow[] = [];

  services: Service[] =  [
    { name: 'Workflow', icon: '/workflow.png' },
    { name: 'API', icon: '/news.png' },
    { name: 'Storage', icon: '/folder.png' },
    { name: 'Schema', icon: '/tool.png' },
    { name: 'Validator', icon: '/binoculars.png' },
  ];

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initUser();
    this.initView();
    this.initAPI();
    this.initStorage();
    this.initValidator();
    this.initSchema();
    this.initWorkflow();
  }

  selectService(serviceName: string, serviceDataId: string) {
    if (serviceName === this.view.service && serviceDataId === this.view.serviceDataId) {
      this.store.dispatch(deselectService({ serviceName, serviceDataId }));
    } else {
      this.store.dispatch(selectService({ serviceName, serviceDataId }));
    }
  }

  initUser() {
    this.store.pipe(map((store) => store.app.user)).subscribe((user) => {
      this.user = user;
    });
  }

  initView() {
    this.store.pipe(map((store) => store.app.view)).subscribe((view) => {
      if (!view) return;
      this.view = view;
    });
  }

  initAPI() {
    this.store.pipe(map((store) => store.app.api)).subscribe((api) => {
      if (!api || !api.length) return;
      this.api = api;
    });
  }

  initStorage() {
    this.store.pipe(map((store) => store.app.storage)).subscribe((storage) => {
      if (!storage || !storage.length) return;
      this.storage = storage;
    });
  }

  initValidator() {
    this.store.pipe(map((store) => store.app.validator)).subscribe((validator) => {
      if (!validator || !validator.length) return;
      this.validator = validator;
    });
  }

  initSchema() {
    this.store.pipe(map((store) => store.app.schema)).subscribe((schema) => {
      if (!schema || !schema.length) return;
      this.schema = schema;
    });
  }

  initWorkflow() {
    this.store.pipe(map((store) => store.app.workflow)).subscribe((workflow) => {
      if (!workflow || !workflow.length) return;
      this.workflow = workflow;
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
    const userId = '66e7f036567ffc29c90400f5';
    const _id = '';
    const name = 'Endpoint';
    const date = new Date().toISOString();
    const action = 'get';
    const url = '/hello-world';
    const validators: string[] = [];

    this.store.dispatch(createAPI({ api: { _id, userId, name, date, action, url, validators } }));
  }

  createStorage() {
    const userId = '66e7f036567ffc29c90400f5';
    const _id = '';
    const name = 'Storage';
    const date = new Date().toISOString();
    const schemaId = '';

    this.store.dispatch(createStorage({ storage: { _id, userId, name, date, schemaId } }));
  }

  createSchema() {
    const userId = '66e7f036567ffc29c90400f5';
    const _id = '';
    const name = 'Schema';
    const date = new Date().toISOString();
    const keys: SchemaKey[] = [];

    this.store.dispatch(createSchema({ schema: { _id, userId, name, date, keys } }));
  }

  createValidator() {
    const userId = '66e7f036567ffc29c90400f5';
    const _id = '';
    const name = 'Validator';
    const date = new Date().toISOString();
    const field = 'param';
    const path = '';
    const validation = '';

    this.store.dispatch(createValidator({ validator: { _id, userId, name, date, field, path, validation } }));
  }

  createWorkflow() {
    const userId = '66e7f036567ffc29c90400f5';
    const _id = '';
    const name = 'Workflow';
    const date = new Date().toISOString();
    const rows: WorkflowRow[] = [];

    this.store.dispatch(createWorkflow({ workflow: { _id, userId, name, date, rows } }));
  }
}
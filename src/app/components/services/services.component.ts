import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AppStateInit, Service, View, API, Validation, Storage, Schema } from '../../store/interfaces/app.interface';
import { selectService } from '../../store/actions/app.action';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  view: View = { service: '', serviceDataId: '' };

  services: Service[] = [];
  api: API[] = [];
  validation: Validation[] = [];
  storage: Storage[] = [];
  schema: Schema[] = [];

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initView();
    this.initServices();
    this.initAPI();
    this.initStorage();
    this.initValidation();
    this.initSchema();
  }

  selectService(serviceName: string, serviceDataId: string) {
    this.store.dispatch(selectService({ serviceName, serviceDataId }));
  }

  initView() {
    this.store.pipe(map((store) => store.app.view)).subscribe((view) => {
      if (!view) return;
      this.view = view;
    });
  }

  initServices() {
    this.store.pipe(map((store) => store.app.services)).subscribe((services) => {
      if (!services || !services.length) return;
      this.services = services;
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

  initValidation() {
    this.store.pipe(map((store) => store.app.validation)).subscribe((validation) => {
      if (!validation || !validation.length) return;
      this.validation = validation;
    });
  }

  initSchema() {
    this.store.pipe(map((store) => store.app.schema)).subscribe((schema) => {
      if (!schema || !schema.length) return;
      this.schema = schema;
    });
  }
}
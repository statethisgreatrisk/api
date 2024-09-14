import { Component } from '@angular/core';
import { API, AppStateInit, Schema, Storage, Validation, View } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { selectServiceData } from '../../store/actions/app.action';

@Component({
  selector: 'app-service-data',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './service-data.component.html',
  styleUrl: './service-data.component.scss'
})
export class ServiceDataComponent {
  view: View = { service: '', serviceDataId: '' };

  api: API[] = [];
  validation: Validation[] = [];
  storage: Storage[] = [];
  schema: Schema[] = [];

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initView();
    this.initAPI();
    this.initStorage();
    this.initValidation();
    this.initSchema();
  }

  selectServiceData(serviceDataId: string) {
    this.store.dispatch(selectServiceData({ serviceDataId }));
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

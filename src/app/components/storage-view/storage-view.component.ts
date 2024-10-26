import { Component } from '@angular/core';
import { AppStateInit, Document, Project, Schema, Storage, User, View } from '../../store/interfaces/app.interface';
import { selectDocuments, selectMainProject, selectSchemas, selectStorages, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { createDocument, deselectService, deselectWindow } from '../../store/actions/app.action';
import { DocumentService } from '../../services/document.service';

interface Header {
  key: string;
  value: string;
}

@Component({
  selector: 'app-storage-view',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './storage-view.component.html',
  styleUrl: './storage-view.component.scss'
})
export class StorageViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  storage: Storage | null = null;

  storages: Storage[] = [];
  schemas: Schema[] = [];
  documents: Document[] = [];
  documentsParsed: any[] = [];

  schemaVersion = 0;

  headers: Header[] = [];

  sub: Subscription | null = null;

  selectedRowId: string = '';

  constructor(
    private store: Store<AppStateInit>,
    private documentService: DocumentService,
    private deleteService: DeleteService,
  ) {}

  ngOnInit() {
    this.initLatest();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectStorages),
      this.store.select(selectSchemas),
      this.store.select(selectDocuments),
    ]).subscribe(([user, view, project, storages, schemas, documents]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.storages = storages;
      this.schemas = schemas;

      if (this.user && this.view && this.view.windowId) {
        const storage = storages.find((existingStorage) => existingStorage._id === this.view.windowId);
        this.storage = storage ? { ...storage } : null;

        if (this.storage && this.storage.schemaId) {
          const schema = schemas.find((schema) => schema._id === this.storage!.schemaId);
          if (!schema) return;

          this.schemaVersion = schema.version;
          const storageDocuments = documents.filter((document) => document.storageId === this.storage!._id && document.version === this.schemaVersion);

          this.documents = storageDocuments || [];
          this.documentsParsed = this.documents.map((document) => {
            let subDoc = {};
            try { subDoc = JSON.parse(document.document); } catch(error) {}

            return { _id: document._id, date: document.date, ...subDoc };
          });

          if (this.documentsParsed.length) {
            const sampleDocument = this.documentsParsed[0];
            const headers = Object.keys(sampleDocument).map((key) => {
              const value = key.charAt(0).toUpperCase() + key.slice(1);
              return { key, value };
            });
            this.headers = headers;
          } else {
            this.headers = [];
          }
        }
      }
    });
  }

  cellValue(document: any, headerKey: string) {
    return String(document[headerKey]) || '';
  }

  editDocument(documentParsed: any) {
    this.selectedRowId = documentParsed._id;
    this.documentService.selectDocument(documentParsed);
  }

  addDocument() {
    if (!this.user) return;
    if (!this.project) return;
    if (!this.storage) return;

    const _id = '';
    const userId = this.user._id;
    const projectId = this.project._id;
    const storageId = this.storage._id;
    const date = new Date().toISOString();
    const active = true;
    const version = this.schemaVersion;
    const document = JSON.stringify({ foo: 'bar' });

    this.store.dispatch(createDocument({ projectId: projectId, document: { _id, userId, projectId, storageId, date, active, version, document } }));
  }

  close() {
    if (this.view.service === 'Storages') this.store.dispatch(deselectService({ serviceName: '', serviceId: '' }));
    this.store.dispatch(deselectWindow({ windowName: this.view.window, windowId: this.view.windowId }));
  }
}

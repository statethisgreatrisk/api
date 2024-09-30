import { Component } from '@angular/core';
import { AppStateInit, Document, Project, Storage, User, View } from '../../store/interfaces/app.interface';
import { selectDocuments, selectMainProject, selectStorages, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { NgFor, NgIf } from '@angular/common';
import { deselectWindow } from '../../store/actions/app.action';

interface Header {
  key: string;
  value: string;
}

@Component({
  selector: 'app-storage-view',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './storage-view.component.html',
  styleUrl: './storage-view.component.scss'
})
export class StorageViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  storage: Storage | null = null;

  storages: Storage[] = [];
  documents: Document[] = [];

  headers: Header[] = [];

  sub: Subscription | null = null;

  constructor(
    private store: Store<AppStateInit>,
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
      this.store.select(selectDocuments),
    ]).subscribe(([user, view, project, storages, documents]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.storages = storages;

      if (this.user && this.view && this.view.windowId) {
        const storage = storages.find((existingStorage) => existingStorage._id === this.view.windowId);
        this.storage = storage ? { ...storage } : null;

        if (this.storage) {
          const storageDocuments = documents.filter((document) => document.storageId === this.storage!._id);
          this.documents = storageDocuments || [];
          console.log('documents', this.documents)

          if (this.documents.length) {
            const sampleDocument = this.documents[0];
            console.log('sample doc', sampleDocument)
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
    return document[headerKey] || '';
  }

  close() {
    this.store.dispatch(deselectWindow({ windowName: this.view.window, windowId: this.view.windowId }));
  }

  cancel() {
    // Cancel editing document
  }
  
  save() {
    // Save edited document
  }

  delete() {
    // Delete document
  }
}

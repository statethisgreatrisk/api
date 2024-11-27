import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { AppStateInit, Document, Project, Schema, Storage, User, View } from '../../store/interfaces/app.interface';
import { selectDocuments, selectMainProject, selectSchemas, selectStorages, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { DOCUMENT, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { createDocument, deselectService, deselectWindow } from '../../store/actions/app.action';
import { DocumentService } from '../../services/document.service';
import { json } from '@codemirror/lang-json';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { oneDarkSmall } from '../../styles/one-dark-small';
import { chunk } from 'lodash';
import { FormsModule } from '@angular/forms';

interface Header {
  key: string;
  value: string;
}

@Component({
  selector: 'app-storage-view',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, NgStyle, FormsModule],
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

  schemaVersion = 0;

  headers: Header[] = [];

  sub: Subscription | null = null;
  selectedDocumentSub: Subscription | null = null;

  selectedRowId: string = '';

  addDocumentDropdown = false;

  pageNumber = 1;
  perPage = 15;

  searchQuery = '';

  @ViewChild('jsonEditor') jsonEditor: any;
  editorState!: EditorState;
  editorView!: EditorView;

  constructor(
    private store: Store<AppStateInit>,
    private documentService: DocumentService,
    private deleteService: DeleteService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initSelectedDocument();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.selectedDocumentSub?.unsubscribe();
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

          if (this.documents.length) {
            const sampleDocument = this.documents[0];
            const headers = Object.keys(sampleDocument).filter((key) => {
              if (['_id', 'date', 'userId', 'projectId', 'storageId', 'active', 'version'].includes(key)) return false;
              return true;
            }).map((key) => {
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

  initSelectedDocument() {
    this.selectedDocumentSub = this.documentService.document$.subscribe((document) => {
      if (!document) this.selectedRowId = '';
    });
  }

  parseDocumentDate(dateString: string) {
    const dateObj = new Date(dateString);
    const date = dateObj.toLocaleDateString();
    const time = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", second: "numeric", fractionalSecondDigits: 3, hour12: true }).format(dateObj);

    return `${date} ${time}`;
  }

  createEditor() {
    let jsonEditorElement = this.jsonEditor.nativeElement;
    let myExt: Extension = [basicSetup, json(), oneDarkSmall];
    const jsonDoc = JSON.stringify({}, null, 2);
    
    try {
      this.editorState = EditorState.create({
        doc: jsonDoc,
        extensions: myExt,
      });
    } catch (e) {
      console.error(e);
    }

    this.editorView = new EditorView({
      state: this.editorState,
      parent: jsonEditorElement,
    });

    this.editorView.focus();
  }

  cellValue(document: any, headerKey: string) {
    return String(document[headerKey]) || '';
  }

  getDynamicColumnWidth(): string {
    return `calc(100% / ${this.headers.length})`;
  }

  editDocument(document: any) {
    this.selectedRowId = document._id;
    this.documentService.selectDocument(document);
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

    try {
      const documentString = this.editorView.state.doc.toString().trim();
      const document = JSON.parse(documentString);
      
      document._id = _id;
      document.userId = userId;
      document.projectId = projectId;
      document.storageId = storageId;
      document.date = date;
      document.active = active;
      document.version = version;

      this.store.dispatch(createDocument({ projectId: projectId, document: document }));
    } catch(error) {}
  }

  close() {
    if (this.view.service === 'Storages') this.store.dispatch(deselectService({ serviceName: '', serviceId: '' }));
    this.store.dispatch(deselectWindow({ windowName: this.view.window, windowId: this.view.windowId }));
  }

  toggleAddDocumentDropdown() {
    this.addDocumentDropdown = !this.addDocumentDropdown;

    if (this.addDocumentDropdown) {
      this.cdr.detectChanges();
      this.createEditor();
    }
  }

  get filteredDocuments(): any[] {
    if (!this.documents) return [];
    if (!this.searchQuery) return this.documents;

    return this.documents.filter((document) => {
      return JSON.stringify(document).toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  get paginatedDocuments() {
    const paginatedItems = chunk(this.filteredDocuments, this.perPage);
    const pageData = paginatedItems[this.pageNumber - 1] || [];

    return pageData;
  }

  hasNextPage() {
    const paginatedItems = chunk(this.filteredDocuments, this.perPage);
    const totalPages = paginatedItems.length;

    return this.pageNumber < totalPages;
  }

  hasPreviousPage() {
    return this.pageNumber > 1;
  }

  nextPage() {
    if (!this.hasNextPage()) return;
    this.pageNumber++;
  }

  previousPage() {
    if (!this.hasPreviousPage()) return;
    this.pageNumber--;
  }

  resetPage() {
    this.pageNumber = 1;
  }
}

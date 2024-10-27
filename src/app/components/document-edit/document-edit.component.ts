import { DOCUMENT, NgIf } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { EditorState, Extension } from '@codemirror/state';
import { Store } from '@ngrx/store';
import { basicSetup, EditorView } from 'codemirror';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { User, View, Project, AppStateInit, Document, Storage } from '../../store/interfaces/app.interface';
import { selectUser, selectView, selectMainProject, selectDocuments, selectStorages } from '../../store/selectors/app.selector';
import { oneDarkSmall } from '../../styles/one-dark-small';
import { json } from '@codemirror/lang-json';
import { DocumentService } from '../../services/document.service';
import { deleteDocument, updateDocument } from '../../store/actions/app.action';

@Component({
  selector: 'app-document-edit',
  standalone: true,
  imports: [NgIf],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.scss'
})
export class DocumentEditComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;

  storages: Storage[] = [];
  documents: Document[] = [];
  documentParsed: any | null = null;
  documentString: string = '';

  sub: Subscription | null = null;
  documentSub: Subscription | null = null;

  @ViewChild('codeEditor') codeEditor: any;
  editorState!: EditorState;
  editorView!: EditorView;

  constructor(
    private store: Store<AppStateInit>,
    private documentService: DocumentService,
    private deleteService: DeleteService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initDocument();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.documentSub?.unsubscribe();
  }

  ngAfterViewInit() {
    this.createEditor();
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
      this.documents = documents;
    });
  }

  initDocument() {
    this.documentSub = this.documentService.document$.subscribe((document) => {
      if (!document) return;

      this.documentParsed = { ...document };

      const documentString = { ...document };
      delete documentString._id;
      delete documentString.date;
      this.documentString = JSON.stringify(documentString, null, 2);

      let currentText = this.editorView.state.doc.toString();
      this.editorView.dispatch({ changes: { from: 0, to: currentText.length, insert: this.documentString } });
    });
  }

  createEditor() {
    let codeEditorElement = this.codeEditor.nativeElement;
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
      parent: codeEditorElement,
    });

    this.editorView.focus();
  }

  cancel() {
    this.documentParsed = null;
    this.documentString = '{}';

    let currentText = this.editorView.state.doc.toString();
    this.editorView.dispatch({ changes: { from: 0, to: currentText.length, insert: this.documentString } });
    this.documentService.deselectDocument();
  }
  
  save() {
    if (!this.project) return;
    if (!this.documentParsed) return;
    if (!this.documentString) return;
    if (!this.editorView) return;

    let jsonParsable = true;
    let update = this.editorView.state.doc.toString();

    try { JSON.parse(update); } catch (error) { jsonParsable = false; }
    if (!jsonParsable) return;

    const originalDocument = this.documents.find((document) => document._id === this.documentParsed._id);
    if (!originalDocument) return;

    const updatedDocument = {...originalDocument };
    updatedDocument.document = update;

    this.store.dispatch(updateDocument({ projectId: this.project._id, document: updatedDocument }));
  }

  delete() {
    if (!this.project) return;
    if (!this.documentParsed) return;

    this.deleteService.initDelete({
      service: 'Document',
      serviceData: this.documentParsed,
      deleteFn: () => {
        this.store.dispatch(deleteDocument({ projectId: this.project!._id, documentId: this.documentParsed._id }));
        this.cancel();
      },
    });
  }
}

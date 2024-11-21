import { DOCUMENT, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Project, Schema, User, View } from '../../store/interfaces/app.interface';
import { selectMainProject, selectSchemas, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { deleteSchema, deselectService, updateSchema } from '../../store/actions/app.action';
import { DeleteService } from '../../services/delete.service';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { oneDarkSmall } from '../../styles/one-dark-small';
import { ResizableHeightDirective } from '../../directives/resizable-height.directive';

@Component({
  selector: 'app-edit-schema',
  standalone: true,
  imports: [NgIf, NgStyle, NgFor, FormsModule, ResizableHeightDirective],
  templateUrl: './edit-schema.component.html',
  styleUrl: './edit-schema.component.scss'
})
export class EditSchemaComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  schema: Schema | null = null;
  project: Project | null = null;

  sub: Subscription | null = null;

  @ViewChild('codeEditor') codeEditor: any;
  editorState!: EditorState;
  editorView!: EditorView;

  @ViewChild('editSchemaCodeContainer') editSchemaCodeContainer!: ElementRef;

  editSchemaHeight: string = localStorage.getItem('editSchemaHeight') || '100';

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.initLatest();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit() {
    this.createEditor();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectSchemas),
    ]).subscribe(([user, view, project, schemas]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const schema = schemas.find((existingSchema) => existingSchema._id === this.view.serviceId);
        this.schema = schema ? { ...schema } : null;
      }
    });
  }

  createEditor() {
    let codeEditorElement = this.codeEditor.nativeElement;
    let myExt: Extension = [basicSetup, javascript(), oneDarkSmall];
    const schema = this.schema?.schema ? this.schema.schema : 'function fn(zod) {\n  \n}';
    
    try {
      this.editorState = EditorState.create({
        doc: schema,
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

  parseEditor(): string {
    if (!this.editorView || !this.editorView.state) return '';

    const schema = this.editorView.state.doc.toString();
    return schema;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.schema) return;

    let schema = { ...this.schema };
    schema.schema = this.parseEditor();

    this.store.dispatch(updateSchema({ projectId: this.project._id, schema: schema }));
  }

  delete() {
    if (!this.project) return;
    if (!this.schema) return;

    const schema = { ...this.schema};

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: schema,
      deleteFn: () => {
        this.store.dispatch(deleteSchema({ projectId: this.project!._id, schemaId: schema._id }));
        this.cancel();
      },
    });
  }
}

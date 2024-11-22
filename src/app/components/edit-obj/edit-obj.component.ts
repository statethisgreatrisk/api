import { Component, ViewChild, Inject, ElementRef } from '@angular/core';
import { DOCUMENT, NgStyle } from '@angular/common';
import { selectObjs, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { deleteObj, deselectService, updateObj } from '../../store/actions/app.action';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { User, View, Project, Obj, AppStateInit } from '../../store/interfaces/app.interface';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { oneDarkSmall } from '../../styles/one-dark-small';
import { ResizableHeightDirective } from '../../directives/resizable-height.directive';

@Component({
  selector: 'app-edit-obj',
  standalone: true,
  imports: [NgIf, NgStyle, FormsModule, ResizableHeightDirective],
  templateUrl: './edit-obj.component.html',
  styleUrl: './edit-obj.component.scss'
})
export class EditObjComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  obj: Obj | null = null;

  sub: Subscription | null = null;

  @ViewChild('codeEditor') codeEditor: any;
  editorState!: EditorState;
  editorView!: EditorView;

  @ViewChild('editObjCodeContainer') editObjCodeContainer!: ElementRef;

  editObjHeight: string = localStorage.getItem('editObjHeight') || '100';

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
      this.store.select(selectObjs),
    ]).subscribe(([user, view, project, objs]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const obj = objs.find((existingObj) => existingObj._id === this.view.serviceId);
        this.obj = obj ? { ...obj } : null;
      }
    });
  }

  createEditor() {
    let codeEditorElement = this.codeEditor.nativeElement;
    let myExt: Extension = [basicSetup, javascript(), oneDarkSmall];
    const obj = this.obj?.obj ? this.obj.obj : 'function fn(context, variables, packages) {\n  \n}';

    try {
      this.editorState = EditorState.create({
        doc: obj,
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

    const obj = this.editorView.state.doc.toString();
    return obj;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.obj) return;

    const obj = { ...this.obj} ;
    obj.obj = this.parseEditor();

    this.store.dispatch(updateObj({ projectId: this.project._id, obj: obj }));
  }

  delete() {
    if (!this.project) return;
    if (!this.obj) return;

    const obj = this.obj;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: obj,
      deleteFn: () => {
        this.store.dispatch(deleteObj({ projectId: this.project!._id, objId: obj._id }));
        this.cancel();
      },
    });
  }
}

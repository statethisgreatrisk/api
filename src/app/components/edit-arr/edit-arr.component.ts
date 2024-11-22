import { DOCUMENT, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { selectArrs, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState, Extension } from '@codemirror/state';
import { Store } from '@ngrx/store';
import { EditorView, basicSetup } from 'codemirror';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { deselectService, updateArr, deleteArr } from '../../store/actions/app.action';
import { User, View, Project, Arr, AppStateInit } from '../../store/interfaces/app.interface';
import { oneDarkSmall } from '../../styles/one-dark-small';
import { ResizableHeightDirective } from '../../directives/resizable-height.directive';

@Component({
  selector: 'app-edit-arr',
  standalone: true,
  imports: [NgIf, NgStyle, FormsModule, ResizableHeightDirective],
  templateUrl: './edit-arr.component.html',
  styleUrl: './edit-arr.component.scss'
})
export class EditArrComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  arr: Arr | null = null;

  sub: Subscription | null = null;

  @ViewChild('codeEditor') codeEditor: any;
  editorState!: EditorState;
  editorView!: EditorView;

  @ViewChild('editArrCodeContainer') editArrCodeContainer!: ElementRef;

  editArrHeight: string = localStorage.getItem('editArrHeight') || '100';

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
      this.store.select(selectArrs),
    ]).subscribe(([user, view, project, arrs]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const arr = arrs.find((existingArr) => existingArr._id === this.view.serviceId);
        this.arr = arr ? { ...arr } : null;
      }
    });
  }

  createEditor() {
    let codeEditorElement = this.codeEditor.nativeElement;
    let myExt: Extension = [basicSetup, javascript(), oneDarkSmall];
    const arr = this.arr?.arr ? this.arr.arr : 'function fn(context, variables, packages) {\n  \n}';

    try {
      this.editorState = EditorState.create({
        doc: arr,
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

    const arr = this.editorView.state.doc.toString();
    return arr;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.arr) return;

    const arr = { ...this.arr} ;
    arr.arr = this.parseEditor();

    this.store.dispatch(updateArr({ projectId: this.project._id, arr: arr }));
  }

  delete() {
    if (!this.project) return;
    if (!this.arr) return;

    const arr = this.arr;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: arr,
      deleteFn: () => {
        this.store.dispatch(deleteArr({ projectId: this.project!._id, arrId: arr._id }));
        this.cancel();
      },
    });
  }
}

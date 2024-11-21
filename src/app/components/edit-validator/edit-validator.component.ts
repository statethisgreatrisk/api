import { NgIf, NgClass, DOCUMENT, NgStyle } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Project, User, Validator, View } from '../../store/interfaces/app.interface';
import { combineLatest, Subscription } from 'rxjs';
import { selectMainProject, selectUser, selectValidators, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { deleteValidator, deselectService, updateValidator } from '../../store/actions/app.action';
import { CapitalizePipe } from '../../services/capitalize.pipe';
import { DeleteService } from '../../services/delete.service';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { oneDarkSmall } from '../../styles/one-dark-small';
import { ResizableHeightDirective } from '../../directives/resizable-height.directive';

@Component({
  selector: 'app-edit-validator',
  standalone: true,
  imports: [NgIf, NgStyle, NgClass, FormsModule, CapitalizePipe, ResizableHeightDirective],
  templateUrl: './edit-validator.component.html',
  styleUrl: './edit-validator.component.scss'
})
export class EditValidatorComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  validator: Validator | null = null;
  project: Project | null = null;

  sub: Subscription | null = null;

  @ViewChild('codeEditor') codeEditor: any;
  editorState!: EditorState;
  editorView!: EditorView;

  @ViewChild('editValidatorCodeContainer') editValidatorCodeContainer!: ElementRef;

  editValidatorHeight: string = localStorage.getItem('editValidatorHeight') || '100';

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
      this.store.select(selectValidators),
    ]).subscribe(([user, view, project, validators]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const validator = validators.find((existingValidator) => existingValidator._id === this.view.serviceId);
        this.validator = validator ? { ...validator } : null;
      }
    });
  }

  createEditor() {
    let codeEditorElement = this.codeEditor.nativeElement;
    let myExt: Extension = [basicSetup, javascript(), oneDarkSmall];
    const validator = this.validator?.validator ? this.validator.validator : 'function fn(check, body, cookie, header, param, query, schemas, ObjectId) {\n  \n}';
    
    try {
      this.editorState = EditorState.create({
        doc: validator,
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

    const fn = this.editorView.state.doc.toString();
    return fn;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.validator) return;

    const validator = { ...this.validator} ;
    validator.validator = this.parseEditor();

    this.store.dispatch(updateValidator({ projectId: this.project._id, validator: validator }));
  }

  delete() {
    if (!this.project) return;
    if (!this.validator) return;

    const validator = { ...this.validator };

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: validator,
      deleteFn: () => {
        this.store.dispatch(deleteValidator({ projectId: this.project!._id, validatorId: validator._id }));
        this.cancel();
      },
    });
  }
}

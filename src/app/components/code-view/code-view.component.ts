import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { selectCodes, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { chunk, cloneDeep, filter, omit, orderBy, some, take} from 'lodash';
import { Subscription, combineLatest } from 'rxjs';
import { DebugViewService } from '../../services/debug-view.service';
import { DeleteService } from '../../services/delete.service';
import { deselectService, deselectWindow, updateCode, updateCodeError, updateCodeSuccess } from '../../store/actions/app.action';
import { User, View, Code, Project, AppStateInit, CodeExport } from '../../store/interfaces/app.interface';
import { NgIf, NgClass, NgFor, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorState, Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { basicSetup, EditorView } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDarkSmallLight } from '../../styles/one-dark-small-light';
import ObjectId from 'bson-objectid';
import { CodeViewService } from '../../services/code-view.service';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-code-view',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, FormsModule],
  templateUrl: './code-view.component.html',
  styleUrl: './code-view.component.scss'
})
export class CodeViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  code: Code | null = null;
  project: Project | null = null;

  sub: Subscription | null = null;
  updateSuccess: Subscription | null = null;
  updateError: Subscription | null = null;

  editingVersionId: string = '';
  editingCodeId: string = '';

  pendingCodeUpdate: string = '';

  @ViewChild('codeEditor') codeEditor: any;
  editorState!: EditorState;
  editorView!: EditorView;

  constructor(
    private store: Store<AppStateInit>,
    private actions$: Actions,
    private codeViewService: CodeViewService,
    private debugViewService: DebugViewService,
    private deleteService: DeleteService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initCallbacks();
    this.initUpdates();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.updateSuccess?.unsubscribe();
    this.updateError?.unsubscribe();
    this.codeViewService.clearCallbacks();
  }

  ngAfterViewInit() {
    this.createEditor();
    this.updateCodeView();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectCodes),
    ]).subscribe(([user, view, project, codes]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.windowId) {
        const code = codes.find((existingCode) => existingCode._id === this.view.windowId);
        this.code = code ? cloneDeep(code) : null;

        if (!this.code) {
          this.codeViewService.clearCodeData();
          return;
        }
        
        
        // If different code
        if (this.editingCodeId !== this.view.windowId) {
          this.editingCodeId = this.view.windowId;

          const latestVersion = this.code.versions[this.code.versions.length - 1];

          this.editingVersionId = latestVersion._id;
          this.code.code = cloneDeep(latestVersion.code);
          this.updateCodeView();

          return;
        }

        // If already editing
        if (this.editingVersionId) {
          const editingVersion = this.code.versions.find((version) => version._id === this.editingVersionId)!;

          this.code.code = cloneDeep(editingVersion.code);
          this.updateCodeView();

          return;
        }

        // If not editing yet
        const latestVersion = this.code.versions[this.code.versions.length - 1];

        this.editingVersionId = latestVersion._id;
        this.code.code = cloneDeep(latestVersion.code);
        this.updateCodeView();
      }
    });
  }

  initUpdates() {
    this.updateSuccess = this.actions$.pipe((ofType(updateCodeSuccess))).subscribe(({ code }) => {
      this.streamAndSaveUpdatedCode();
    });
    this.updateError = this.actions$.pipe((ofType(updateCodeError))).subscribe(({ code }) => {
      this.pendingCodeUpdate = '';
    });
  }

  initCallbacks() {
    this.codeViewService.setGetCodeCallback(this.getCodeCallback);
    this.codeViewService.setUpdateCodeCallback(this.updateCodeCallback);
  }

  createEditor() {
    let codeEditorElement = this.codeEditor.nativeElement;
    let myExt: Extension = [basicSetup, keymap.of([indentWithTab]), javascript(), oneDarkSmallLight];
    const code = this.code?.code ? this.code.code : '';
    
    try {
      this.editorState = EditorState.create({
        doc: code,
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
    if (!this.code) return;

    const originalVersion = this.code.versions.find((version) => version._id === this.editingVersionId)!;

    this.code.code = cloneDeep(originalVersion.code);
    this.updateCodeView();
  }

  close() {
    if (this.view.service === 'Codes') this.store.dispatch(deselectService({ serviceName: '', serviceId: '' }));
    this.store.dispatch(deselectWindow({ windowName: this.view.window, windowId: this.view.windowId }));
  }

  save() {
    if (!this.project) return;
    if (!this.code) return;

    let code = { ...this.code };
    code.code = this.parseEditor();

    let highestVersion = 0;

    code.versions.forEach((version) => {
      if (version.version >= highestVersion) highestVersion = version.version;
    });

    const newVersionId = new ObjectId().toHexString();

    code.versions.push({
      _id: newVersionId,
      version: highestVersion + 1,
      code: cloneDeep(code.code),
    });

    this.editingVersionId = newVersionId;

    // Remove extra versions
    const sortedObjects = orderBy(code.versions, ['version'], ['desc']);
    const latestVersions = take(sortedObjects, 10);

    code.versions = filter(code.versions, (version) => {
      return some(latestVersions, { version: version.version }) || code.versionId === version._id;
    });

    // Delete view code
    const updatedCode: CodeExport = omit(code, 'code');

    this.store.dispatch(updateCode({ projectId: this.project._id, code: updatedCode }));
  }

  nextVersion() {
    if (!this.code) return;

    const currentIndex = this.code.versions.findIndex((version) => version._id === this.editingVersionId)!;

    if (currentIndex < 0 || currentIndex === this.code.versions.length - 1) return;

    const version = this.code.versions[currentIndex + 1];

    this.editingVersionId = version._id;
    this.code.code = cloneDeep(version.code);
    this.updateCodeView();
  }

  previousVersion() {
    if (!this.code) return;

    const currentIndex = this.code.versions.findIndex((version) => version._id === this.editingVersionId)!;

    if (currentIndex <= 0) return;

    const version = this.code.versions[currentIndex - 1];

    this.editingVersionId = version._id;
    this.code.code = cloneDeep(version.code);
    this.updateCodeView();
  }

  findVersion(versionId: string) {
    if (!versionId) return ''
    if (!this.code) return '';

    const version = this.code.versions.find((version) => version._id === versionId)!;
    return version.version;
  }

  getVersionStatus(versionId: string) {
    if (!versionId) return ''
    if (!this.code) return '';

    let highestVersion = 0;

    let highestVersionId = '';
    let deployedVersionId = this.code.versionId;
    
    this.code.versions.forEach((version) => {
      if (version.version >= highestVersion) 
        highestVersion = version.version;
        highestVersionId = version._id;
    });

    let highestStatus = highestVersionId === versionId ? 'Latest' : 'Archive';
    let deployedStatus = deployedVersionId === versionId ? '(Deployed)' : '';

    return `${highestStatus} ${deployedStatus}`;
  }

  updateCodeView() {
    if (!this.code) return;
    if (!this.editorView) return;

    let currentText = this.editorView.state.doc.toString();
    this.editorView.dispatch({ changes: { from: 0, to: currentText.length, insert: this.code.code } });

    const versionStatus = this.getVersionStatus(this.editingVersionId);
    const version = this.findVersion(this.editingVersionId);
    const name = this.code?.name || '';

    this.codeViewService.setCodeData({ code: this.code.code, name, versionId: this.editingVersionId, versionStatus, version });
  }

  getCodeCallback = () => {
    if (!this.code) return '';

    return this.code.code;
  }

  updateCodeCallback = async (updatedCode: string) => {
    if (!this.code) return;
    if (!this.editingVersionId) return;

    const version = this.code.versions.find((version) => version._id === this.editingVersionId)!;

    if (version.code === this.code.code) {
      this.pendingCodeUpdate = updatedCode;
      this.streamAndSaveUpdatedCode();
    } else {
      this.pendingCodeUpdate = updatedCode;
      this.save();
    }
  }

  streamAndSaveUpdatedCode = async () => {
    if (!this.code) return;
    if (!this.pendingCodeUpdate) return;

    this.code.code = '';

    const streams = chunk(Array.from(this.pendingCodeUpdate), 5).map((chunk) => chunk.join(''));

    for (const stream of streams) {
        await new Promise(resolve => setTimeout(resolve, 50));
        this.code.code += stream;
        this.updateCodeView();
    }

    this.pendingCodeUpdate = '';
    this.save();
  }

}

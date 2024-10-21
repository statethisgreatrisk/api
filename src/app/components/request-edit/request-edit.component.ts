import { DOCUMENT, NgClass, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { UpperCasePipe } from '../../services/uppercase.pipe';
import { basicSetup, EditorView } from 'codemirror';
import { EditorState, Extension } from '@codemirror/state';
import { json } from '@codemirror/lang-json';
import { oneDarkSmall } from '../../styles/one-dark-small';

@Component({
  selector: 'app-request-edit',
  standalone: true,
  imports: [NgIf, NgClass, UpperCasePipe],
  templateUrl: './request-edit.component.html',
  styleUrl: './request-edit.component.scss'
})
export class RequestEditComponent {
  requestDropdown = false;
  locationMethodDropdown = false;
  contentTypeDropdown = false;
  authorizationTypeDropdown = false;
  apiKeyPassByDropdown = false;

  tab: string = 'parameters';

  request = '';
  locationMethod = 'get';
  contentType = 'none';
  authorizationType = 'none';
  apiKeyPassBy = 'headers';

  @ViewChild('jsonEditor') jsonEditor: any;
  jsonState!: EditorState;
  jsonView!: EditorView;

  @ViewChild('textEditor') textEditor: any;
  textState!: EditorState;
  textView!: EditorView;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  toggleRequestDropdown() {
    this.requestDropdown = !this.requestDropdown;
  }

  toggleLocationMethodDropdown() {
    this.locationMethodDropdown = !this.locationMethodDropdown;
  }

  toggleContentTypeDropdown() {
    this.contentTypeDropdown = !this.contentTypeDropdown;
  }

  toggleAuthorizationTypeDropdown() {
    this.authorizationTypeDropdown = !this.authorizationTypeDropdown;
  }

  toggleApiKeyPassByDropdown() {
    this.apiKeyPassByDropdown = !this.apiKeyPassByDropdown;
  }

  selectRequest(request: string) {
    this.request = request;
    this.toggleRequestDropdown();
  }

  selectLocationMethod(locationMethod: string) {
    this.locationMethod = locationMethod;
    this.toggleLocationMethodDropdown();
  }

  selectContentType(contentType: string) {
    this.contentType = contentType;
    this.toggleContentTypeDropdown();
    this.configureEditor();
  }

  selectAuthorizationType(authorizationType: string) {
    this.authorizationType = authorizationType;
    this.toggleAuthorizationTypeDropdown();
  }

  selectApiKeyPassBy(apiKeyPassBy: string) {
    this.apiKeyPassBy = apiKeyPassBy;
    this.toggleApiKeyPassByDropdown();
  }

  selectTab(tab: string) {
    this.tab = tab;
    this.requestDropdown = false;
    this.locationMethodDropdown = false;
    this.contentTypeDropdown = false;
    this.authorizationTypeDropdown = false;
    this.apiKeyPassByDropdown = false;

    this.configureEditor();
  }

  configureEditor() {
    if (this.tab === 'body' && this.contentType === 'json') {
      this.cdr.detectChanges();
      this.createJsonEditor();
    } else if (this.tab === 'body' && this.contentType === 'text') {
      this.cdr.detectChanges();
      this.createTextEditor();
    }
  }

  createJsonEditor() {
    let codeEditorElement = this.jsonEditor.nativeElement;
    let myExt: Extension = [basicSetup, json(), oneDarkSmall];
    const jsonDoc = JSON.stringify({}, null, 2);
    
    try {
      this.jsonState = EditorState.create({
        doc: jsonDoc,
        extensions: myExt,
      });
    } catch (e) {
      console.error(e);
    }

    this.jsonView = new EditorView({
      state: this.jsonState,
      parent: codeEditorElement,
    });

    this.jsonView.focus();
  }

  createTextEditor() {
    let codeEditorElement = this.textEditor.nativeElement;
    let myExt: Extension = [basicSetup, oneDarkSmall];
    const textDoc = '';
    
    try {
      this.textState = EditorState.create({
        doc: textDoc,
        extensions: myExt,
      });
    } catch (e) {
      console.error(e);
    }

    this.textView = new EditorView({
      state: this.textState,
      parent: codeEditorElement,
    });

    this.textView.focus();
  }
}

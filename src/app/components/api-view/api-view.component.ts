import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { App, AppStateInit, Argtype, Project, User, View, Workflow, WorkflowRow } from '../../store/interfaces/app.interface';
import { selectApps, selectArgtypes, selectMainProject, selectSchemas, selectUser, selectView, selectWorkflows } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import ObjectId from 'bson-objectid';
import { deselectService, deselectWindow, updateWorkflow } from '../../store/actions/app.action';
import { FormsModule } from '@angular/forms';
import { SelectAppService } from '../../services/select-app.service';
import { cloneDeep, each, isEqual, times } from 'lodash';
import { DebugViewService } from '../../services/debug-view.service';

type indentPairIds = string[];
type indentIds = indentPairIds[];

@Component({
  selector: 'app-api-view',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, FormsModule],
  templateUrl: './api-view.component.html',
  styleUrl: './api-view.component.scss'
})
export class ApiViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  workflow: Workflow | null = null;
  project: Project | null = null;
  argtypes: Argtype[] | null = null;

  apps: App[] = [];

  // [ [['', ''], ['', '']] , [['', ''], ['', '']] ]
  indentIds: indentIds[] = [];

  sub: Subscription | null = null;
  selectAppSub: Subscription | null = null;

  selectedRowId: string = '';

  @ViewChildren('rowInputs') rowInputs!: QueryList<ElementRef>;
  @ViewChildren('rowSpans') rowSpans!: QueryList<ElementRef>;

  ifApp: App | null = null;
  ifCloseApp: App | null = null;

  ifElseApp: App | null = null;
  ifElseMiddleApp: App | null = null;
  ifElseCloseApp: App | null = null;

  forArrayApp: App | null = null;
  forArrayCloseApp: App | null = null;

  forObjectApp: App | null = null;
  forObjectCloseApp: App | null = null;

  commentApp: App | null = null;
  printApp: App | null = null;

  setActionApp: App | null = null;
  setUrlApp: App | null = null;
  clearHeadersApp: App | null = null;
  clearParametersApp: App | null = null;
  clearBodyFormApp: App | null = null;
  addHeaderApp: App | null = null;
  addParameterApp: App | null = null;
  addBodyFormApp: App | null = null;
  setContentTypeApp: App | null = null;
  setBodyTextApp: App | null = null;
  setBodyJsonApp: App | null = null;
  setAuthorizationTypeApp: App | null = null;
  setBearerTokenApp: App | null = null;
  setBasicAuthUsernameApp: App | null = null;
  setBasicAuthPasswordApp: App | null = null;
  setApiKeyApp: App | null = null;
  setApiKeyValueApp: App | null = null;
  setApiKeyPassByApp: App | null = null;

  argtype: any = {};

  schemaNames: string[] = [];

  constructor(
    private store: Store<AppStateInit>,
    private selectAppService: SelectAppService,
    private debugViewService: DebugViewService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initSelectApp();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.selectAppSub?.unsubscribe();
  }

  ngAfterViewInit() {
    this.adjustAllInputs();
  }

  initSelectApp() {
    this.selectAppSub = this.selectAppService.app$.subscribe((app) => {
      if (!app) return;
      
      this.addRow(app);
    });
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectApps),
      this.store.select(selectMainProject),
      this.store.select(selectWorkflows),
      this.store.select(selectSchemas),
      this.store.select(selectArgtypes),
    ]).subscribe(([user, view, apps, project, workflows, schemas, argtypes]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.apps = apps;
      this.schemaNames = schemas.map((schema) => schema.name);
      this.argtypes = argtypes;
      this.setApps();
      this.setArgtypes();

      if (this.user && this.view && this.view.windowId) {
        const workflow = workflows.find((existingWorkflow) => existingWorkflow._id === this.view.windowId);
        this.workflow = workflow ? cloneDeep(workflow) : null;

        if (this.workflow && this.workflow.rows) this.workflow.rows = cloneDeep(this.workflow.rows);

        this.indentIds = [];
        const pairs: any = {};

        if (this.workflow && this.workflow.rows) {
          this.workflow.rows.forEach((row) => {
            if (row.pairId) {
              if (!pairs[row.pairId]) pairs[row.pairId] = [row._id];
              else pairs[row.pairId].push(row._id);
            }
          });

          each(pairs, (pair) => {
            const row = this.workflow!.rows.find((row) => row._id === pair[0]);
            const indent = row!.indents;

            if (this.indentIds[indent] !== undefined) {
              this.indentIds[indent].push(pair);
            } else {
              this.indentIds[indent] = [pair];
            }
          });
        }
        
        this.adjustAllInputs();
      }
    });
  }

  setApps() {
    this.ifApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'if')!;
    this.ifCloseApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'ifClose')!;

    this.ifElseApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'ifElse')!;
    this.ifElseMiddleApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'ifElseMiddle')!;
    this.ifElseCloseApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'ifElseClose')!;

    this.forArrayApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'forArray')!;
    this.forArrayCloseApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'forArrayClose')!;

    this.forObjectApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'forObject')!;
    this.forObjectCloseApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'forObjectClose')!;

    this.commentApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'comment')!;
    this.printApp = this.apps.find((app) => app.name === 'Workflow' && app.method === 'print')!;

    this.setActionApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setAction')!;
    this.setUrlApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setUrl')!;
    this.clearHeadersApp = this.apps.find((app) => app.name === 'Request' && app.method === 'clearHeaders')!;
    this.clearParametersApp = this.apps.find((app) => app.name === 'Request' && app.method === 'clearParameters')!;
    this.clearBodyFormApp = this.apps.find((app) => app.name === 'Request' && app.method === 'clearBodyForm')!;
    this.addHeaderApp = this.apps.find((app) => app.name === 'Request' && app.method === 'addHeader')!;
    this.addParameterApp = this.apps.find((app) => app.name === 'Request' && app.method === 'addParameter')!;
    this.addBodyFormApp = this.apps.find((app) => app.name === 'Request' && app.method === 'addBodyForm')!;
    this.setContentTypeApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setContentType')!;
    this.setBodyTextApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setBodyText')!;
    this.setBodyJsonApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setBodyJson')!;
    this.setAuthorizationTypeApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setAuthorizationType')!;
    this.setBearerTokenApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setBearerToken')!;
    this.setBasicAuthUsernameApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setBasicAuthUsername')!;
    this.setBasicAuthPasswordApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setBasicAuthPassword')!;
    this.setApiKeyApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setApiKey')!;
    this.setApiKeyValueApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setApiKeyValue')!;
    this.setApiKeyPassByApp = this.apps.find((app) => app.name === 'Request' && app.method === 'setApiKeyPassBy')!;
  }

  setArgtypes() {
    this.argtype['null'] = this.argtypes!.find((argtype) => argtype.name === 'null')!.regex;
    this.argtype['boolean'] = this.argtypes!.find((argtype) => argtype.name === 'boolean')!.regex;
    this.argtype['number'] = this.argtypes!.find((argtype) => argtype.name === 'number')!.regex;
    this.argtype['string'] = this.argtypes!.find((argtype) => argtype.name === 'string')!.regex;
    this.argtype['storage'] = this.argtypes!.find((argtype) => argtype.name === 'storage')!.regex;
    this.argtype['function'] = this.argtypes!.find((argtype) => argtype.name === 'function')!.regex;
    this.argtype['request'] = this.argtypes!.find((argtype) => argtype.name === 'request')!.regex;
    this.argtype['object'] = this.argtypes!.find((argtype) => argtype.name === 'object')!.regex;
    this.argtype['array'] = this.argtypes!.find((argtype) => argtype.name === 'array')!.regex;
    this.argtype['url'] = this.argtypes!.find((argtype) => argtype.name === 'url')!.regex;
    this.argtype['any'] = this.argtypes!.find((argtype) => argtype.name === 'any')!.regex;
    this.argtype['condition'] = this.argtypes!.find((argtype) => argtype.name === 'condition')!.regex;
    this.argtype['variable'] = this.argtypes!.find((argtype) => argtype.name === 'variable')!.regex;
    this.argtype['simpleVariable'] = this.argtypes!.find((argtype) => argtype.name === 'simpleVariable')!.regex;
    this.argtype['null-type'] = this.argtypes!.find((argtype) => argtype.name === 'null-type')!.regex;
    this.argtype['boolean-type'] = this.argtypes!.find((argtype) => argtype.name === 'boolean-type')!.regex;
    this.argtype['number-type'] = this.argtypes!.find((argtype) => argtype.name === 'number-type')!.regex;
    this.argtype['string-type'] = this.argtypes!.find((argtype) => argtype.name === 'string-type')!.regex;
    this.argtype['storage-type'] = this.argtypes!.find((argtype) => argtype.name === 'storage-type')!.regex;
    this.argtype['function-type'] = this.argtypes!.find((argtype) => argtype.name === 'function-type')!.regex;
    this.argtype['request-type'] = this.argtypes!.find((argtype) => argtype.name === 'request-type')!.regex;
    this.argtype['object-type'] = this.argtypes!.find((argtype) => argtype.name === 'object-type')!.regex;
    this.argtype['array-type'] = this.argtypes!.find((argtype) => argtype.name === 'array-type')!.regex;
    this.argtype['document-type'] = this.argtypes!.find((argtype) => argtype.name === 'document-type')!.regex;
    this.argtype['any-type'] = this.argtypes!.find((argtype) => argtype.name === 'any-type')!.regex;
    this.argtype['schema-type'] = this.argtypes!.find((argtype) => argtype.name === 'schema-type')!.regex;
  }

  adjustAllInputs() {
    if (!this.workflow || !this.workflow.rows) return;

    this.cdr.detectChanges();

    this.workflow.rows.forEach((row) => {
      row.returns.forEach((rtrn) => {
        this.adjustInputWidth(rtrn._id, rtrn.placeholderWidth, rtrn.argtypes, rtrn.value, true);
      });
      row.schemas.forEach((schema) => {
        this.adjustInputWidth(schema._id, schema.placeholderWidth, schema.argtypes, schema.value, true);
      });
      row.variables.forEach((variable) => {
        this.adjustInputWidth(variable._id, variable.placeholderWidth, variable.argtypes, variable.value, true);
      });
      row.args.forEach((arg) => {
        this.adjustInputWidth(arg._id, arg.placeholderWidth, arg.argtypes, arg.value, true);
      });      
    });

    this.debugViewService.setDebugData({ workflow: this.workflow, argtype: this.argtype });
  }

  adjustInputWidth(argId: string, placeholderWidth: number, args: string[], value: string, bulk: boolean = false) {
    this.cdr.detectChanges();

    if (!this.rowInputs.toArray().length) return;
    if (!this.rowSpans.toArray().length) return;

    let index = 0;

    this.rowInputs.forEach((element, i) => {
      if (element.nativeElement.id === argId) {
        index = i;
      }
    });

    const inputElement = this.rowInputs.toArray()[index].nativeElement;
    const spanElement = this.rowSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? placeholderWidth : spanElement.offsetWidth + 1;
  
    inputElement.style.width = `${width}px`;

    if (!value) {
      this.renderer.removeClass(inputElement, 'invalid');
    } else {
      const valid = this.validate(value, args);
      
      if (!valid) this.renderer.addClass(inputElement, 'invalid');
      else this.renderer.removeClass(inputElement, 'invalid');
    }

    if (this.workflow && !bulk) this.debugViewService.setDebugData({ workflow: this.workflow, argtype: this.argtype });
  }

  validate(value: string, args: string[]): boolean {
    let valid = false;

    args.forEach((arg) => {
      const regex = new RegExp(this.argtype[arg]);
      const matches = regex.test(value);
      if (matches) valid = true;
    });

    return valid;
  }

  addRow(app?: App) {
    if (!this.workflow) return;

    const selectedRow = this.workflow.rows.findIndex((row) => row._id === this.selectedRowId);
    const index = selectedRow >= 0 ? selectedRow + 1 : this.workflow.rows.length;

    let indents = 0;
    
    each(this.indentIds, (indentArray, indentIndex) => {
      each(indentArray, (indentPairs) => {
        times(indentPairs.length - 1, (index) => {
          const openIndex = this.workflow!.rows.findIndex((existingRow) => existingRow._id === indentPairs[index])!;
          const closeIndex = this.workflow!.rows.findIndex((existingRow) => existingRow._id === indentPairs[index + 1])!;
  
          if (selectedRow >= openIndex && selectedRow < closeIndex) {
            indents = indentIndex + 1;
          }
        });
      });
    });

    if (app?._id === this.ifApp!._id) {
      const ifOpenId = new ObjectId().toHexString();
      const ifCloseId = new ObjectId().toHexString();
      const pairId = new ObjectId().toHexString();

      const variables = cloneDeep(this.ifApp!.variables).map((variable) => {
        variable._id = new ObjectId().toHexString();
        return variable;
      });

      const args = cloneDeep(this.ifApp!.args).map((arg) => {
        arg._id = new ObjectId().toHexString();
        return arg;
      });

      const returns = cloneDeep(this.ifApp!.returns).map((rtrn) => {
        rtrn._id = new ObjectId().toHexString();
        return rtrn;
      });

      const schemas = cloneDeep(this.ifApp!.schemas).map((schema) => {
        schema._id = new ObjectId().toHexString();
        return schema;
      });

      const ifOpen = { _id: ifOpenId, appId: this.ifApp!._id, pairId: pairId, indents, variables, args, returns, schemas };
      const ifClose = { _id: ifCloseId, appId: this.ifCloseApp!._id, pairId: pairId, indents, variables: [], args: [], returns: [], schemas: [] };

      const pairIds = [ifOpenId, ifCloseId];

      if (this.indentIds[indents] !== undefined) {
        this.indentIds[indents].push(pairIds);
      } else {
        this.indentIds[indents] = [pairIds];
      }
      
      this.workflow.rows.splice(index, 0, ifOpen);
      this.workflow.rows.splice(index + 1, 0, ifClose);

      this.selectRow(ifOpen._id);
    } else if (app?._id === this.ifElseApp!._id) {
      const ifElseId = new ObjectId().toHexString();
      const ifElseMiddleId = new ObjectId().toHexString();
      const ifElseCloseId = new ObjectId().toHexString();
      const pairId = new ObjectId().toHexString();

      const variables = cloneDeep(this.ifElseApp!.variables).map((variable) => {
        variable._id = new ObjectId().toHexString();
        return variable;
      });

      const args = cloneDeep(this.ifElseApp!.args).map((arg) => {
        arg._id = new ObjectId().toHexString();
        return arg;
      });

      const returns = cloneDeep(this.ifElseApp!.returns).map((rtrn) => {
        rtrn._id = new ObjectId().toHexString();
        return rtrn;
      });

      const schemas = cloneDeep(this.ifElseApp!.schemas).map((schema) => {
        schema._id = new ObjectId().toHexString();
        return schema;
      });

      const ifElse = { _id: ifElseId, appId: this.ifElseApp!._id, pairId: pairId, indents, variables, args, returns, schemas };
      const ifElseMiddle = { _id: ifElseMiddleId, appId: this.ifElseMiddleApp!._id, pairId: pairId, indents, variables: [], args: [], returns: [], schemas: [] };
      const ifElseClose = { _id: ifElseCloseId, appId: this.ifElseCloseApp!._id, pairId: pairId, indents, variables: [], args: [], returns: [], schemas: [] };

      const pairIds = [ifElseId, ifElseMiddleId, ifElseCloseId];

      if (this.indentIds[indents] !== undefined) {
        this.indentIds[indents].push(pairIds);
      } else {
        this.indentIds[indents] = [pairIds];
      }

      this.workflow.rows.splice(index, 0, ifElse);
      this.workflow.rows.splice(index + 1, 0, ifElseMiddle);
      this.workflow.rows.splice(index + 2, 0, ifElseClose);

      this.selectRow(ifElse._id);
    } else if (app?._id === this.forArrayApp!._id) {
      const forArrayId = new ObjectId().toHexString();
      const forArrayCloseId = new ObjectId().toHexString();
      const pairId = new ObjectId().toHexString();

      const variables = cloneDeep(this.forArrayApp!.variables).map((variable) => {
        variable._id = new ObjectId().toHexString();
        return variable;
      });

      const args = cloneDeep(this.forArrayApp!.args).map((arg) => {
        arg._id = new ObjectId().toHexString();
        return arg;
      });

      const returns = cloneDeep(this.forArrayApp!.returns).map((rtrn) => {
        rtrn._id = new ObjectId().toHexString();
        return rtrn;
      });

      const schemas = cloneDeep(this.forArrayApp!.schemas).map((schema) => {
        schema._id = new ObjectId().toHexString();
        return schema;
      });

      const forArray = { _id: forArrayId, appId: this.forArrayApp!._id, pairId: pairId, indents, variables, args, returns, schemas };
      const forArrayClose = { _id: forArrayCloseId, appId: this.forArrayCloseApp!._id, pairId: pairId, indents, variables: [], args: [], returns: [], schemas: [] };

      const pairIds = [forArrayId, forArrayCloseId];

      if (this.indentIds[indents] !== undefined) {
        this.indentIds[indents].push(pairIds);
      } else {
        this.indentIds[indents] = [pairIds];
      }
      
      this.workflow.rows.splice(index, 0, forArray);
      this.workflow.rows.splice(index + 1, 0, forArrayClose);

      this.selectRow(forArray._id);
    } else if (app?._id === this.forObjectApp!._id) {
      const forObjectId = new ObjectId().toHexString();
      const forObjectCloseId = new ObjectId().toHexString();
      const pairId = new ObjectId().toHexString();

      const variables = cloneDeep(this.forObjectApp!.variables).map((variable) => {
        variable._id = new ObjectId().toHexString();
        return variable;
      });

      const args = cloneDeep(this.forObjectApp!.args).map((arg) => {
        arg._id = new ObjectId().toHexString();
        return arg;
      });

      const returns = cloneDeep(this.forObjectApp!.returns).map((rtrn) => {
        rtrn._id = new ObjectId().toHexString();
        return rtrn;
      });

      const schemas = cloneDeep(this.forObjectApp!.schemas).map((schema) => {
        schema._id = new ObjectId().toHexString();
        return schema;
      });

      const forObject = { _id: forObjectId, appId: this.forObjectApp!._id, pairId: pairId, indents, variables, args, returns, schemas };
      const forObjectClose = { _id: forObjectCloseId, appId: this.forObjectCloseApp!._id, pairId: pairId, indents, variables: [], args: [], returns: [], schemas: [] };

      const pairIds = [forObjectId, forObjectCloseId];

      if (this.indentIds[indents] !== undefined) {
        this.indentIds[indents].push(pairIds);
      } else {
        this.indentIds[indents] = [pairIds];
      }
      
      this.workflow.rows.splice(index, 0, forObject);
      this.workflow.rows.splice(index + 1, 0, forObjectClose);

      this.selectRow(forObject._id);
    } else if (app) {
      const variables = cloneDeep(app.variables).map((variable) => {
        variable._id = new ObjectId().toHexString();
        return variable;
      });

      const args = cloneDeep(app.args).map((arg) => {
        arg._id = new ObjectId().toHexString();
        return arg;
      });

      const returns = cloneDeep(app.returns).map((rtrn) => {
        rtrn._id = new ObjectId().toHexString();
        return rtrn;
      });

      const schemas = cloneDeep(app.schemas).map((schema) => {
        schema._id = new ObjectId().toHexString();
        return schema;
      });

      const newApp = { _id: new ObjectId().toHexString(), appId: app._id, pairId: '', indents, variables, args, returns, schemas };
      this.workflow.rows.splice(index, 0, newApp);
      this.selectRow(newApp._id);
    } else {
      const blankApp = { _id: new ObjectId().toHexString(), appId: '', pairId: '', indents: 0, variables: [], args: [], returns: [], schemas: [] };
      this.workflow.rows.splice(index, 0, blankApp);
      this.selectRow(blankApp._id);
    }

    this.adjustAllInputs();
  }

  removeRow(row: WorkflowRow) {
    if (!this.workflow) return;

    let pairIds: string[] = [];

    this.indentIds.forEach((indentIds) => {
      indentIds.forEach((indentPairs) => {
        const foundId = indentPairs.find((id) => id === row._id);
        if (foundId) pairIds = indentPairs;
      });
    });

    if (!pairIds.length) {
      this.workflow.rows = this.workflow.rows.filter((existingRow) => existingRow._id !== row._id);
    } else {
      // Reduce inner block indents
      times(pairIds.length - 1, (index) => {
        const openIndex = this.workflow!.rows.findIndex((existingRow) => existingRow._id === pairIds[index])!;
        const closeIndex = this.workflow!.rows.findIndex((existingRow) => existingRow._id === pairIds[index + 1])!;

        this.workflow!.rows = this.workflow!.rows.map((existingRow, index) => {
          if (index > openIndex && index < closeIndex) {
            existingRow.indents = existingRow.indents - 1;
          }
          return existingRow;
        });
      });
      // Delete pair rows
      this.workflow.rows = this.workflow.rows.filter((existingRow) => {
        return !pairIds.includes(existingRow._id);
      });
      // Delete indent ids
      this.indentIds = this.indentIds.map((indentIds) => {
        let filtered = indentIds.filter((indentPairs) => {
          return !isEqual(indentPairs, pairIds);
        });

        return filtered;
      });
      // Delete empty elements
      const emptyIndex = this.indentIds.findIndex((indentIds) => !indentIds.length);
      if (emptyIndex >= 0) {
        this.indentIds.splice(emptyIndex, 1);
      }
    }

    this.debugViewService.setDebugData({ workflow: this.workflow, argtype: this.argtype });
  }

  cancel() {
    this.store.dispatch(deselectWindow({ windowName: this.view.window, windowId: this.view.windowId }));
  }

  close() {
    if (this.view.service === 'Workflows') this.store.dispatch(deselectService({ serviceName: '', serviceId: '' }));
    this.store.dispatch(deselectWindow({ windowName: this.view.window, windowId: this.view.windowId }));
  }

  save() {
    if (!this.project) return;
    if (!this.workflow) return;

    let workflow = { ...this.workflow };

    this.store.dispatch(updateWorkflow({ projectId: this.project._id, workflow: workflow }));
  }

  selectRow(_id: string) {
    if (!this.workflow) return;
    this.selectedRowId = _id;
  }

  isCommentRow(row: WorkflowRow) {
    if (row.appId === this.commentApp!._id) return true;
    else return false;
  }

  rowType(row: WorkflowRow) {
    if (row.appId === this.ifApp!._id) return 'if';
    else if (row.appId === this.ifCloseApp!._id) return 'ifClose';
    else if (row.appId === this.ifElseApp!._id) return 'ifElse';
    else if (row.appId === this.ifElseMiddleApp!._id) return 'ifElseMiddle';
    else if (row.appId === this.ifElseCloseApp!._id) return 'ifElseClose';
    else if (row.appId === this.forArrayApp!._id) return 'forArray';
    else if (row.appId === this.forArrayCloseApp!._id) return 'forArrayClose';
    else if (row.appId === this.forObjectApp!._id) return 'forObject';
    else if (row.appId === this.forObjectCloseApp!._id) return 'forObjectClose';
    else if (row.appId === this.commentApp!._id) return 'comment';
    else if (row.appId === this.printApp!._id) return 'print';
    else if (row.appId === this.setActionApp!._id) return 'request';
    else if (row.appId === this.setUrlApp!._id) return 'request';
    else if (row.appId === this.clearHeadersApp!._id) return 'request';
    else if (row.appId === this.clearParametersApp!._id) return 'request';
    else if (row.appId === this.clearBodyFormApp!._id) return 'request';
    else if (row.appId === this.addHeaderApp!._id) return 'request';
    else if (row.appId === this.addParameterApp!._id) return 'request';
    else if (row.appId === this.addBodyFormApp!._id) return 'request';
    else if (row.appId === this.setContentTypeApp!._id) return 'request';
    else if (row.appId === this.setBodyTextApp!._id) return 'request';
    else if (row.appId === this.setBodyJsonApp!._id) return 'request';
    else if (row.appId === this.setAuthorizationTypeApp!._id) return 'request';
    else if (row.appId === this.setBearerTokenApp!._id) return 'request';
    else if (row.appId === this.setBasicAuthUsernameApp!._id) return 'request';
    else if (row.appId === this.setBasicAuthPasswordApp!._id) return 'request';
    else if (row.appId === this.setApiKeyApp!._id) return 'request';
    else if (row.appId === this.setApiKeyValueApp!._id) return 'request';
    else if (row.appId === this.setApiKeyPassByApp!._id) return 'request';
    else return 'app';
  }

  findAppName(appId: string) {
    if (!appId || !this.workflow) return;

    const app = this.apps.find((app) => app._id === appId);

    if (!app) return '';
    return app.name + '.' + app.method;
  }
}

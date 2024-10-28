import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { App, AppStateInit, Project, User, View, Workflow, WorkflowRow } from '../../store/interfaces/app.interface';
import { selectApps, selectMainProject, selectUser, selectView, selectWorkflows } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import ObjectId from 'bson-objectid';
import { deselectService, deselectWindow, updateWorkflow } from '../../store/actions/app.action';
import { FormsModule } from '@angular/forms';
import { SelectAppService } from '../../services/select-app.service';
import { each, isEqual, times } from 'lodash';

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

  apps: App[] = [];

  // [ [['', ''], ['', '']] , [['', ''], ['', '']] ]
  indentIds: indentIds[] = [];

  sub: Subscription | null = null;
  selectAppSub: Subscription | null = null;

  selectedRowId: string = '';

  @ViewChildren('rowVariableInputs') rowVariableInputs!: QueryList<ElementRef>;
  @ViewChildren('rowVariableSpans') rowVariableSpans!: QueryList<ElementRef>;

  @ViewChildren('rowArgsInputs') rowArgsInputs!: QueryList<ElementRef>;
  @ViewChildren('rowArgsSpans') rowArgsSpans!: QueryList<ElementRef>;

  @ViewChildren('rowCommentInputs') rowCommentInputs!: QueryList<ElementRef>;
  @ViewChildren('rowCommentSpans') rowCommentSpans!: QueryList<ElementRef>;

  @ViewChildren('rowConditionalsInputs') rowConditionalsInputs!: QueryList<ElementRef>;
  @ViewChildren('rowConditionalsSpans') rowConditionalsSpans!: QueryList<ElementRef>;

  @ViewChildren('rowArrayVariableInputs') rowArrayVariableInputs!: QueryList<ElementRef>;
  @ViewChildren('rowArrayVariableSpans') rowArrayVariableSpans!: QueryList<ElementRef>;
  @ViewChildren('rowArrayArgsInputs') rowArrayArgsInputs!: QueryList<ElementRef>;
  @ViewChildren('rowArrayArgsSpans') rowArrayArgsSpans!: QueryList<ElementRef>;
  @ViewChildren('rowArrayKeyInputs') rowArrayKeyInputs!: QueryList<ElementRef>;
  @ViewChildren('rowArrayKeySpans') rowArrayKeySpans!: QueryList<ElementRef>;

  @ViewChildren('rowObjectVariableInputs') rowObjectVariableInputs!: QueryList<ElementRef>;
  @ViewChildren('rowObjectVariableSpans') rowObjectVariableSpans!: QueryList<ElementRef>;
  @ViewChildren('rowObjectArgsInputs') rowObjectArgsInputs!: QueryList<ElementRef>;
  @ViewChildren('rowObjectArgsSpans') rowObjectArgsSpans!: QueryList<ElementRef>;
  @ViewChildren('rowObjectKeyInputs') rowObjectKeyInputs!: QueryList<ElementRef>;
  @ViewChildren('rowObjectKeySpans') rowObjectKeySpans!: QueryList<ElementRef>;

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

  constructor(
    private store: Store<AppStateInit>,
    private selectAppService: SelectAppService,
    private cdr: ChangeDetectorRef,
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
    ]).subscribe(([user, view, apps, project, workflows]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.apps = apps;
      this.setApps();

      if (this.user && this.view && this.view.windowId) {
        const workflow = workflows.find((existingWorkflow) => existingWorkflow._id === this.view.windowId);
        this.workflow = workflow ? { ...workflow } : null;

        if (this.workflow && this.workflow.rows) this.workflow.rows = [...this.workflow.rows];
        if (this.workflow && this.workflow.rows) this.workflow.rows = this.workflow.rows.map((row) => {
          let mutableRow = { ...row };
          return mutableRow;
        });

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
  }

  adjustAllInputs() {
    if (!this.workflow || !this.workflow.rows) return;

    this.workflow.rows.filter((row) => row.appId && row.appId !== this.ifApp!._id && row.appId !== this.ifCloseApp!._id && row.appId !== this.ifElseApp!._id && row.appId !== this.ifElseMiddleApp!._id && row.appId !== this.ifElseCloseApp!._id && row.appId !== this.forArrayApp!._id && row.appId !== this.forArrayCloseApp!._id && row.appId !== this.forObjectApp!._id && row.appId !== this.forObjectCloseApp!._id && row.appId !== this.commentApp!._id).forEach((_, index) => {
      this.adjustVariableWidth(index);
      this.adjustArgsWidth(index);
    });

    this.workflow.rows.filter((row) => row.appId && row.appId === this.commentApp!._id).forEach((_, index) => {
      this.adjustCommentWidth(index);
    });

    this.workflow.rows.filter((row) => row.appId && row.appId === this.forArrayApp!._id).forEach((_, index) => {
      this.adjustArrayVariableWidth(index);
      this.adjustArrayArgsWidth(index);
      this.adjustArrayKeyWidth(index);
    });

    this.workflow.rows.filter((row) => row.appId && row.appId === this.forObjectApp!._id).forEach((_, index) => {
      this.adjustObjectVariableWidth(index);
      this.adjustObjectArgsWidth(index);
      this.adjustObjectKeyWidth(index);
    });

    this.workflow.rows.filter((row) => row.appId && (row.appId === this.ifApp!._id || row.appId === this.ifElseApp!._id)).forEach((_, index) => {
      this.adjustConditionalsWidth(index);
    });
  }

  adjustVariableWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowVariableInputs.toArray().length) return;
    if (!this.rowVariableSpans.toArray().length) return;

    const inputElement = this.rowVariableInputs.toArray()[index].nativeElement;
    const spanElement = this.rowVariableSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 87 : spanElement.offsetWidth + 1;
  
    inputElement.style.width = `${width}px`;
  }
  
  adjustArgsWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowArgsInputs.toArray().length) return;
    if (!this.rowArgsSpans.toArray().length) return;

    const inputElement = this.rowArgsInputs.toArray()[index].nativeElement;
    const spanElement = this.rowArgsSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 60 : spanElement.offsetWidth + 1;

    inputElement.style.width = `${width}px`;  
  }

  adjustArrayVariableWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowArrayVariableInputs.toArray().length) return;
    if (!this.rowArrayVariableSpans.toArray().length) return;

    const inputElement = this.rowArrayVariableInputs.toArray()[index].nativeElement;
    const spanElement = this.rowArrayVariableSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 46 : spanElement.offsetWidth + 1;
  
    inputElement.style.width = `${width}px`;
  }

  adjustArrayArgsWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowArrayArgsInputs.toArray().length) return;
    if (!this.rowArrayArgsSpans.toArray().length) return;

    const inputElement = this.rowArrayArgsInputs.toArray()[index].nativeElement;
    const spanElement = this.rowArrayArgsSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 34 : spanElement.offsetWidth + 1;
  
    inputElement.style.width = `${width}px`;
  }

  adjustArrayKeyWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowArrayKeyInputs.toArray().length) return;
    if (!this.rowArrayKeySpans.toArray().length) return;

    const inputElement = this.rowArrayKeyInputs.toArray()[index].nativeElement;
    const spanElement = this.rowArrayKeySpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 34 : spanElement.offsetWidth + 1;
  
    inputElement.style.width = `${width}px`;
  }

  adjustObjectVariableWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowObjectVariableInputs.toArray().length) return;
    if (!this.rowObjectVariableSpans.toArray().length) return;

    const inputElement = this.rowObjectVariableInputs.toArray()[index].nativeElement;
    const spanElement = this.rowObjectVariableSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 34 : spanElement.offsetWidth + 1;
  
    inputElement.style.width = `${width}px`;
  }

  adjustObjectArgsWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowObjectArgsInputs.toArray().length) return;
    if (!this.rowObjectArgsSpans.toArray().length) return;

    const inputElement = this.rowObjectArgsInputs.toArray()[index].nativeElement;
    const spanElement = this.rowObjectArgsSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 40 : spanElement.offsetWidth + 1;
  
    inputElement.style.width = `${width}px`;
  }

  adjustObjectKeyWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowObjectKeyInputs.toArray().length) return;
    if (!this.rowObjectKeySpans.toArray().length) return;

    const inputElement = this.rowObjectKeyInputs.toArray()[index].nativeElement;
    const spanElement = this.rowObjectKeySpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 20 : spanElement.offsetWidth + 1;
  
    inputElement.style.width = `${width}px`;
  }

  adjustCommentWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowCommentInputs.toArray().length) return;
    if (!this.rowCommentSpans.toArray().length) return;

    const inputElement = this.rowCommentInputs.toArray()[index].nativeElement;
    const spanElement = this.rowCommentSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 70 : spanElement.offsetWidth + 1;

    inputElement.style.width = `${width}px`;  
  }

  adjustConditionalsWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowConditionalsInputs.toArray().length) return;
    if (!this.rowConditionalsSpans.toArray().length) return;

    const inputElement = this.rowConditionalsInputs.toArray()[index].nativeElement;
    const spanElement = this.rowConditionalsSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 79 : spanElement.offsetWidth + 1;

    inputElement.style.width = `${width}px`;  
  }

  findInputVariableArgsIndex(_id: string) {
    if (!this.workflow) return -1;

    let inputIndex = -1;

    this.workflow.rows.filter((row) => row.appId && row.appId !== this.ifApp!._id && row.appId !== this.ifCloseApp!._id && row.appId !== this.ifElseApp!._id && row.appId !== this.ifElseMiddleApp!._id && row.appId !== this.ifElseCloseApp!._id && row.appId !== this.forArrayApp!._id && row.appId !== this.forArrayCloseApp!._id && row.appId !== this.forObjectApp!._id && row.appId !== this.forObjectCloseApp!._id && row.appId !== this.commentApp!._id).forEach((_, index) => {
      if (_._id === _id) inputIndex = index;
    });

    return inputIndex;
  }

  findArrayVariableArgsKeyIndex(_id: string) {
    if (!this.workflow) return -1;

    let inputIndex = -1;

    this.workflow.rows.filter((row) => row.appId && row.appId === this.forArrayApp!._id).forEach((_, index) => {
      if (_._id === _id) inputIndex = index;
    });

    return inputIndex;
  }

  findObjectVariableArgsKeyIndex(_id: string) {
    if (!this.workflow) return -1;

    let inputIndex = -1;

    this.workflow.rows.filter((row) => row.appId && row.appId === this.forObjectApp!._id).forEach((_, index) => {
      if (_._id === _id) inputIndex = index;
    });

    return inputIndex;
  }

  findInputCommentIndex(_id: string) {
    if (!this.workflow) return -1;

    let inputIndex = -1;

    this.workflow.rows.filter((row) => row.appId && row.appId === this.commentApp!._id).forEach((_, index) => {
      if (_._id === _id) inputIndex = index;
    });

    return inputIndex;
  }

  findInputConditionalsIndex(_id: string) {
    if (!this.workflow) return -1;

    let inputIndex = -1;

    this.workflow.rows.filter((row) => row.appId && (row.appId === this.ifApp!._id || row.appId === this.ifElseApp!._id)).forEach((_, index) => {
      if (_._id === _id) inputIndex = index;
    });

    return inputIndex;
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

      const ifOpen = { _id: ifOpenId, appId: this.ifApp!._id, pairId: pairId, variable: '', args: '', key: '', conditionals: '', comment: '', indents };
      const ifClose = { _id: ifCloseId, appId: this.ifCloseApp!._id, pairId: pairId, variable: '', args: '', key: '', conditionals: '', comment: '', indents };

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

      const ifElse = { _id: ifElseId, appId: this.ifElseApp!._id, pairId: pairId, variable: '', args: '', key: '', conditionals: '', comment: '', indents };
      const ifElseMiddle = { _id: ifElseMiddleId, appId: this.ifElseMiddleApp!._id, pairId: pairId, variable: '', args: '', key: '', conditionals: '', comment: '', indents };
      const ifElseClose = { _id: ifElseCloseId, appId: this.ifElseCloseApp!._id, pairId: pairId, variable: '', args: '', key: '', conditionals: '', comment: '', indents };

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

      const forArray = { _id: forArrayId, appId: this.forArrayApp!._id, pairId: pairId, variable: '', args: '', key: '', conditionals: '', comment: '', indents };
      const forArrayClose = { _id: forArrayCloseId, appId: this.forArrayCloseApp!._id, pairId: pairId, variable: '', args: '', key: '', conditionals: '', comment: '', indents };

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

      const forObject = { _id: forObjectId, appId: this.forObjectApp!._id, pairId: pairId, variable: '', args: '', key: '', conditionals: '', comment: '', indents };
      const forObjectClose = { _id: forObjectCloseId, appId: this.forObjectCloseApp!._id, pairId: pairId, variable: '', args: '', key: '', conditionals: '', comment: '', indents };

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
      const newApp = { _id: new ObjectId().toHexString(), appId: app._id, variable: '', args: '', key: '', conditionals: '', comment: '', pairId: '', indents };
      this.workflow.rows.splice(index, 0, newApp);
      this.selectRow(newApp._id);
    } else {
      const blankApp = { _id: new ObjectId().toHexString(), appId: '', variable: '', args: '', key: '', conditionals: '', comment: '', pairId: '', indents: 0 };
      this.workflow.rows.splice(index, 0, blankApp);
      this.selectRow(blankApp._id);
    }
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
    else return 'app';
  }

  findAppName(appId: string) {
    if (!appId || !this.workflow) return;

    const app = this.apps.find((app) => app._id === appId);

    if (!app) return '';
    return app.name + '.' + app.method;
  }
}

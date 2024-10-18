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
  @ViewChildren('rowArgsInputs') rowArgsInputs!: QueryList<ElementRef>;
  @ViewChildren('rowCommentInputs') rowCommentInputs!: QueryList<ElementRef>;
  @ViewChildren('rowVariableSpans') rowVariableSpans!: QueryList<ElementRef>;
  @ViewChildren('rowArgsSpans') rowArgsSpans!: QueryList<ElementRef>;
  @ViewChildren('rowCommentSpans') rowCommentSpans!: QueryList<ElementRef>;

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

  initSelectApp() {
    this.selectAppSub = this.selectAppService.app$.subscribe((app) => {
      if (!app) return;
      
      this.addRow(app);
    });
  }

  adjustAllInputs() {
    if (!this.workflow || !this.workflow.rows) return;

    const ifApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'if')![0];
    const ifCloseApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'ifClose')![0];
    const commentApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'comment')![0];

    this.workflow.rows.filter((row) => row.appId && row.appId !== ifApp._id && row.appId !== ifCloseApp._id && row.appId !== commentApp._id).forEach((_, index) => {
      this.adjustVariableWidth(index);
      this.adjustArgsWidth(index);
    });

    this.workflow.rows.filter((row) => row.appId && row.appId === commentApp._id).forEach((_, index) => {
      this.adjustCommentWidth(index);
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

  adjustCommentWidth(index: number) {
    this.cdr.detectChanges();

    if (!this.rowCommentInputs.toArray().length) return;
    if (!this.rowCommentSpans.toArray().length) return;

    const inputElement = this.rowCommentInputs.toArray()[index].nativeElement;
    const spanElement = this.rowCommentSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 70 : spanElement.offsetWidth + 1;

    inputElement.style.width = `${width}px`;  
  }

  findInputVariableArgsIndex(_id: string) {
    if (!this.workflow) return -1;

    const ifApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'if')![0];
    const ifCloseApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'ifClose')![0];
    const commentApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'comment')![0];

    let inputIndex = -1;

    this.workflow.rows.filter((row) => row.appId && row.appId !== ifApp._id && row.appId !== ifCloseApp._id && row.appId !== commentApp._id).forEach((_, index) => {
      if (_._id === _id) inputIndex = index;
    });

    return inputIndex;
  }

  findInputCommentIndex(_id: string) {
    if (!this.workflow) return -1;

    const commentApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'comment')![0];

    let inputIndex = -1;

    this.workflow.rows.filter((row) => row.appId && row.appId === commentApp._id).forEach((_, index) => {
      if (_._id === _id) inputIndex = index;
    });

    return inputIndex;
  }

  addRow(app?: App) {
    if (!this.workflow) return;

    const ifApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'if')![0];
    const ifCloseApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'ifClose')![0];

    const ifElseApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'ifElse')![0];
    const ifElseMiddleApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'ifElseMiddle')![0];
    const ifElseCloseApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'ifElseClose')![0];

    const selectedRow = this.workflow.rows.findIndex((row) => row._id === this.selectedRowId);
    const index = selectedRow >= 0 ? selectedRow + 1 : this.workflow.rows.length;

    let indents = 0;
    
    each(this.indentIds, (indentArray, indentIndex) => {
      each(indentArray, ([pair1, pair2]) => {
        const pair1Index = this.workflow!.rows.findIndex((row) => row._id === pair1);
        const pair2Index = this.workflow!.rows.findIndex((row) => row._id === pair2);

        if (selectedRow >= pair1Index && selectedRow < pair2Index) {
          indents = indentIndex + 1;
        }
      });
    });

    if (app?._id === ifApp._id) {
      const ifOpenId = new ObjectId().toHexString();
      const ifCloseId = new ObjectId().toHexString();
      const pairId = new ObjectId().toHexString();

      const ifOpen = { _id: ifOpenId, appId: ifApp._id, pairId: pairId, variable: '', args: '', comment: '', indents };
      const ifClose = { _id: ifCloseId, appId: ifCloseApp._id, pairId: pairId, variable: '', args: '', comment: '', indents };

      const pairIds = [ifOpenId, ifCloseId];

      if (this.indentIds[indents] !== undefined) {
        this.indentIds[indents].push(pairIds);
      } else {
        this.indentIds[indents] = [pairIds];
      }
      
      this.workflow.rows.splice(index, 0, ifOpen);
      this.workflow.rows.splice(index + 1, 0, ifClose);

      this.selectRow(ifOpen._id);
    } else if (app?._id === ifElseApp._id) {
      const ifElseId = new ObjectId().toHexString();
      const ifElseMiddleId = new ObjectId().toHexString();
      const ifElseCloseId = new ObjectId().toHexString();
      const pairId = new ObjectId().toHexString();

      const ifElse = { _id: ifElseId, appId: ifElseApp._id, pairId: pairId, variable: '', args: '', comment: '', indents };
      const ifElseMiddle = { _id: ifElseMiddleId, appId: ifElseMiddleApp._id, pairId: pairId, variable: '', args: '', comment: '', indents };
      const ifElseClose = { _id: ifElseCloseId, appId: ifElseCloseApp._id, pairId: pairId, variable: '', args: '', comment: '', indents };

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
    } else if (app) {
      const newApp = { _id: new ObjectId().toHexString(), appId: app._id, variable: '', args: '', comment: '', pairId: '', indents };
      this.workflow.rows.splice(index, 0, newApp);
      this.selectRow(newApp._id);
    } else {
      const blankApp = { _id: new ObjectId().toHexString(), appId: '', variable: '', args: '', comment: '', pairId: '', indents: 0 };
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

  selectRow(_id: string) {
    if (!this.workflow) return;
    this.selectedRowId = _id;
  }

  cancel() {
    this.store.dispatch(deselectWindow({ windowName: this.view.window, windowId: this.view.windowId }));
  }

  save() {
    if (!this.project) return;
    if (!this.workflow) return;

    let workflow = { ...this.workflow };

    this.store.dispatch(updateWorkflow({ projectId: this.project._id, workflow: workflow }));
  }

  findAppName(appId: string) {
    if (!appId || !this.workflow) return;

    const app = this.apps.find((app) => app._id === appId);

    if (!app) return '';
    return app.name + '.' + app.method;
  }

  close() {
    if (this.view.service === 'Workflows') this.store.dispatch(deselectService({ serviceName: '', serviceId: '' }));
    this.store.dispatch(deselectWindow({ windowName: this.view.window, windowId: this.view.windowId }));
  }

  isCommentRow(row: WorkflowRow) {
    const commentApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'comment')![0];
    
    if (row.appId === commentApp._id) return true;
    else return false;
  }

  rowType(row: WorkflowRow) {
    const ifApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'if')![0];
    const ifCloseApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'ifClose')![0];

    const commentApp = this.apps.filter((app) => app.name === 'Workflow' && app.method === 'comment')![0];

    if (row.appId === ifApp._id) return 'if';
    else if (row.appId === ifCloseApp._id) return 'ifClose';
    else if (row.appId === commentApp._id) return 'comment';
    else return 'app';
  }
}

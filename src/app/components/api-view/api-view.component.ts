import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { App, AppStateInit, Project, User, View, Workflow, WorkflowRow } from '../../store/interfaces/app.interface';
import { selectApps, selectMainProject, selectUser, selectView, selectWorkflows } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import ObjectId from 'bson-objectid';
import { deleteWorkflow, deselectService, deselectWindow, updateWorkflow } from '../../store/actions/app.action';
import { DeleteService } from '../../services/delete.service';
import { FormsModule } from '@angular/forms';
import { SelectAppService } from '../../services/select-app.service';

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

  sub: Subscription | null = null;
  selectAppSub: Subscription | null = null;

  selectedRowId: string = '';

  @ViewChildren('rowVariableInputs') rowVariableInputs!: QueryList<ElementRef>;
  @ViewChildren('rowArgsInputs') rowArgsInputs!: QueryList<ElementRef>;
  @ViewChildren('rowVariableSpans') rowVariableSpans!: QueryList<ElementRef>;
  @ViewChildren('rowArgsSpans') rowArgsSpans!: QueryList<ElementRef>;

  constructor(
    private store: Store<AppStateInit>,
    private selectAppService: SelectAppService,
    private deleteService: DeleteService,
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

    Array.from({ length: this.workflow.rows.length }).forEach((_, index) => {
      this.adjustVariableWidth(index);
      this.adjustArgsWidth(index);
    });
  }

  adjustVariableWidth(index: number) {
    this.cdr.detectChanges();

    const inputElement = this.rowVariableInputs.toArray()[index].nativeElement;
    const spanElement = this.rowVariableSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 87 : spanElement.offsetWidth + 1;
  
    inputElement.style.width = `${width}px`;
  }
  
  adjustArgsWidth(index: number) {
    this.cdr.detectChanges();

    const inputElement = this.rowArgsInputs.toArray()[index].nativeElement;
    const spanElement = this.rowArgsSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 60 : spanElement.offsetWidth + 1;

    inputElement.style.width = `${width}px`;  
  }

  addRow(app?: App) {
    if (!this.workflow) return;

    const selectedRow = this.workflow.rows.findIndex((row) => row._id === this.selectedRowId);
    const index = selectedRow >= 0 ? selectedRow + 1 : this.workflow.rows.length;
    const newApp = { _id: new ObjectId().toHexString(), appId: '', variable: '', args: '' };

    if (app) newApp.appId = app._id;

    this.workflow.rows.splice(index, 0, newApp);
    this.selectRow(newApp._id);
  }

  removeRow(_id: string) {
    if (!this.workflow) return;

    this.workflow.rows = this.workflow.rows.filter((row) => row._id !== _id);
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
}

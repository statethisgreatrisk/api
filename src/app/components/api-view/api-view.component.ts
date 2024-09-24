import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { App, AppStateInit, User, View, Workflow } from '../../store/interfaces/app.interface';
import { selectApps, selectUser, selectView, selectWorkflows } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import ObjectId from 'bson-objectid';
import { deleteWorkflow, deselectWindow, updateWorkflow } from '../../store/actions/app.action';
import { DeleteService } from '../../services/delete.service';
import { FormsModule } from '@angular/forms';

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

  sub: Subscription | null = null;

  apps: App[] = [];

  editingName: boolean = false;

  @ViewChild('editNameElement') editNameElement!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.initLatest();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectApps),
      this.store.select(selectWorkflows),
    ]).subscribe(([user, view, apps, workflows]) => {
      this.user = user;
      this.view = view;
      this.apps = apps;

      if (this.user && this.view && this.view.windowId) {
        const workflow = workflows.find((existingWorkflow) => existingWorkflow._id === this.view.windowId);
        this.workflow = workflow ? { ...workflow } : null;

        if (this.workflow && this.workflow.rows) this.workflow.rows = [...this.workflow.rows];
        if (this.workflow && this.workflow.rows) this.workflow.rows = this.workflow.rows.map((row) => {
          let mutableRow = { ...row };
          return mutableRow;
        });
      }
    });
  }

  addRow() {
    if (!this.workflow) return;

    this.workflow.rows.push({ _id: new ObjectId().toHexString(), appId: '', variable: '', args: '' });
  }

  removeRow(_id: string) {
    if (!this.workflow) return;

    this.workflow.rows = this.workflow.rows.filter((row) => row._id !== _id);
  }

  cancel() {
    this.store.dispatch(deselectWindow({ windowName: this.view.window, windowId: this.view.windowId }));
  }

  save() {
    if (!this.workflow) return;

    let workflow = { ...this.workflow };

    this.store.dispatch(updateWorkflow({ workflow: workflow }));
  }

  delete() {
    if (!this.workflow) return;

    const workflow = this.workflow;

    this.deleteService.initDelete({
      service: this.view.window,
      serviceData: workflow,
      deleteFn: () => {
        this.store.dispatch(deleteWorkflow({ userId: workflow.userId, workflowId: workflow._id }));
        this.cancel();
      },
    });
  }

  showEditName() {
    this.editingName = true;
    this.cdr.detectChanges();

    const input = this.editNameElement.nativeElement;
    input.focus();

    const length = input.value.length;
    input.setSelectionRange(length, length);
  }

  hideEditName() {
    this.editingName = false;
  }
}

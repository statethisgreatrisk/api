import { Component } from '@angular/core';
import { API, AppStateInit, Project, User, View, Workflow } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { selectUser, selectView, selectMainProject, selectAPIs, selectWorkflows } from '../../store/selectors/app.selector';
import { deleteWorkflow, deselectService, updateWorkflow } from '../../store/actions/app.action';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityViewService } from '../../services/activity-view.service';

@Component({
  selector: 'app-edit-workflow',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './edit-workflow.component.html',
  styleUrl: './edit-workflow.component.scss'
})
export class EditWorkflowComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  workflow: Workflow | null = null;
  project: Project | null = null;
  activityViewOpen: boolean = false;

  sub: Subscription | null = null;
  activityViewSub: Subscription | null = null;

  apis: API[] = [];

  dropdown = false;

  constructor(
    private store: Store<AppStateInit>,
    private activityViewService: ActivityViewService,
    private deleteService: DeleteService,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initAPIs();
    this.initActivityView();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.activityViewSub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectWorkflows),
    ]).subscribe(([user, view, project, workflows]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const workflow = workflows.find((existingWorkflow) => existingWorkflow._id === this.view.serviceId);
        this.workflow = workflow ? { ...workflow } : null;
      }
    });
  }

  initAPIs() {
    this.store.select(selectAPIs).subscribe((apis) => {
      this.apis = apis;
    });
  }

  initActivityView() {
    this.activityViewService.activityView$.subscribe((activityView) => this.activityViewOpen = activityView);
  }

  toggleActivityView() {
    this.activityViewService.toggleActivityView();
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.workflow) return;
    this.store.dispatch(updateWorkflow({ projectId: this.project._id, workflow: this.workflow }));
  }

  delete() {
    if (!this.project) return;
    if (!this.workflow) return;

    const workflow = this.workflow;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: workflow,
      deleteFn: () => {
        this.store.dispatch(deleteWorkflow({ projectId: this.project!._id, workflowId: workflow._id }));
        this.cancel();
      },
    });
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }
}

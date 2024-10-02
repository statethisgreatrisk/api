import { Component } from '@angular/core';
import { API, AppStateInit, Project, User, View, Workflow } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { selectUser, selectView, selectMainProject, selectAPIs, selectWorkflows } from '../../store/selectors/app.selector';
import { deleteWorkflow, deselectService, updateWorkflow } from '../../store/actions/app.action';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  sub: Subscription | null = null;

  apis: API[] = [];

  dropdown = false;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initAPIs();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
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

  selectAPI(apiId: string) {
    if (!apiId || !this.workflow) return;

    this.workflow.apiId = apiId;
  }

  removeAPI() {
    if (!this.workflow) return;
    this.workflow.apiId = '';
  }

  findAPI(apiId: string) {
    if (!apiId || !this.workflow) return;

    const api = this.apis.find((api) => api._id === apiId);

    if (!api) return '';
    return api.name;
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

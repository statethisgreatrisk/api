import { Component } from '@angular/core';
import { API, AppStateInit, Project, User, View, Workflow, WorkflowVersion } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { selectUser, selectView, selectMainProject, selectAPIs, selectWorkflows } from '../../store/selectors/app.selector';
import { deleteWorkflow, deselectService, updateWorkflow } from '../../store/actions/app.action';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cloneDeep } from 'lodash';

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

  versions: WorkflowVersion[] = [];

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
        this.workflow = workflow ? cloneDeep(workflow) : null;

        if (!this.workflow) return;
        this.versions = cloneDeep(this.workflow.versions).reverse();
      }
    });
  }

  initAPIs() {
    this.store.select(selectAPIs).subscribe((apis) => {
      this.apis = apis;
    });
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

  selectVersion(version: WorkflowVersion) {
    if (!this.workflow) return;

    this.toggleDropdown();
    this.workflow.versionId = version._id;
  }

  findVersion(versionId: string) {
    if (!this.workflow) return;

    return this.workflow.versions.find((version) => version._id === versionId);
  }
}

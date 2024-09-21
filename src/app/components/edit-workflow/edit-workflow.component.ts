import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit, User, View, Workflow } from '../../store/interfaces/app.interface';
import { deselectService, selectWindow, updateWorkflow } from '../../store/actions/app.action';
import { combineLatest, Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectUser, selectView, selectWorkflows } from '../../store/selectors/app.selector';

@Component({
  selector: 'app-edit-workflow',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-workflow.component.html',
  styleUrl: './edit-workflow.component.scss'
})
export class EditWorkflowComponent {
  user: User | null = null;
  view: View = { service: '', serviceDataId: '', window: '', windowId: '' };
  workflow: Workflow | null = null;

  sub: Subscription | null = null;

  constructor(
    private store: Store<AppStateInit>,
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
      this.store.select(selectWorkflows),
    ]).subscribe(([user, view, workflows]) => {
      this.user = user;
      this.view = view;

      if (this.user && this.view && this.view.serviceDataId) {
        const workflow = workflows.find((existingWorkflow) => existingWorkflow._id === this.view.serviceDataId);
        this.workflow = workflow ? { ...workflow } : null;
      }
    });
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceDataId: this.view.serviceDataId }));
  }

  save() {
    if (!this.workflow) return;
    this.store.dispatch(updateWorkflow({ workflow: this.workflow }));
  }

  openView() {
    this.store.dispatch(selectWindow({ windowName: 'Workflow', windowId: '1' }));
  }
}

import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Project, User, Variable, View } from '../../store/interfaces/app.interface';
import { selectMainProject, selectUser, selectVariables, selectView } from '../../store/selectors/app.selector';
import { deleteVariable, deselectService, updateVariable } from '../../store/actions/app.action';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-edit-variable',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-variable.component.html',
  styleUrl: './edit-variable.component.scss'
})
export class EditVariableComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  variable: Variable | null = null;

  sub: Subscription | null = null;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
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
      this.store.select(selectMainProject),
      this.store.select(selectVariables),
    ]).subscribe(([user, view, project, variables]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const variable = variables.find((existingVariable) => existingVariable._id === this.view.serviceId);
        this.variable = variable ? { ...variable } : null;
      }
    });
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.variable) return;

    this.store.dispatch(updateVariable({ projectId: this.project._id, variable: this.variable }));
  }

  delete() {
    if (!this.project) return;
    if (!this.variable) return;

    const variable = this.variable;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: variable,
      deleteFn: () => {
        this.store.dispatch(deleteVariable({ projectId: this.project!._id, variableId: variable._id }));
        this.cancel();
      },
    });
  }
}

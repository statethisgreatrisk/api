import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { API, AppStateInit, Project, User, Validator, View } from '../../store/interfaces/app.interface';
import { combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAPIs, selectMainProject, selectUser, selectValidators, selectView } from '../../store/selectors/app.selector';
import { deleteAPI, deselectService, updateAPI } from '../../store/actions/app.action';
import { UpperCasePipe } from '../../services/uppercase.pipe';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-edit-api',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, FormsModule, UpperCasePipe],
  templateUrl: './edit-api.component.html',
  styleUrl: './edit-api.component.scss'
})
export class EditApiComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  api: API | null = null;
  project: Project | null = null;

  sub: Subscription | null = null;

  validators: Validator[] = [];

  prefixDropdown = false;
  dropdown = false;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initValidators();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectAPIs),
    ]).subscribe(([user, view, project, apis]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const api = apis.find((existingAPI) => existingAPI._id === this.view.serviceId);
        this.api = api ? { ...api } : null;
      }
    });
  }

  initValidators() {
    this.store.select(selectValidators).subscribe((validators) => {
      this.validators = validators;
    });
  }

  selectAction(action: API['action']) {
    if (!this.api) return;
    this.api.action = action;
  }

  selectValidator(validatorId: string) {
    if (!validatorId || !this.api) return;
    
    const found = this.api.validators.find((id) => id === validatorId);
    if (found) return;

    this.api.validators = [...this.api.validators, validatorId];
  }

  removeValidator(validatorId: string) {
    if (!validatorId || !this.api) return;

    const validators = this.api.validators.filter((id) => id !== validatorId);

    this.api.validators = validators;
  }

  findValidator(validatorId: string) {
    if (!validatorId || !this.api) return;

    const validator = this.validators.find((validator) => validator._id === validatorId);

    if (!validator) return '';
    return validator.name;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.api) return;
    this.store.dispatch(updateAPI({ projectId: this.project._id, api: this.api }));
  }

  delete() {
    if (!this.project) return;
    if (!this.api) return;

    const api = this.api;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: api,
      deleteFn: () => {
        this.store.dispatch(deleteAPI({ projectId: this.project!._id, apiId: api._id }));
        this.cancel();
      },
    });
  }

  togglePrefixDropdown() {
    this.prefixDropdown = !this.prefixDropdown;
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }
}

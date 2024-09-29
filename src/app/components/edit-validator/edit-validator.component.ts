import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Project, User, Validator, View } from '../../store/interfaces/app.interface';
import { combineLatest, Subscription } from 'rxjs';
import { selectMainProject, selectUser, selectValidators, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { deleteValidator, deselectService, updateValidator } from '../../store/actions/app.action';
import { CapitalizePipe } from '../../services/capitalize.pipe';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-edit-validator',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, CapitalizePipe],
  templateUrl: './edit-validator.component.html',
  styleUrl: './edit-validator.component.scss'
})
export class EditValidatorComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  validator: Validator | null = null;
  project: Project | null = null;

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
      this.store.select(selectValidators),
    ]).subscribe(([user, view, project, validators]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const validator = validators.find((existingValidator) => existingValidator._id === this.view.serviceId);
        this.validator = validator ? { ...validator } : null;
      }
    });
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.validator) return;

    const validator = { ...this.validator} ;
    // parse code

    this.store.dispatch(updateValidator({ projectId: this.project._id, validator: validator }));
  }

  delete() {
    if (!this.project) return;
    if (!this.validator) return;

    const validator = { ...this.validator };

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: validator,
      deleteFn: () => {
        this.store.dispatch(deleteValidator({ projectId: this.project!._id, validatorId: validator._id }));
        this.cancel();
      },
    });
  }
}

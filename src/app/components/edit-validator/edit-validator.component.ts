import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, User, Validator, View } from '../../store/interfaces/app.interface';
import { combineLatest, Subscription } from 'rxjs';
import { selectUser, selectValidators, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { deleteValidator, deselectService, updateValidator } from '../../store/actions/app.action';
import { CapitalizePipe } from '../../services/capitalize.pipe';

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

  sub: Subscription | null = null;

  prefixDropdown = false;

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
      this.store.select(selectValidators),
    ]).subscribe(([user, view, validators]) => {
      this.user = user;
      this.view = view;

      if (this.user && this.view && this.view.serviceId) {
        const validator = validators.find((existingValidator) => existingValidator._id === this.view.serviceId);
        this.validator = validator ? { ...validator } : null;
      }
    });
  }

  selectField(field: Validator['field']) {
    if (!this.validator) return;
    this.validator.field = field;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.validator) return;
    this.store.dispatch(updateValidator({ validator: this.validator }));
  }

  delete() {
    if (!this.validator) return;

    if (window.confirm('Are you sure you want to delete this Validator?')) {
      this.store.dispatch(deleteValidator({ userId: this.validator.userId, validatorId: this.validator._id }));
      this.cancel();
    }
  }

  togglePrefixDropdown() {
    this.prefixDropdown = !this.prefixDropdown;
  }
}

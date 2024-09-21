import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { API, AppStateInit, User, View } from '../../store/interfaces/app.interface';
import { combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAPIs, selectUser, selectView } from '../../store/selectors/app.selector';
import { deleteAPI, deselectService, updateAPI } from '../../store/actions/app.action';
import { UpperCasePipe } from '../../services/uppercase.pipe';

@Component({
  selector: 'app-edit-api',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, UpperCasePipe],
  templateUrl: './edit-api.component.html',
  styleUrl: './edit-api.component.scss'
})
export class EditApiComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  api: API | null = null;

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
      this.store.select(selectAPIs),
    ]).subscribe(([user, view, apis]) => {
      this.user = user;
      this.view = view;

      if (this.user && this.view && this.view.serviceId) {
        const api = apis.find((existingAPI) => existingAPI._id === this.view.serviceId);
        this.api = api ? { ...api } : null;
      }
    });
  }

  selectAction(action: API['action']) {
    if (!this.api) return;
    this.api.action = action;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.api) return;
    this.store.dispatch(updateAPI({ api: this.api }));
  }

  delete() {
    if (!this.api) return;

    if (window.confirm('Are you sure you want to delete this API?')) {
      this.store.dispatch(deleteAPI({ userId: this.api.userId, apiId: this.api._id }));
      this.cancel();
    }
  }

  togglePrefixDropdown() {
    this.prefixDropdown = !this.prefixDropdown;
  }
}

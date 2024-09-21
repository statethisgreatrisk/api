import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { ServiceEditComponent } from './components/service-edit/service-edit.component';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { View, AppStateInit } from './store/interfaces/app.interface';
import { StorageViewComponent } from './components/storage-view/storage-view.component';
import { ApiViewComponent } from './components/api-view/api-view.component';
import { LandingViewComponent } from './components/landing-view/landing-view.component';
import { ToastViewComponent } from './components/toast-view/toast-view.component';
import { getAPIs, getSchemas, getStorages, getUser, getValidators, getWorkflows } from './store/actions/app.action';
import { selectView } from './store/selectors/app.selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    ServicesComponent,
    ServiceEditComponent,
    StorageViewComponent,
    ApiViewComponent,
    LandingViewComponent,
    ToastViewComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  view: View = { service: '', serviceId: '', window: '', windowId: '' };

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initView();
    this.dispatchUser();
    this.dispatchAPIs();
    this.dispatchStorages();
    this.dispatchSchemas();
    this.dispatchValidators();
    this.dispatchWorkflows();
  }

  initView() {
    this.store.select(selectView).subscribe((view) => {
      if (!view) return;
      this.view = view;
    });
  }

  dispatchUser() {
    this.store.dispatch(getUser({ userId: '66e7f036567ffc29c90400f5' }));
  }

  dispatchAPIs() {
    this.store.dispatch(getAPIs({ userId: '66e7f036567ffc29c90400f5' }));
  }

  dispatchStorages() {
    this.store.dispatch(getStorages({ userId: '66e7f036567ffc29c90400f5' }));
  }

  dispatchSchemas() {
    this.store.dispatch(getSchemas({ userId: '66e7f036567ffc29c90400f5' }));
  }

  dispatchValidators() {
    this.store.dispatch(getValidators({ userId: '66e7f036567ffc29c90400f5' }));
  }

  dispatchWorkflows() {
    this.store.dispatch(getWorkflows({ userId: '66e7f036567ffc29c90400f5' }));
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { ServiceEditComponent } from './components/service-edit/service-edit.component';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { View, AppStateInit, DeleteData } from './store/interfaces/app.interface';
import { StorageViewComponent } from './components/storage-view/storage-view.component';
import { ApiViewComponent } from './components/api-view/api-view.component';
import { LandingViewComponent } from './components/landing-view/landing-view.component';
import { ToastViewComponent } from './components/toast-view/toast-view.component';
import { getAPIs, getSchemas, getStorages, getUser, getValidators, getWorkflows } from './store/actions/app.action';
import { selectView } from './store/selectors/app.selector';
import { DeleteViewComponent } from './components/delete-view/delete-view.component';
import { DeleteService } from './services/delete.service';

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
    ToastViewComponent,
    DeleteViewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  deleteData: DeleteData | null = null;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
  ) {}

  ngOnInit() {
    this.initView();
    this.dispatchUser();
    this.dispatchAPIs();
    this.dispatchStorages();
    this.dispatchSchemas();
    this.dispatchValidators();
    this.dispatchWorkflows();
    this.initDeleteView();
  }

  initView() {
    this.store.select(selectView).subscribe((view) => {
      if (!view) return;
      this.view = view;
    });
  }

  initDeleteView() {
    this.deleteService.deleteData$.subscribe((deleteData) => this.deleteData = deleteData);
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

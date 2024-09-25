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
import { getAPIs, getApps, getBillings, getDeploys, getKeys, getLogs, getSchemas, getStorages, getUsages, getUser, getValidators, getWorkflows } from './store/actions/app.action';
import { selectView } from './store/selectors/app.selector';
import { DeleteViewComponent } from './components/delete-view/delete-view.component';
import { DeleteService } from './services/delete.service';
import { AppViewComponent } from './components/app-view/app-view.component';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { SettingsService } from './services/settings.service';

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
    AppViewComponent,
    SettingsViewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  deleteData: DeleteData | null = null;
  settingsOpen: boolean = false;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
    private settingsService: SettingsService,
  ) {}

  ngOnInit() {
    this.initView();
    this.initDeleteView();
    this.initSettingsView();
    this.dispatchUser();
    this.dispatchAPIs();
    this.dispatchStorages();
    this.dispatchSchemas();
    this.dispatchValidators();
    this.dispatchWorkflows();
    this.dispatchApps();
    this.dispatchDeploys();
    this.dispatchLogs();
    this.dispatchKeys();
    this.dispatchBillings();
    this.dispatchUsages();
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

  initSettingsView() {
    this.settingsService.settingsOpen$.subscribe((settingsOpen) => this.settingsOpen = settingsOpen);
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

  dispatchApps() {
    this.store.dispatch(getApps({ userId: '66e7f036567ffc29c90400f5' }));
  }

  dispatchDeploys() {
    this.store.dispatch(getDeploys({ userId: '66e7f036567ffc29c90400f5' }));
  }

  dispatchLogs() {
    this.store.dispatch(getLogs({ userId: '66e7f036567ffc29c90400f5' }));
  }

  dispatchKeys() {
    this.store.dispatch(getKeys({ userId: '66e7f036567ffc29c90400f5' }));
  }

  dispatchBillings() {
    this.store.dispatch(getBillings({ userId: '66e7f036567ffc29c90400f5' }));
  }

  dispatchUsages() {
    this.store.dispatch(getUsages({ userId: '66e7f036567ffc29c90400f5' }));
  }
}

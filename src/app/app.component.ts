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
import { authError, authSuccess, checkUser, clearStore, getAPIs, getApps, getSchemas, getStorages, getUser, getValidators, getWorkflows, requestError } from './store/actions/app.action';
import { selectView } from './store/selectors/app.selector';
import { DeleteViewComponent } from './components/delete-view/delete-view.component';
import { DeleteService } from './services/delete.service';
import { AppViewComponent } from './components/app-view/app-view.component';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { SettingsService } from './services/settings.service';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { AuthService } from './services/auth.service';
import { Actions, ofType } from '@ngrx/effects';
import { ToastService } from './services/toast.service';

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
    LoginViewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  deleteData: DeleteData | null = null;
  settingsOpen: boolean = false;
  loginOpen: boolean = false;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
    private settingsService: SettingsService,
    private authService: AuthService,
    private toastService: ToastService,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.initView();
    this.initDeleteView();
    this.initSettingsView();
    this.initLoginView();
    this.initRequestErrors();
    this.initAuthSuccessResponses();
    this.initAuthErrors();
    this.dispatchCheck();
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

  initLoginView() {
    this.authService.loginOpen$.subscribe((loginOpen) => this.loginOpen = loginOpen);
  }
  
  initAuthSuccessResponses() {
    this.actions$.pipe((ofType(authSuccess))).subscribe((authResponse) => {
      if (authResponse.action === 'login') this.dispatchV1();
      if (authResponse.action === 'check') this.dispatchV1();
      if (authResponse.action === 'logout') {
        this.clearStore();
        this.settingsService.closeSettings();
        this.authService.openLogin();
      }
    });
  }

  initAuthErrors() {
    this.actions$.pipe((ofType(authError))).subscribe((authResponse) => {
      if (authResponse.action === 'check') this.authService.openLogin();
    });
  }

  initRequestErrors() {
    this.actions$.pipe((ofType(requestError))).subscribe((requestError) => {
      const statusCode = requestError.error.status;
      const errorMessage = requestError.message;

      if (statusCode === 401 && errorMessage === 'Unauthorized') this.authService.openLogin();
      else this.toastService.addToast({ type: 'alert', text: errorMessage });
    });
  }

  dispatchV1 = async () => {
    const delay = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    const actions = [
      this.dispatchUser,
      this.dispatchAPIs,
      this.dispatchStorages,
      this.dispatchSchemas,
      this.dispatchValidators,
      this.dispatchWorkflows,
      this.dispatchApps,
    ];

    for (const dispatch of actions) {
      dispatch.bind(this)();
      await delay(500);
    }
  }

  dispatchCheck() {
    this.store.dispatch(checkUser());
  }

  dispatchUser() {
    this.store.dispatch(getUser());
  }

  dispatchAPIs() {
    this.store.dispatch(getAPIs());
  }

  dispatchStorages() {
    this.store.dispatch(getStorages());
  }

  dispatchSchemas() {
    this.store.dispatch(getSchemas());
  }

  dispatchValidators() {
    this.store.dispatch(getValidators());
  }

  dispatchWorkflows() {
    this.store.dispatch(getWorkflows());
  }

  dispatchApps() {
    this.store.dispatch(getApps());
  }

  clearStore() {
    this.store.dispatch(clearStore());
  }
}

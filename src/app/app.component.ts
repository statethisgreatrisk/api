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
import { addProject, authError, authSuccess, changeProject, checkUser, clearData, clearStore, getAPIs, getApps, getDocuments, getFns, getObjs, getProjects, getRequests, getSchemas, getStorages, getUser, getValidators, getVariables, getWebsockets, getWorkflows, requestError } from './store/actions/app.action';
import { selectMainProject, selectView } from './store/selectors/app.selector';
import { DeleteViewComponent } from './components/delete-view/delete-view.component';
import { DeleteService } from './services/delete.service';
import { AppViewComponent } from './components/app-view/app-view.component';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { SettingsService } from './services/settings.service';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { AuthService } from './services/auth.service';
import { Actions, ofType } from '@ngrx/effects';
import { ToastService } from './services/toast.service';
import { Subscription } from 'rxjs';
import { DocumentEditComponent } from './components/document-edit/document-edit.component';
import { RowEditComponent } from './components/row-edit/row-edit.component';

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
    DocumentEditComponent,
    RowEditComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  deleteData: DeleteData | null = null;
  settingsOpen: boolean = false;
  loginOpen: boolean = false;
  
  projectsSub: Subscription | null = null;

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
    this.initProjectAdded();
    this.initProjectChanged();
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

  initProjectAdded() {
    this.actions$.pipe((ofType(addProject))).subscribe((project) => {
      localStorage.setItem('mainProject', project.project._id);
      this.store.dispatch(clearData());
      this.dispatchV1(project.project._id);
    });
  }

  initProjectChanged() {
    this.actions$.pipe((ofType(changeProject))).subscribe((project) => {
      localStorage.setItem('mainProject', project.projectId);
      this.store.dispatch(clearData());
      this.dispatchV1(project.projectId);
    });
  }

  dispatchV1 = async (projectId?: string) => {
    const delay = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    const actions = [
      this.dispatchUser,
      this.dispatchApps,
      this.dispatchProjects,
    ];

    const projectActions = [
      this.dispatchWorkflows,
      this.dispatchAPIs,
      this.dispatchStorages,
      this.dispatchSchemas,
      this.dispatchValidators,
      this.dispatchFns,
      this.dispatchObjs,
      this.dispatchRequests,
      this.dispatchVariables,
      this.dispatchWebsockets,
      this.dispatchDocuments,
    ];

    if (!projectId) {
      for (const dispatch of actions) {
        dispatch.bind(this)();
        await delay(100);
      }

      this.projectsSub = this.store.select(selectMainProject).subscribe(async (project) => {
        if (!project) return;
  
        for (const dispatch of projectActions) {
          const dispatchAction: (projectId: string) => void = dispatch;
          dispatchAction.bind(this)(project!._id);
          await delay(100);
        }
  
        this.projectsSub?.unsubscribe();
      });
    } else {
      for (const dispatch of projectActions) {
        const dispatchAction: (projectId: string) => void = dispatch;
        dispatchAction.bind(this)(projectId);
        await delay(100);
      }
    }
  }

  dispatchCheck() {
    this.store.dispatch(checkUser());
  }

  dispatchUser() {
    this.store.dispatch(getUser());
  }

  dispatchProjects() {
    this.store.dispatch(getProjects());
  }

  dispatchApps() {
    this.store.dispatch(getApps());
  }

  dispatchAPIs(projectId: string) {
    this.store.dispatch(getAPIs({ projectId: projectId }));
  }

  dispatchStorages(projectId: string) {
    this.store.dispatch(getStorages({ projectId: projectId }));
  }

  dispatchSchemas(projectId: string) {
    this.store.dispatch(getSchemas({ projectId: projectId }));
  }

  dispatchValidators(projectId: string) {
    this.store.dispatch(getValidators({ projectId: projectId }));
  }

  dispatchWorkflows(projectId: string) {
    this.store.dispatch(getWorkflows({ projectId: projectId }));
  }

  dispatchFns(projectId: string) {
    this.store.dispatch(getFns({ projectId: projectId }));
  }

  dispatchObjs(projectId: string) {
    this.store.dispatch(getObjs({ projectId: projectId }));
  }

  dispatchRequests(projectId: string) {
    this.store.dispatch(getRequests({ projectId: projectId }));
  }

  dispatchVariables(projectId: string) {
    this.store.dispatch(getVariables({ projectId: projectId }));
  }

  dispatchWebsockets(projectId: string) {
    this.store.dispatch(getWebsockets({ projectId: projectId }));
  }

  dispatchDocuments(projectId: string) {
    this.store.dispatch(getDocuments({ projectId: projectId }));
  }

  clearStore() {
    this.store.dispatch(clearStore());
  }
}

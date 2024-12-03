import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { ServiceEditComponent } from './components/service-edit/service-edit.component';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { View, AppStateInit, DeleteData, InfoData } from './store/interfaces/app.interface';
import { StorageViewComponent } from './components/storage-view/storage-view.component';
import { LandingViewComponent } from './components/landing-view/landing-view.component';
import { ToastViewComponent } from './components/toast-view/toast-view.component';
import { addProject, authError, authSuccess, changeProject, checkUser, clearData, clearStore, getProjectData, getProjectSettings, getProjectSetup, requestError } from './store/actions/app.action';
import { selectMainProject, selectView } from './store/selectors/app.selector';
import { DeleteViewComponent } from './components/delete-view/delete-view.component';
import { DeleteService } from './services/delete.service';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { SettingsService } from './services/settings.service';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { AuthService } from './services/auth.service';
import { Actions, ofType } from '@ngrx/effects';
import { ToastService } from './services/toast.service';
import { Subscription } from 'rxjs';
import { DocumentEditComponent } from './components/document-edit/document-edit.component';
import { ActivityViewComponent } from './components/activity-view/activity-view.component';
import { ActivityViewService } from './services/activity-view.service';
import { InfoService } from './services/info.service';
import { InfoViewComponent } from './components/info-view/info-view.component';
import { TabViewComponent } from './components/tab-view/tab-view.component';
import { DebugViewService } from './services/debug-view.service';
import { DebugViewComponent } from './components/debug-view/debug-view.component';
import { LogsViewComponent } from './components/logs-view/logs-view.component';
import { LogsViewService } from './services/logs-view.service';
import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { CodeViewComponent } from './components/code-view/code-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    ServicesComponent,
    ServiceEditComponent,
    StorageViewComponent,
    CodeViewComponent,
    ChatViewComponent,
    LandingViewComponent,
    ToastViewComponent,
    DeleteViewComponent,
    SettingsViewComponent,
    LoginViewComponent,
    DocumentEditComponent,
    ActivityViewComponent,
    InfoViewComponent,
    TabViewComponent,
    DebugViewComponent,
    LogsViewComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  deleteData: DeleteData | null = null;
  infoData: InfoData | null = null;
  settingsOpen: boolean = false;
  loginOpen: boolean = false;
  activityViewOpen: boolean = false;
  debugViewOpen: boolean = false;
  logsViewOpen: boolean = false;
  
  projectsSub: Subscription | null = null;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
    private infoService: InfoService,
    private settingsService: SettingsService,
    private authService: AuthService,
    private toastService: ToastService,
    private activityViewService: ActivityViewService,
    private debugViewService: DebugViewService,
    private logsViewService: LogsViewService,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.initView();
    this.initDeleteView();
    this.initInfoView();
    this.initSettingsView();
    this.initLoginView();
    this.initActivityView();
    this.initDebugView();
    this.initLogsView();
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

  initInfoView() {
    this.infoService.infoData$.subscribe((infoData) => this.infoData = infoData);
  }

  initSettingsView() {
    this.settingsService.settingsOpen$.subscribe((settingsOpen) => this.settingsOpen = settingsOpen);
  }

  initLoginView() {
    this.authService.loginOpen$.subscribe((loginOpen) => this.loginOpen = loginOpen);
  }

  initActivityView() {
    this.activityViewService.activityView$.subscribe((activityView) => this.activityViewOpen = activityView);
  }

  initDebugView() {
    this.debugViewService.debugView$.subscribe((debugView) => this.debugViewOpen = debugView);
  }

  initLogsView() {
    this.logsViewService.logsView$.subscribe((logsView) => this.logsViewOpen = logsView);
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
      this.dispatchProjectSetup,
    ];

    const projectActions = [
      this.dispatchProjectData,
      this.dispatchProjectSettings,
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

  dispatchProjectSetup() {
    this.store.dispatch(getProjectSetup());
  }

  dispatchProjectData(projectId: string) {
    this.store.dispatch(getProjectData({ projectId: projectId }));
  }

  dispatchProjectSettings(projectId: string) {
    this.store.dispatch(getProjectSettings({ projectId: projectId }));
  }

  clearStore() {
    this.store.dispatch(clearStore());
  }
}

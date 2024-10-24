import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { AccountViewComponent } from '../account-view/account-view.component';
import { DeployViewComponent } from '../deploy-view/deploy-view.component';
import { LogViewComponent } from '../log-view/log-view.component';
import { KeyViewComponent } from '../key-view/key-view.component';
import { BillingViewComponent } from '../billing-view/billing-view.component';
import { UsageViewComponent } from '../usage-view/usage-view.component';
import { Store } from '@ngrx/store';
import { getDeploys, getLogs, getKeys, getBillings, getUsages, authSuccess, logoutUser, getSubs, getInstances, getDeployStatus, getRegisters } from '../../store/actions/app.action';
import { AppStateInit, Project, User } from '../../store/interfaces/app.interface';
import { ProjectDetailViewComponent } from '../project-detail-view/project-detail-view.component';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { selectMainProject, selectUser } from '../../store/selectors/app.selector';
import { SubViewComponent } from '../sub-view/sub-view.component';
import { UpgradeViewComponent } from '../upgrade-view/upgrade-view.component';
import { RegisterViewComponent } from '../register-view/register-view.component';

@Component({
  selector: 'app-settings-view',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    AccountViewComponent,
    DeployViewComponent,
    LogViewComponent,
    KeyViewComponent,
    BillingViewComponent,
    UsageViewComponent,
    ProjectDetailViewComponent,
    SubViewComponent,
    UpgradeViewComponent,
    RegisterViewComponent
  ],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent {
  user: User | null = null;
  userSub: Subscription | null = null;
  project: Project | null = null;
  projectSub: Subscription | null = null;

  logoutSub: Subscription | null = null;

  loading: boolean = false;
  
  setting: string = 'project';

  constructor(private settingsService: SettingsService, private store: Store<AppStateInit>, private actions$: Actions,) {}

  ngOnInit() {
    this.initUser();
    this.dispatchV1();
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.logoutSub?.unsubscribe();
  }

  initUser() {
    this.userSub = this.store.select(selectUser).subscribe((user) => this.user = user);
  }

  initLogoutRequest() {
    this.logoutSub = this.actions$.pipe((ofType(authSuccess))).subscribe((authResponse) => {
      if (authResponse.action === 'logout') {
        this.loading = false;
      }
    });
  }

  dispatchV1 = async () => {
    const delay = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    const projectActions = [
      this.dispatchInstances,
      this.dispatchDeploys,

      this.dispatchLogs,
      this.dispatchKeys,
      this.dispatchBillings,
      this.dispatchUsages,
      this.dispatchSubs,
      this.dispatchRegisters,
    ];

    this.projectSub = this.store.select(selectMainProject).subscribe(async (project) => {
      if (!project) return;

      this.project = project;

      for (const dispatch of projectActions) {
        const dispatchAction: (projectId: string) => void = dispatch;
        dispatchAction.bind(this)(project!._id);
        await delay(250);
      }

      this.projectSub?.unsubscribe();
    });
  }

  dispatchInstances(projectId: string) {
    this.store.dispatch(getInstances({ projectId: projectId }));
  }

  dispatchDeploys(projectId: string) {
    this.store.dispatch(getDeploys({ projectId: projectId }));
  }

  dispatchLogs(projectId: string) {
    this.store.dispatch(getLogs({ projectId: projectId }));
  }

  dispatchKeys(projectId: string) {
    this.store.dispatch(getKeys({ projectId: projectId }));
  }

  dispatchBillings(projectId: string) {
    this.store.dispatch(getBillings({ projectId: projectId }));
  }

  dispatchUsages(projectId: string) {
    this.store.dispatch(getUsages({ projectId: projectId }));
  }

  dispatchSubs(projectId: string) {
    this.store.dispatch(getSubs({ projectId: projectId }));
  }

  dispatchRegisters(projectId: string) {
    this.store.dispatch(getRegisters({ projectId: projectId }));
  }
  
  closeSettings() {
    this.settingsService.closeSettings();
  }

  selectSetting(setting: string) {
    this.setting = setting;
  }

  logout() {
    if (!this.user) return;
    this.loading = true;
    this.store.dispatch(logoutUser({ email: this.user.email }));
  }
}

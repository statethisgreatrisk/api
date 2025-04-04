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
import { authSuccess, logoutUser } from '../../store/actions/app.action';
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
    this.projectSub = this.store.select(selectMainProject).subscribe(async (project) => {
      if (!project) return;

      this.project = project;
      this.projectSub?.unsubscribe();
    });
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

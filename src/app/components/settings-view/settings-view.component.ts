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
import { getDeploys, getLogs, getKeys, getBillings, getUsages, authSuccess, logoutUser } from '../../store/actions/app.action';
import { AppStateInit, User } from '../../store/interfaces/app.interface';
import { ProjectDetailViewComponent } from '../project-detail-view/project-detail-view.component';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { selectUser } from '../../store/selectors/app.selector';

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
  ],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent {
  user: User | null = null;
  userSub: Subscription | null = null;
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

    const actions = [
      this.dispatchDeploys,
      this.dispatchLogs,
      this.dispatchKeys,
      this.dispatchBillings,
      this.dispatchUsages,
    ];

    for (const dispatch of actions) {
      dispatch.bind(this)();
      await delay(250);
    }
  }

  dispatchDeploys() {
    this.store.dispatch(getDeploys());
  }

  dispatchLogs() {
    this.store.dispatch(getLogs());
  }

  dispatchKeys() {
    this.store.dispatch(getKeys());
  }

  dispatchBillings() {
    this.store.dispatch(getBillings());
  }

  dispatchUsages() {
    this.store.dispatch(getUsages());
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

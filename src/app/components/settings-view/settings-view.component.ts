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
import { getDeploys, getLogs, getKeys, getBillings, getUsages } from '../../store/actions/app.action';
import { AppStateInit } from '../../store/interfaces/app.interface';

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
  ],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent {
  setting: string = 'account';

  constructor(private settingsService: SettingsService, private store: Store<AppStateInit>,) {}

  ngOnInit() {
    this.dispatchV1();
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
}

import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { AccountViewComponent } from '../account-view/account-view.component';
import { DeployViewComponent } from '../deploy-view/deploy-view.component';
import { LogViewComponent } from '../log-view/log-view.component';
import { KeyViewComponent } from '../key-view/key-view.component';
import { BillingViewComponent } from '../billing-view/billing-view.component';

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
  ],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent {
  setting: string = 'billing';

  constructor(private settingsService: SettingsService) {}

  closeSettings() {
    this.settingsService.closeSettings();
  }

  selectSetting(setting: string) {
    this.setting = setting;
  }
}

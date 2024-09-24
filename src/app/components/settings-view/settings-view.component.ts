import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { AccountViewComponent } from '../account-view/account-view.component';

@Component({
  selector: 'app-settings-view',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    AccountViewComponent,
  ],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent {
  setting: string = 'account';

  constructor(private settingsService: SettingsService) {}

  closeSettings() {
    this.settingsService.closeSettings();
  }

  selectSetting(setting: string) {
    this.setting = setting;
  }
}

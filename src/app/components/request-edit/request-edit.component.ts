import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UpperCasePipe } from '../../services/uppercase.pipe';

@Component({
  selector: 'app-request-edit',
  standalone: true,
  imports: [NgIf, NgClass, UpperCasePipe],
  templateUrl: './request-edit.component.html',
  styleUrl: './request-edit.component.scss'
})
export class RequestEditComponent {
  locationDropdown = false;
  contentTypeDropdown = false;
  authorizationTypeDropdown = false;

  tab: string = 'parameters';

  toggleLocationDropdown() {
    this.locationDropdown = !this.locationDropdown;
  }

  toggleContentTypeDropdown() {
    this.contentTypeDropdown = !this.contentTypeDropdown;
  }

  toggleAuthorizationTypeDropdown() {
    this.authorizationTypeDropdown = !this.authorizationTypeDropdown;
  }

  selectTab(tab: string) {
    this.tab = tab;
  }
}

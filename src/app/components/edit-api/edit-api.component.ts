import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-api',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './edit-api.component.html',
  styleUrl: './edit-api.component.scss'
})
export class EditApiComponent {
  prefixDropdownVisible = false;
  dropdownVisible = false;

  togglePrefixDropdown() {
    if (this.dropdownVisible) this.dropdownVisible = false;
    this.prefixDropdownVisible = !this.prefixDropdownVisible;
  }

  toggleDropdown() {
    if (this.prefixDropdownVisible) this.prefixDropdownVisible = false;
    this.dropdownVisible = !this.dropdownVisible;
  }
}

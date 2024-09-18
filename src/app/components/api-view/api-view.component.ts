import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-api-view',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './api-view.component.html',
  styleUrl: './api-view.component.scss'
})
export class ApiViewComponent {
  dropdownVisible = false;
  dropdownVisible2 = false;

  toggleDropdown() {
    if (this.dropdownVisible2) this.dropdownVisible2 = false;
    this.dropdownVisible = !this.dropdownVisible;
  }

  toggleDropdown2() {
    if (this.dropdownVisible) this.dropdownVisible = false;
    this.dropdownVisible2 = !this.dropdownVisible2;
  }
}

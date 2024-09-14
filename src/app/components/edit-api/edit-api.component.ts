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
  dropdownVisible = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}

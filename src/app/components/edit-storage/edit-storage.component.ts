import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-storage',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './edit-storage.component.html',
  styleUrl: './edit-storage.component.scss'
})
export class EditStorageComponent {
  dropdownVisible = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}

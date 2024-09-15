import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-validation',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './edit-validation.component.html',
  styleUrl: './edit-validation.component.scss'
})
export class EditValidationComponent {
  prefixDropdownVisible = false;

  togglePrefixDropdown() {
    this.prefixDropdownVisible = !this.prefixDropdownVisible;
  }
}

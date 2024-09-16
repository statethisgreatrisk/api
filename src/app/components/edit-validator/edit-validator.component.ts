import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-validator',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './edit-validator.component.html',
  styleUrl: './edit-validator.component.scss'
})
export class EditValidatorComponent {
  prefixDropdownVisible = false;

  togglePrefixDropdown() {
    this.prefixDropdownVisible = !this.prefixDropdownVisible;
  }
}

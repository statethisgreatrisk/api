import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-schema',
  standalone: true,
  imports: [NgIf],
  templateUrl: './edit-schema.component.html',
  styleUrl: './edit-schema.component.scss'
})
export class EditSchemaComponent {
  prefixDropdownVisible = false;

  togglePrefixDropdown() {
    this.prefixDropdownVisible = !this.prefixDropdownVisible;
  }
}

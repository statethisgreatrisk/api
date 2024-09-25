import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-usage-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './usage-view.component.html',
  styleUrl: './usage-view.component.scss'
})
export class UsageViewComponent {
  dropdown: boolean = false;

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }
}

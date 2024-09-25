import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-billing-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './billing-view.component.html',
  styleUrl: './billing-view.component.scss'
})
export class BillingViewComponent {
  dropdown: boolean = false;

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }
}

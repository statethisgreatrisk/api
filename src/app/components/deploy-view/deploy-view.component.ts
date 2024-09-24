import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-deploy-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './deploy-view.component.html',
  styleUrl: './deploy-view.component.scss'
})
export class DeployViewComponent {
  dropdown: boolean = false;
  dropdown2: boolean = false;

  toggleDropdown() {
    if (this.dropdown2) this.dropdown2 = false;
    this.dropdown = !this.dropdown;
  }
  
  toggleDropdown2() {
    if (this.dropdown) this.dropdown = false;
    this.dropdown2 = !this.dropdown2;
  }
}

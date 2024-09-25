import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-log-view',
  standalone: true,
  imports: [NgIf, JsonPipe],
  templateUrl: './log-view.component.html',
  styleUrl: './log-view.component.scss'
})
export class LogViewComponent {
  dropdown: boolean = false;

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }
}

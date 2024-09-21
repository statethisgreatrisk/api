import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit } from '../../store/interfaces/app.interface';
import { selectWindow } from '../../store/actions/app.action';

@Component({
  selector: 'app-edit-storage',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './edit-storage.component.html',
  styleUrl: './edit-storage.component.scss'
})
export class EditStorageComponent {
  dropdownVisible = false;

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  openView() {
    this.store.dispatch(selectWindow({ windowName: 'Storage', windowId: '1' }));
  }
}

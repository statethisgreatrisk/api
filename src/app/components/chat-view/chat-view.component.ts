import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat-view',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, FormsModule],
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss'
})
export class ChatViewComponent {
  sidebarWidth: string = '400px';
  sidebarView = true;

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {

  }

  toggleSidebar() {
    this.sidebarView = !this.sidebarView;

    if (!this.sidebarView) this.sidebarWidth = 'auto';
    else this.sidebarWidth = '400px';
  }
}

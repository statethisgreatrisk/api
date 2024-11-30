import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Chat, Code, Project, User, View } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { selectChats, selectCodes, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-chat-view',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, FormsModule],
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss'
})
export class ChatViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  codes: Code[] | null = null;
  chats: Chat[] | null = null;

  sub: Subscription | null = null;

  sidebarWidth: string = '400px';
  sidebarView = true;

  constructor(
    private store: Store<AppStateInit>
  ) {}

  ngOnInit() {
    this.initLatest();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectCodes),
      this.store.select(selectChats),
    ]).subscribe(([user, view, project, codes, chats]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.codes = codes;
      this.chats = chats;
    });
  }

  toggleSidebar() {
    this.sidebarView = !this.sidebarView;

    if (!this.sidebarView) this.sidebarWidth = 'auto';
    else this.sidebarWidth = '400px';
  }
}

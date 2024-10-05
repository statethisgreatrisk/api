import { Component } from '@angular/core';
import { AppStateInit, Project, Sub, User, View } from '../../store/interfaces/app.interface';
import { selectMainProject, selectSubs, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sub-view',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './sub-view.component.html',
  styleUrl: './sub-view.component.scss'
})
export class SubViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  subs: Sub[] | null = null;

  sub: Subscription | null = null;

  constructor(
    private store: Store<AppStateInit>,
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
      this.store.select(selectSubs),
    ]).subscribe(([user, view, project, subs]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.subs = subs;
    });
  }
}

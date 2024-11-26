import { Component } from '@angular/core';
import { AppStateInit, Pool, Project, Sub, User, View } from '../../store/interfaces/app.interface';
import { selectMainProject, selectPools, selectSubs, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createPool } from '../../store/actions/app.action';

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
  pools: Pool[] | null = null;
  pool: Pool | null = null;

  sub: Subscription | null = null;

  callbackUrl = '';
  logoutUrl = '';

  activated = true;

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
      this.store.select(selectPools),
    ]).subscribe(([user, view, project, subs, pools]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.subs = subs;
      this.pools = pools;

      if (pools && pools.length) this.pool = pools[0];
      if (this.pool) {
        this.callbackUrl = this.pool.callbackUrl;
        this.logoutUrl = this.pool.logoutUrl;
      }
    });
  }

  activate() {
    this.activated = true;
  }

  createUserPool() {
    if (!this.project) return;
    if (!this.user) return;

    const userId = this.user._id;
    const projectId = this.project._id;
    const _id = '';
    const cognitoPoolId = '';
    const date = new Date().toISOString();
    const active = true;
    const callbackUrl = this.callbackUrl;
    const logoutUrl = this.logoutUrl;

    this.store.dispatch(createPool({ projectId, pool: { _id, projectId, userId, date, active, cognitoPoolId, callbackUrl, logoutUrl } }));
  }
}

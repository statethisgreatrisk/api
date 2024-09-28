import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { User, View, Project, Deploy, AppStateInit, Log } from '../../store/interfaces/app.interface';
import { selectUser, selectView, selectMainProject, selectDeploys, selectLogs } from '../../store/selectors/app.selector';

@Component({
  selector: 'app-log-view',
  standalone: true,
  imports: [NgIf, NgFor, JsonPipe],
  templateUrl: './log-view.component.html',
  styleUrl: './log-view.component.scss'
})
export class LogViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  deploys: Deploy[] | null = null;
  deploy: Deploy | null = null;
  logs: Log[] | null = null;

  sub: Subscription | null = null;

  dropdown: boolean = false;
  dropdown2: boolean = false;

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
      this.store.select(selectDeploys),
      this.store.select(selectLogs),
    ]).subscribe(([user, view, project, deploys, logs]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (deploys) {
        this.deploys = deploys;

        if (deploys.length) {
          const sorted = [...deploys].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
          this.deploy = sorted[0];
        } else {
          this.deploy = null;
        }
      }

      if (logs) {
        const sorted = [...logs].filter((log) => log.deployId === this.deploy!._id).sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
        this.logs = sorted;
      }
    });
  }

  selectDeploy(deployId: string) {
    this.toggleDropdown();
    if (!this.deploys) return;

    const deploy = this.deploys.find((deploy) => deploy._id === deployId);
    if (!deploy) return;

    this.deploy = deploy;

    if (!this.logs) return;

    const sorted = [...this.logs].filter((log) => log.deployId === this.deploy!._id).sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
    this.logs = sorted;
  }

  toggleDropdown() {
    if (this.dropdown2) this.dropdown2 = false;
    this.dropdown = !this.dropdown;
  }

  toggleDropdown2() {
    if (this.dropdown) this.dropdown = false;
    this.dropdown2 = !this.dropdown2;
  }
}

import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { User, View, Project, Deploy, AppStateInit, Log } from '../../store/interfaces/app.interface';
import { selectUser, selectView, selectMainProject, selectDeploys, selectLogs } from '../../store/selectors/app.selector';

@Component({
  selector: 'app-log-view',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, JsonPipe],
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

      if (deploys && deploys.length) {
        const sorted = [...deploys].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
        this.deploys = sorted;
        this.deploy = sorted[0];
      } else {
        this.deploys = null;
        this.deploy = null;
      }

      if (logs && logs.length) {
        const sorted = [...logs].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
        this.logs = sorted;
      } else {
        this.logs = null;
      }
    });
  }

  selectDeploy(deployId: string) {
    this.toggleDropdown();
    if (!this.deploys) return;

    const deploy = this.deploys.find((deploy) => deploy._id === deployId);
    if (!deploy) return;

    this.deploy = deploy;
  }

  deployLogs(deployId: string): string[] {
    if (!this.logs || !deployId) return [];

    const logs = this.logs.filter((log) => log.deployId === deployId);
    const logJson = logs.reduce((a: string[], b) => { return a.concat([...b.logs])}, []);
    return logJson.map((log) => {
      const json = JSON.parse(log);
      const dateObj = new Date(json.date);
      const date = dateObj.toLocaleDateString();
      const time = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(dateObj);
      const datetime = `${date} ${time}`;
      const logString = typeof json.log === 'object' ? JSON.stringify(json.log) : json.log;
      return `${datetime}: ${logString}`;
    });
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

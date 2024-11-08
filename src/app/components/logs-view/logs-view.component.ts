import { Component } from '@angular/core';
import { LogsViewService } from '../../services/logs-view.service';
import { NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { User, View, Project, Deploy, Log, AppStateInit } from '../../store/interfaces/app.interface';
import { selectUser, selectView, selectMainProject, selectDeploys, selectLogs } from '../../store/selectors/app.selector';

@Component({
  selector: 'app-logs-view',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './logs-view.component.html',
  styleUrl: './logs-view.component.scss'
})
export class LogsViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  deploy: Deploy | null = null;
  logs: Log[] | null = null;
  logStrings: string[] = [];

  sub: Subscription | null = null;
  
  constructor(
    private logsViewService: LogsViewService,
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
        this.deploy = sorted[0];
      } else {
        this.deploy = null;
      }

      if (logs && logs.length) {
        const sorted = [...logs].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
        this.logs = sorted;
        this.logStrings = this.deployLogs(this.deploy?._id);
      } else {
        this.logs = null;
        this.logStrings = [];
      }
    });
  }

  deployLogs(deployId?: string): string[] {
    if (!this.logs || !deployId) return [];

    const logs = this.logs.filter((log) => log.deployId === deployId);
    const logJson = logs.reduce((a: string[], b) => { return a.concat([...b.logs])}, []);
    const logJsonUpdated = logJson.map((log) => {
      const json = JSON.parse(log);
      const dateObj = new Date(json.date);
      const date = dateObj.toLocaleDateString();
      const time = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(dateObj);
      const datetime = `${date} ${time}`;
      const logString = typeof json.log === 'object' ? JSON.stringify(json.log) : json.log;
      return `${datetime}: ${logString}`;
    });

    return logJsonUpdated;
  }
}

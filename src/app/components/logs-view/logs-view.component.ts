import { Component } from '@angular/core';
import { LogsViewService } from '../../services/logs-view.service';
import { NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { User, View, Project, Deploy, Log, AppStateInit, Instance } from '../../store/interfaces/app.interface';
import { selectUser, selectView, selectMainProject, selectDeploys, selectLogs, selectInstances } from '../../store/selectors/app.selector';
import { Actions, ofType } from '@ngrx/effects';
import { getDeployStatusSuccess, getDeployStatusError, getDeployStatus, getLogs } from '../../store/actions/app.action';
import { CapitalizePipe } from '../../services/capitalize.pipe';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-logs-view',
  standalone: true,
  imports: [NgFor, NgIf, CapitalizePipe],
  templateUrl: './logs-view.component.html',
  styleUrl: './logs-view.component.scss'
})
export class LogsViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  instance: Instance | null = null;
  deploys: Deploy[] | null = null;
  deploy: Deploy | null = null;
  logs: Log[] | null = null;
  logStrings: string[] = [];

  sub: Subscription | null = null;
  deployStatusSuccessSub: Subscription | null = null;
  deployStatusErrorSub: Subscription | null = null;

  status: string = 'stopped';
  statusInitialLoad = false;

  deployDropdown = false;
  
  constructor(
    private actions$: Actions,
    private logsViewService: LogsViewService,
    private store: Store<AppStateInit>,
    public socketService: SocketService,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initDeployStatusSuccess();
    this.initDeployStatusError();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.deployStatusSuccessSub?.unsubscribe();
    this.deployStatusErrorSub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectInstances),
      this.store.select(selectDeploys),
      this.store.select(selectLogs),
      this.logsViewService.selectedDeployment$,
    ]).subscribe(([user, view, project, instances, deploys, logs, selectedDeployment]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.project && this.view.windowId) {
        if (instances && instances.length) {
          this.instance = instances[0];
        } else {
          this.instance = null;
        }

        if (deploys && deploys.length) {
          const sorted = [...deploys].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
          this.deploys = sorted;
          if (selectedDeployment) this.deploy = selectedDeployment;
          if (this.deploy && !this.statusInitialLoad) {
            this.store.dispatch(getDeployStatus({ projectId: this.project._id, deployId: this.deploy._id }));
            this.statusInitialLoad = true;
          }
        } else {
          this.deploys = null;
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
      }
    });
  }

  initDeployStatusSuccess() {
    this.deployStatusSuccessSub = this.actions$.pipe((ofType(getDeployStatusSuccess))).subscribe(({ status }) => {
      this.status = status.status;
    });
  }

  initDeployStatusError() {
    this.deployStatusErrorSub = this.actions$.pipe((ofType(getDeployStatusError))).subscribe(() => {
      this.status = 'error';
    });
  }

  deployLogs(deployId?: string): string[] {
    if (!this.logs || !deployId) return [];

    const logs = this.logs.filter((log) => log.deployId === deployId);
    const logJson = logs.reduce((a: string[], b) => { return a.concat([...b.logs])}, []);
    
    let logJsonUpdated = logJson.map((log) => {
      const json = JSON.parse(log);
      const dateObj = new Date(json.date);
      const date = dateObj.toLocaleDateString();
      const time = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", second: "numeric", hour12: true }).format(dateObj);
      const datetime = `${date} ${time}`;
      const logString = typeof json.log === 'object' ? JSON.stringify(json.log) : json.log;
      return `${datetime}: ${logString}`;
    });

    return logJsonUpdated;
  }

  toggleDeployDropdown() {
    this.deployDropdown = !this.deployDropdown;
  }

  selectDeploy(deploy: Deploy) {
    if (!this.project) return;

    this.logsViewService.setDeployment(deploy);
    this.toggleDeployDropdown();

    this.store.dispatch(getDeployStatus({ projectId: this.project._id, deployId: deploy._id }));
    this.store.dispatch(getLogs({ projectId: this.project._id }));
  }

  connectToSocket() {
    if (!this.user) return;
    if (!this.instance) return;
    if (!this.project) return;

    this.socketService.init(this.instance.name, this.user._id);
  }

  refresh() {
    if (!this.project) return;
    if (!this.deploy) return;

    this.store.dispatch(getDeployStatus({ projectId: this.project._id, deployId: this.deploy._id }));
    this.store.dispatch(getLogs({ projectId: this.project._id }));
  }
}

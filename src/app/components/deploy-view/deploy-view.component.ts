import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { deployStartError, deployStartSuccess, deployStopError, deployStopSuccess, getDeployStatus, getDeployStatusError, getDeployStatusSuccess, getUsages, startDeploy, stopDeploy } from '../../store/actions/app.action';
import { User, View, Project, Deploy, AppStateInit, Instance, Usage } from '../../store/interfaces/app.interface';
import { selectUser, selectView, selectMainProject, selectDeploys, selectInstances, selectUsages } from '../../store/selectors/app.selector';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-deploy-view',
  standalone: true,
  imports: [NgIf, NgClass, NgFor],
  templateUrl: './deploy-view.component.html',
  styleUrl: './deploy-view.component.scss'
})
export class DeployViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  usages: Usage[] | null = null;
  usage: Usage | null = null;
  deploys: Deploy[] | null = null;
  deploy: Deploy | null = null;
  instance: Instance | null = null;

  sub: Subscription | null = null;
  deployStartSuccessSub: Subscription | null = null;
  deployStartErrorSub: Subscription | null = null;
  deployStopSuccessSub: Subscription | null = null;
  deployStopErrorSub: Subscription | null = null;
  deployStatusSuccessSub: Subscription | null = null;
  deployStatusErrorSub: Subscription | null = null;

  loadingStart: boolean = false;
  loadingStop: boolean = false;

  size: string = 'standard';
  status: string = '';

  deploymentDropdown: boolean = false;
  sizeDropdown: boolean = false;

  constructor(
    private store: Store<AppStateInit>,
    private actions$: Actions,
    public socketService: SocketService,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initDeployStartSuccess();
    this.initDeployStartError();
    this.initDeployStopSuccess();
    this.initDeployStopError();
    this.initDeployStatusSuccess();
    this.initDeployStatusError();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.deployStartSuccessSub?.unsubscribe();
    this.deployStartErrorSub?.unsubscribe();
    this.deployStopSuccessSub?.unsubscribe();
    this.deployStopErrorSub?.unsubscribe();
    this.deployStatusSuccessSub?.unsubscribe();
    this.deployStatusErrorSub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectDeploys),
      this.store.select(selectInstances),
      this.store.select(selectUsages),
    ]).subscribe(([user, view, project, deploys, instances, usages]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (deploys && deploys.length) {
        const sorted = [...deploys].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

        this.deploys = sorted;

        if (!this.deploy) {
          this.deploy = sorted[0];
        }

        this.store.dispatch(getDeployStatus({ projectId: this.project!._id, deployId: this.deploy._id }));
      } else {
        this.deploys = null;
        this.deploy = null;
      }

      if (usages && usages.length) {
        this.usages = usages;
        
        if (this.deploy) {
          const usage = [...usages].filter((usage) => usage.deployId === this.deploy!._id);
          this.usage = usage[0];
        } else {
          this.usage = null;
        }
      }
      else this.usages = null;

      if (instances && instances.length) this.instance = instances[0];
      else this.instance = null;
    });
  }

  initDeployStartSuccess() {
    this.deployStartSuccessSub = this.actions$.pipe((ofType(deployStartSuccess))).subscribe(() => {
      this.loadingStart = false;

      if (!this.project) return;
      this.store.dispatch(getUsages({ projectId: this.project._id }));
    });
  }

  initDeployStartError() {
    this.deployStartErrorSub = this.actions$.pipe((ofType(deployStartError))).subscribe(() => {
      this.loadingStart = false;
    });
  }

  initDeployStopSuccess() {
    this.deployStopSuccessSub = this.actions$.pipe((ofType(deployStopSuccess))).subscribe(() => {
      this.loadingStop = false;

      if (!this.project) return;
      this.store.dispatch(getUsages({ projectId: this.project._id }));
      this.socketService.socket = null;
    });
  }

  initDeployStopError() {
    this.deployStopErrorSub = this.actions$.pipe((ofType(deployStopError))).subscribe(() => {
      this.loadingStop = false;
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

  startDeploy() {
    if (!this.user) return;
    if (!this.project) return;
    if (!this.instance) return;
    if (!this.size) return;
    if (this.size !== 'standard') return;

    const _id = '';
    const userId = this.user._id;
    const projectId = this.project._id;
    const instanceId = this.instance._id;
    const date = new Date().toISOString();
    const active = true;
    const type = 'standard';
    const ec2Id = '';
    const ipAddress = '';
    const running = true;
    const start = new Date().toISOString();
    const stop = new Date().toISOString();

    this.loadingStart = true;
    this.store.dispatch(startDeploy({ projectId: this.project._id, deploy: { _id, userId, projectId, instanceId, ec2Id, ipAddress, date, active, type, running, start, stop }}));
  }

  stopDeploy() {
    if (!this.project) return;
    if (!this.deploy) return;

    this.loadingStop = true;
    this.store.dispatch(stopDeploy({ projectId: this.project._id, deployId: this.deploy._id }));
  }

  toggleDeploymentDropdown() {
    if (this.sizeDropdown) this.sizeDropdown = false;
    this.deploymentDropdown = !this.deploymentDropdown;
  }
  
  toggleSizeDropdown() {
    if (this.deploymentDropdown) this.deploymentDropdown = false;
    this.sizeDropdown = !this.sizeDropdown;
  }

  selectDeployment(deploy?: Deploy) {
    if (!this.project) return;

    if (!deploy) {
      this.deploy = null;
      this.toggleDeploymentDropdown();
      return;
    }

    this.deploy = deploy;
    this.toggleDeploymentDropdown();
    this.store.dispatch(getDeployStatus({ projectId: this.project._id, deployId: this.deploy._id }));
    this.store.dispatch(getUsages({ projectId: this.project._id }));
  }

  selectSize(size: string) {
    this.size = size;
    this.toggleSizeDropdown();
  }

  convertToSize(size: string) {
    if (size === 'standard') return 'Standard';
    return '';
  }

  readableTime(datetime: string) {
    const dateObj = new Date(datetime);
    const date = dateObj.toLocaleDateString();
    const time = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(dateObj);
    return `${date} ${time}`;
  }

  runningTime() {
    if (!this.deploy) return '';

    let startDate = new Date();
    let endDate = new Date();

    if (this.deploy.start === this.deploy.stop) {
      startDate = new Date(this.deploy.start);
      endDate = new Date();
    } else {
      startDate = new Date(this.deploy.start);
      endDate = new Date(this.deploy.stop);
    }

    const diffInMs: number = endDate.getTime() - startDate.getTime();

    const hours: number = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes: number = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((diffInMs % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}

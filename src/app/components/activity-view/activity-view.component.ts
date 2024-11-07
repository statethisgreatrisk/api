import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { SocketService } from '../../services/socket.service';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { User, View, AppStateInit, Instance, Project, Deploy, Job } from '../../store/interfaces/app.interface';
import { selectDeploys, selectInstances, selectJobs, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { getDeploys, getDeployStatus, getDeployStatusError, getDeployStatusSuccess, getInstances } from '../../store/actions/app.action';
import { Actions, ofType } from '@ngrx/effects';
import { each } from 'lodash';

interface JobRow {
  jobId: string;
  start: string;
  stop: string;
  duration: string;
  success: string;
  activity: string;
  errorMessage: string;
}

@Component({
  selector: 'app-activity-view',
  standalone: true,
  imports: [NgClass, NgIf, NgFor],
  templateUrl: './activity-view.component.html',
  styleUrl: './activity-view.component.scss'
})
export class ActivityViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  instance: Instance | null = null;
  deploy: Deploy | null = null;
  jobs: JobRow[] | null = null;

  sub: Subscription | null = null;
  deployStatusSuccessSub: Subscription | null = null;
  deployStatusErrorSub: Subscription | null = null;

  status: string = '';

  tab = 'api';

  selectedRowId = '';

  constructor(
    private store: Store<AppStateInit>,
    private actions$: Actions,
    private infoService: InfoService,
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

  selectTab(tab: string) {
    this.tab = tab;
  }

  showData(activity: JobRow['activity']) {
    const data = JSON.parse(activity);
    this.infoService.initInfo({ data: data });
  }

  showError(errorMessage: JobRow['errorMessage']) {
    const error = JSON.parse(errorMessage);
    this.infoService.initInfo({ data: error });
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectInstances),
      this.store.select(selectDeploys),
      this.store.select(selectJobs),
    ]).subscribe(([user, view, project, instances, deploys, jobs]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.project && this.view.windowId) {
        if (!instances.length) {
          this.instance = null;
          this.store.dispatch(getInstances({ projectId: this.project._id }));
          this.store.dispatch(getDeploys({ projectId: this.project._id }));
        } else {
          this.instance = instances[0];
        }

        if (!deploys.length) {
          this.deploy = null;
        } else {
          const sorted = [...deploys].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
          this.deploy = sorted[0];
          
          this.store.dispatch(getDeployStatus({ projectId: this.project._id, deployId: this.deploy._id }));
        }

        if (!jobs.length) {
          this.jobs = null;
        } else {
          this.parseJobs(jobs);
        }
      }
    });
  }

  initDeployStatusSuccess() {
    this.deployStatusSuccessSub = this.actions$.pipe((ofType(getDeployStatusSuccess))).subscribe(({ status }) => {
      console.log('status', status)
      this.status = status.status;
    });
  }

  initDeployStatusError() {
    this.deployStatusErrorSub = this.actions$.pipe((ofType(getDeployStatusError))).subscribe(() => {
      console.log('status error')
      this.status = 'error';
    });
  }

  parseJobs(jobs: Job[]) {
    this.jobs = [];
    const jobIds: string[] = [];

    each(jobs, (job) => {
      if (!jobIds.includes(job._id)) jobIds.push(job._id);
    });

    each(jobIds, (jobId) => {
      const startJob = jobs.find((job) => job._id === jobId && job.type === 'start');
      const stopJob = jobs.find((job) => job._id === jobId && job.type === 'stop');

      if (!startJob && !stopJob) return;

      if (startJob && !stopJob) {
        this.jobs!.push({
          jobId: startJob._id.slice(-6),
          start: startJob.date,
          stop: '',
          duration: '',
          success: 'Pending',
          activity: startJob.activity,
          errorMessage: '',
        });
      }

      if (startJob && stopJob) {
        this.jobs!.push({
          jobId: startJob._id.slice(-6),
          start: startJob.date,
          stop: stopJob.date,
          duration: '',
          success: 'Pending',
          activity: startJob.activity,
          errorMessage: stopJob.errorMessage,
        });
      }
    });
  }
}

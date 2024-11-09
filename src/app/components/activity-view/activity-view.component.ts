import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { SocketService } from '../../services/socket.service';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { User, View, AppStateInit, Instance, Project, Deploy, Job } from '../../store/interfaces/app.interface';
import { selectDeploys, selectInstances, selectJobs, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { getDeployStatus, getDeployStatusError, getDeployStatusSuccess, getJobs } from '../../store/actions/app.action';
import { Actions, ofType } from '@ngrx/effects';
import { each } from 'lodash';
import { ActivityViewService } from '../../services/activity-view.service';
import { CapitalizePipe } from '../../services/capitalize.pipe';

interface JobRow {
  jobId: string;
  startDate: string;
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
  imports: [NgClass, NgIf, NgFor, CapitalizePipe],
  templateUrl: './activity-view.component.html',
  styleUrl: './activity-view.component.scss'
})
export class ActivityViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  instance: Instance | null = null;
  deploys: Deploy[] | null = null;
  deploy: Deploy | null = null;
  jobs: JobRow[] | null = null;

  sub: Subscription | null = null;
  deployStatusSuccessSub: Subscription | null = null;
  deployStatusErrorSub: Subscription | null = null;

  status: string = 'stopped';

  tab = 'api';

  selectedRowId = '';

  deployDropdown = false;

  constructor(
    private store: Store<AppStateInit>,
    private actions$: Actions,
    private infoService: InfoService,
    private activityViewService: ActivityViewService,
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
      this.activityViewService.selectedDeployment$,
    ]).subscribe(([user, view, project, instances, deploys, jobs, selectedDeployment]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.project && this.view.windowId) {
        if (!instances.length) {
          this.instance = null;
        } else {
          this.instance = instances[0];
        }

        if (!deploys.length) {
          this.deploys = null;
          this.deploy = null;
        } else {
          const sorted = [...deploys].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
          this.deploys = sorted;
          if (selectedDeployment) {
            this.deploy = selectedDeployment;
            this.store.dispatch(getDeployStatus({ projectId: this.project._id, deployId: this.deploy._id }));
          }
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
      this.status = status.status;
    });
  }

  initDeployStatusError() {
    this.deployStatusErrorSub = this.actions$.pipe((ofType(getDeployStatusError))).subscribe(() => {
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
        const startDateObj = new Date(startJob.date);
        const startDate = startDateObj.toLocaleDateString();
        const startTime = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(startDateObj);
        
        this.jobs!.push({
          jobId: startJob._id.slice(-6),
          startDate: startJob.date,
          start: `${startDate} ${startTime}`,
          stop: '',
          duration: '',
          success: 'Pending',
          activity: startJob.activity,
          errorMessage: '',
        });
      }

      if (startJob && stopJob) {
        const startDateObj = new Date(startJob.date);
        const startDate = startDateObj.toLocaleDateString();
        const startTime = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(startDateObj);

        const stopDateObj = new Date(stopJob.date);
        const stopDate = stopDateObj.toLocaleDateString();
        const stopTime = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(stopDateObj);

        const diffInMs: number = stopDateObj.getTime() - startDateObj.getTime();
        const hours: number = Math.floor(diffInMs / (1000 * 60 * 60));
        const minutes: number = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds: number = Math.floor((diffInMs % (1000 * 60)) / 1000);

        this.jobs!.push({
          jobId: startJob._id.slice(-6),
          startDate: startJob.date,
          start: `${startDate} ${startTime}`,
          stop: `${stopDate} ${stopTime}`,
          duration: `${hours}h ${minutes}m ${seconds}s`,
          success: 'Pending',
          activity: startJob.activity,
          errorMessage: stopJob.errorMessage,
        });
      }
    });

    this.jobs = this.jobs.sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  }

  toggleDeployDropdown() {
    this.deployDropdown = !this.deployDropdown;
  }

  selectDeploy(deploy: Deploy) {
    this.activityViewService.setDeployment(deploy);
    this.toggleDeployDropdown();
  }

  connectToSocket() {
    if (!this.instance) return;
    if (!this.project) return;

    this.socketService.init(this.instance.name);
    this.store.dispatch(getJobs({ projectId: this.project._id }));
  }
}

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
import { chunk, each } from 'lodash';
import { ActivityViewService } from '../../services/activity-view.service';
import { CapitalizePipe } from '../../services/capitalize.pipe';
import { FormsModule } from '@angular/forms';

interface JobRow {
  jobId: string;
  startDate: string;
  start: string;
  stop: string;
  duration: string;
  success: string;
  activity: string;
}

@Component({
  selector: 'app-activity-view',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, CapitalizePipe, FormsModule],
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
  statusInitialLoad = false;

  tab = 'api';

  selectedRowId = '';

  deployDropdown = false;

  pageNumber = 1;
  perPage = 10;

  searchQuery = '';

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
    if (!activity) return;
    const data = JSON.parse(activity);
    this.infoService.initInfo({ data: data });
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
          if (selectedDeployment) this.deploy = selectedDeployment;
          if (this.deploy && !this.statusInitialLoad) {
            this.store.dispatch(getDeployStatus({ projectId: this.project._id, deployId: this.deploy._id }));
            this.statusInitialLoad = true;
          }
        }

        if (!jobs.length) {
          this.jobs = null;
        } else {
          this.parseJobs(jobs, this.deploy?._id);
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

  parseJobs(allJobs: Job[], deployId?: string) {
    this.jobs = [];

    if (!allJobs.length || !deployId) return;

    const jobs = allJobs.filter((job) => job.deployId === deployId);
    const jobIds: string[] = [];

    each(jobs, (job) => {
      if (!jobIds.includes(job.jobId)) jobIds.push(job.jobId);
    });

    each(jobIds, (jobId) => {
      const startJob = jobs.find((job) => job.jobId === jobId && job.type === 'start');
      const stopJob = jobs.find((job) => job.jobId === jobId && job.type === 'stop');

      if (!startJob && !stopJob) return;

      if (startJob && !stopJob) {
        const startDateObj = new Date(startJob.date);
        const startDate = startDateObj.toLocaleDateString();
        const startTime = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", second: "numeric", fractionalSecondDigits: 3, hour12: true }).format(startDateObj);
        
        this.jobs!.push({
          jobId: startJob.jobId.slice(-6),
          startDate: startJob.date,
          start: `${startDate} ${startTime}`,
          stop: '',
          duration: '',
          success: 'Pending',
          activity: startJob.activity,
        });
      }

      if (startJob && stopJob) {
        const startDateObj = new Date(startJob.date);
        const startDate = startDateObj.toLocaleDateString();
        const startTime = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", second: "numeric", fractionalSecondDigits: 3, hour12: true }).format(startDateObj);

        const stopDateObj = new Date(stopJob.date);
        const stopDate = stopDateObj.toLocaleDateString();
        const stopTime = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", second: "numeric", fractionalSecondDigits: 3, hour12: true }).format(stopDateObj);

        const diffInMs: number = stopDateObj.getTime() - startDateObj.getTime();
        const hours: number = Math.floor(diffInMs / (1000 * 60 * 60));
        const minutes: number = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds: number = Math.floor((diffInMs % (1000 * 60)) / 1000);
        const milliseconds: number = diffInMs % 1000;

        this.jobs!.push({
          jobId: startJob.jobId.slice(-6),
          startDate: startJob.date,
          start: `${startDate} ${startTime}`,
          stop: `${stopDate} ${stopTime}`,
          duration: `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`,
          success: stopJob.error ? 'Error' : 'Success',
          activity: startJob.activity,
        });
      }
    });

    this.jobs = this.jobs.sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  }

  get filteredJobs(): JobRow[] {
    if (!this.jobs) return [];
    if (!this.searchQuery) return this.jobs;

    return this.jobs.filter((job) => {
      return job.jobId.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  get paginatedJobs() {
    const paginatedItems = chunk(this.filteredJobs, this.perPage);
    const pageData = paginatedItems[this.pageNumber - 1] || [];

    return pageData;
  }

  hasNextPage() {
    const paginatedItems = chunk(this.filteredJobs, this.perPage);
    const totalPages = paginatedItems.length;

    return this.pageNumber < totalPages;
  }

  hasPreviousPage() {
    return this.pageNumber > 1;
  }

  nextPage() {
    if (!this.hasNextPage()) return;
    this.pageNumber++;
  }

  previousPage() {
    if (!this.hasPreviousPage()) return;
    this.pageNumber--;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  toggleDeployDropdown() {
    this.deployDropdown = !this.deployDropdown;
  }

  selectDeploy(deploy: Deploy) {
    if (!this.project) return;

    this.activityViewService.setDeployment(deploy);
    this.toggleDeployDropdown();

    this.store.dispatch(getDeployStatus({ projectId: this.project._id, deployId: deploy._id }));
    this.store.dispatch(getJobs({ projectId: this.project._id }));
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
    this.store.dispatch(getJobs({ projectId: this.project._id }));
  }
}

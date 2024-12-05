import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Code, Project, Scheduler, User, View } from '../../store/interfaces/app.interface';
import { selectCodes, selectMainProject, selectSchedulers, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { deleteScheduler, deselectService, updateScheduler } from '../../store/actions/app.action';
import { CronTime } from 'cron-time-generator';
import cronstrue from 'cronstrue';
import timezones from 'timezones-list';
import { times } from 'lodash';

@Component({
  selector: 'app-edit-scheduler',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './edit-scheduler.component.html',
  styleUrl: './edit-scheduler.component.scss'
})
export class EditSchedulerComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  scheduler: Scheduler | null = null;
  codes: Code[] | null = null;

  sub: Subscription | null = null;

  times = times;

  cronTypeDropdown = false;
  cronHourDropdown = false;
  cronMinuteDropdown = false;
  cronTimezoneDropdown = false;
  codeDropdown = false;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
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
      this.store.select(selectSchedulers),
      this.store.select(selectCodes),
    ]).subscribe(([user, view, project, schedulers, codes]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.codes = codes;

      if (this.user && this.view && this.view.serviceId) {
        const scheduler = schedulers.find((existingScheduler) => existingScheduler._id === this.view.serviceId);
        this.scheduler = scheduler ? { ...scheduler } : null;
        
        if (this.scheduler) this.setCron();
      }
    });
  }

  toggleCronTypeDropdown() {
    if (this.cronHourDropdown) this.cronHourDropdown = false;
    if (this.cronMinuteDropdown) this.cronMinuteDropdown = false;
    if (this.cronTimezoneDropdown) this.cronTimezoneDropdown = false;
    this.cronTypeDropdown = !this.cronTypeDropdown;
  }

  toggleCronHourDropdown() {
    if (this.cronTypeDropdown) this.cronTypeDropdown = false;
    if (this.cronMinuteDropdown) this.cronMinuteDropdown = false;
    if (this.cronTimezoneDropdown) this.cronTimezoneDropdown = false;
    this.cronHourDropdown = !this.cronHourDropdown;
  }

  toggleCronMinuteDropdown() {
    if (this.cronTypeDropdown) this.cronTypeDropdown = false;
    if (this.cronHourDropdown) this.cronHourDropdown = false;
    if (this.cronTimezoneDropdown) this.cronTimezoneDropdown = false;
    this.cronMinuteDropdown = !this.cronMinuteDropdown;
  }

  toggleCronTimezoneDropdown() {
    if (this.cronTypeDropdown) this.cronTypeDropdown = false;
    if (this.cronHourDropdown) this.cronHourDropdown = false;
    if (this.cronMinuteDropdown) this.cronMinuteDropdown = false;
    this.cronTimezoneDropdown = !this.cronTimezoneDropdown;
  }

  selectCronType(cronType: string) {
    if (!this.scheduler) return;
    
    this.scheduler.cronType = cronType;
    this.toggleCronTypeDropdown();
    this.setCron();
  }

  selectCronHour(cronHour: number) {
    if (!this.scheduler) return;

    this.scheduler.cronHour = cronHour;
    this.toggleCronHourDropdown();
    this.setCron();
  }

  selectCronMinute(cronMinute: number) {
    if (!this.scheduler) return;

    this.scheduler.cronMinute = cronMinute;
    this.toggleCronMinuteDropdown();
    this.setCron();
  }

  selectCronTimezone(cronTimezone: string) {
    if (!this.scheduler) return;

    this.scheduler.cronTimezone = cronTimezone;
    this.toggleCronTimezoneDropdown();
    this.setCron();
  }

  setCron() {
    if (!this.scheduler) return;

    if (this.scheduler.cronType === 'none') {
      this.scheduler.cron = '';
    } else if (this.scheduler.cronType === 'everyMinute') {
      this.scheduler.cron = CronTime.everyMinute();
    } else if (this.scheduler.cronType === 'everyHour') {
      this.scheduler.cron = CronTime.everyHour();
    } else if (this.scheduler.cronType === 'everyDayAt') {
      this.scheduler.cron = CronTime.everyDayAt(this.scheduler.cronHour, this.scheduler.cronMinute);
    } else if (this.scheduler.cronType === 'everySundayAt') {
      this.scheduler.cron = CronTime.everySundayAt(this.scheduler.cronHour, this.scheduler.cronMinute);
    } else if (this.scheduler.cronType === 'everyMondayAt') {
      this.scheduler.cron = CronTime.everyMondayAt(this.scheduler.cronHour, this.scheduler.cronMinute);
    } else if (this.scheduler.cronType === 'everyTuesdayAt') {
      this.scheduler.cron = CronTime.everyTuesdayAt(this.scheduler.cronHour, this.scheduler.cronMinute);
    } else if (this.scheduler.cronType === 'everyWednesdayAt') {
      this.scheduler.cron = CronTime.everyWednesdayAt(this.scheduler.cronHour, this.scheduler.cronMinute);
    } else if (this.scheduler.cronType === 'everyThursdayAt') {
      this.scheduler.cron = CronTime.everyThursdayAt(this.scheduler.cronHour, this.scheduler.cronMinute);
    } else if (this.scheduler.cronType === 'everyFridayAt') {
      this.scheduler.cron = CronTime.everyFridayAt(this.scheduler.cronHour, this.scheduler.cronMinute);
    } else if (this.scheduler.cronType === 'everySaturdayAt') {
      this.scheduler.cron = CronTime.everySaturdayAt(this.scheduler.cronHour, this.scheduler.cronMinute);
    } else if (this.scheduler.cronType === 'everyWeekDayAt') {
      this.scheduler.cron = CronTime.everyWeekDayAt(this.scheduler.cronHour, this.scheduler.cronMinute);
    } else if (this.scheduler.cronType === 'everyWeekendAt') {
      this.scheduler.cron = CronTime.everyWeekendAt(this.scheduler.cronHour, this.scheduler.cronMinute);
    }
  }

  get readCron() {
    if (!this.scheduler) return '';

    if (this.scheduler.cronType === 'none') {
      return ''
    } else {
      return cronstrue.toString(this.scheduler.cron, {
        throwExceptionOnParseError: false,
        use24HourTimeFormat: true,
      });
    }
  }

  get alphaTimezones() {
    return timezones.filter(timezone => timezone.label.startsWith('America/')).map(timezone => timezone.label.split(' ')[0]).sort();
  }

  toggleCodeDropdown() {
    this.codeDropdown = !this.codeDropdown;
  }

  selectCode(codeId: string) {
    if (!codeId || !this.scheduler) return;

    this.scheduler.codeId = codeId;
  }

  removeCode() {
    if (!this.scheduler) return;
    this.scheduler.codeId = '';
  }

  findCode(codeId: string) {
    if (!codeId || !this.scheduler) return;
    if (!this.codes) return;

    const code = this.codes.find((code) => code._id === codeId);

    if (!code) return '';
    return code.name;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.scheduler) return;

    this.store.dispatch(updateScheduler({ projectId: this.project._id, scheduler: this.scheduler }));
  }

  delete() {
    if (!this.project) return;
    if (!this.scheduler) return;

    const scheduler = this.scheduler;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: scheduler,
      deleteFn: () => {
        this.store.dispatch(deleteScheduler({ projectId: this.project!._id, schedulerId: scheduler._id }));
        this.cancel();
      },
    });
  }
}

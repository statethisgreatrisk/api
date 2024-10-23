import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Project, Scheduler, User, View } from '../../store/interfaces/app.interface';
import { selectMainProject, selectSchedulers, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { deleteScheduler, deselectService, updateScheduler } from '../../store/actions/app.action';

@Component({
  selector: 'app-edit-scheduler',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-scheduler.component.html',
  styleUrl: './edit-scheduler.component.scss'
})
export class EditSchedulerComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  scheduler: Scheduler | null = null;

  sub: Subscription | null = null;

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
    ]).subscribe(([user, view, project, schedulers]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const scheduler = schedulers.find((existingScheduler) => existingScheduler._id === this.view.serviceId);
        this.scheduler = scheduler ? { ...scheduler } : null;
      }
    });
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

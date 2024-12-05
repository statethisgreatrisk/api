import { Component } from '@angular/core';
import { AppStateInit, Code, Project, Queue, User, View } from '../../store/interfaces/app.interface';
import { selectCodes, selectMainProject, selectQueues, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { deleteQueue, deselectService, updateQueue } from '../../store/actions/app.action';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-queue',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './edit-queue.component.html',
  styleUrl: './edit-queue.component.scss'
})
export class EditQueueComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  queue: Queue | null = null;
  codes: Code[] | null = null;

  sub: Subscription | null = null;

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
      this.store.select(selectQueues),
      this.store.select(selectCodes),
    ]).subscribe(([user, view, project, queues, codes]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.codes = codes;

      if (this.user && this.view && this.view.serviceId) {
        const queue = queues.find((existingQueue) => existingQueue._id === this.view.serviceId);
        this.queue = queue ? { ...queue } : null;
      }
    });
  }

  toggleCodeDropdown() {
    this.codeDropdown = !this.codeDropdown;
  }

  selectCode(codeId: string) {
    if (!codeId || !this.queue) return;

    this.queue.codeId = codeId;
  }

  removeCode() {
    if (!this.queue) return;
    this.queue.codeId = '';
  }

  findCode(codeId: string) {
    if (!codeId || !this.queue) return;
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
    if (!this.queue) return;

    this.store.dispatch(updateQueue({ projectId: this.project._id, queue: this.queue }));
  }

  delete() {
    if (!this.project) return;
    if (!this.queue) return;

    const queue = this.queue;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: queue,
      deleteFn: () => {
        this.store.dispatch(deleteQueue({ projectId: this.project!._id, queueId: queue._id }));
        this.cancel();
      },
    });
  }
}

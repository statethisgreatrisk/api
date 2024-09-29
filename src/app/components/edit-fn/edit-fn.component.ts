import { Component } from '@angular/core';
import { selectFns, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { deleteFn, deselectService, updateFn } from '../../store/actions/app.action';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { User, View, Project, Fn, AppStateInit } from '../../store/interfaces/app.interface';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-fn',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-fn.component.html',
  styleUrl: './edit-fn.component.scss'
})
export class EditFnComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  fn: Fn | null = null;

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
      this.store.select(selectFns),
    ]).subscribe(([user, view, project, fns]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const fn = fns.find((existingFn) => existingFn._id === this.view.serviceId);
        this.fn = fn ? { ...fn } : null;
      }
    });
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.fn) return;
    this.store.dispatch(updateFn({ projectId: this.project._id, fn: this.fn }));
  }

  delete() {
    if (!this.project) return;
    if (!this.fn) return;

    const fn = this.fn;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: fn,
      deleteFn: () => {
        this.store.dispatch(deleteFn({ projectId: this.project!._id, fnId: fn._id }));
        this.cancel();
      },
    });
  }
}

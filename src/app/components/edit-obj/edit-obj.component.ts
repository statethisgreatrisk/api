import { Component } from '@angular/core';
import { selectObjs, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { deleteObj, deselectService, updateObj } from '../../store/actions/app.action';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { User, View, Project, Obj, AppStateInit } from '../../store/interfaces/app.interface';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-obj',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-obj.component.html',
  styleUrl: './edit-obj.component.scss'
})
export class EditObjComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  obj: Obj | null = null;

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
      this.store.select(selectObjs),
    ]).subscribe(([user, view, project, objs]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const obj = objs.find((existingObj) => existingObj._id === this.view.serviceId);
        this.obj = obj ? { ...obj } : null;
      }
    });
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.obj) return;
    this.store.dispatch(updateObj({ projectId: this.project._id, obj: this.obj }));
  }

  delete() {
    console.log(this.project)
    console.log(this.obj)
    if (!this.project) return;
    if (!this.obj) return;

    const obj = this.obj;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: obj,
      deleteFn: () => {
        this.store.dispatch(deleteObj({ projectId: this.project!._id, objId: obj._id }));
        this.cancel();
      },
    });
  }
}

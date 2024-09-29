import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Project, Schema, User, View } from '../../store/interfaces/app.interface';
import { selectMainProject, selectSchemas, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { deleteSchema, deselectService, updateSchema } from '../../store/actions/app.action';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-edit-schema',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './edit-schema.component.html',
  styleUrl: './edit-schema.component.scss'
})
export class EditSchemaComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  schema: Schema | null = null;
  project: Project | null = null;

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
      this.store.select(selectSchemas),
    ]).subscribe(([user, view, project, schemas]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const schema = schemas.find((existingSchema) => existingSchema._id === this.view.serviceId);
        this.schema = schema ? { ...schema } : null;
      }
    });
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.schema) return;

    let schema = { ...this.schema };
    // parse code

    this.store.dispatch(updateSchema({ projectId: this.project._id, schema: schema }));
  }

  delete() {
    if (!this.project) return;
    if (!this.schema) return;

    const schema = { ...this.schema};

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: schema,
      deleteFn: () => {
        this.store.dispatch(deleteSchema({ projectId: this.project!._id, schemaId: schema._id }));
        this.cancel();
      },
    });
  }
}

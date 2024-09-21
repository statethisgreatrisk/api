import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Schema, User, View } from '../../store/interfaces/app.interface';
import { selectSchemas, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { deleteSchema, deselectService, updateSchema } from '../../store/actions/app.action';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-edit-schema',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-schema.component.html',
  styleUrl: './edit-schema.component.scss'
})
export class EditSchemaComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  schema: Schema | null = null;

  sub: Subscription | null = null;

  prefixDropdown = false;

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
      this.store.select(selectSchemas),
    ]).subscribe(([user, view, schemas]) => {
      this.user = user;
      this.view = view;

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
    if (!this.schema) return;
    this.store.dispatch(updateSchema({ schema: this.schema }));
  }

  delete() {
    if (!this.schema) return;

    const schema = this.schema;

    this.deleteService.initDelete({
      service: this.view.service,
      serviceData: schema,
      deleteFn: () => {
        this.store.dispatch(deleteSchema({ userId: schema.userId, schemaId: schema._id }));
        this.cancel();
      },
    });
  }

  togglePrefixDropdown() {
    this.prefixDropdown = !this.prefixDropdown;
  }
}

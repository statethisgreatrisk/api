import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit, User, View, Storage, Schema } from '../../store/interfaces/app.interface';
import { deleteStorage, deselectService, selectWindow, updateStorage } from '../../store/actions/app.action';
import { combineLatest, Subscription } from 'rxjs';
import { selectUser, selectView, selectStorages, selectSchemas } from '../../store/selectors/app.selector';
import { FormsModule } from '@angular/forms';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-edit-storage',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule],
  templateUrl: './edit-storage.component.html',
  styleUrl: './edit-storage.component.scss'
})
export class EditStorageComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  storage: Storage | null = null;

  sub: Subscription | null = null;

  schemas: Schema[] = [];

  dropdown = false;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initSchemas();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectStorages),
    ]).subscribe(([user, view, storages]) => {
      this.user = user;
      this.view = view;

      if (this.user && this.view && this.view.serviceId) {
        const storage = storages.find((existingStorage) => existingStorage._id === this.view.serviceId);
        this.storage = storage ? { ...storage } : null;
      }
    });
  }

  initSchemas() {
    this.store.select(selectSchemas).subscribe((schemas) => {
      this.schemas = schemas;
    });
  }

  selectSchema(schemaId: string) {
    if (!schemaId || !this.storage) return;

    if (this.storage.schemaId === schemaId) return;
    this.storage.schemaId = schemaId;
  }

  removeSchema() {
    if (!this.storage) return;
    this.storage.schemaId = '';
  }

  findSchema(schemaId: string) {
    if (!schemaId || !this.storage) return;

    const schema = this.schemas.find((schema) => schema._id === schemaId);

    if (!schema) return '';
    return schema.name;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.storage) return;
    this.store.dispatch(updateStorage({ storage: this.storage }));
  }

  delete() {
    if (!this.storage) return;

    const storage = this.storage;

    this.deleteService.initDelete({
      service: this.view.service,
      serviceData: storage,
      deleteFn: () => {
        this.store.dispatch(deleteStorage({ userId: storage.userId, storageId: storage._id }));
        this.cancel();
      },
    });
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  openView() {
    if (!this.storage) return;

    this.store.dispatch(selectWindow({ windowName: 'Storage', windowId: this.storage._id }));
  }
}

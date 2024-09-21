import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit, User, View, Storage } from '../../store/interfaces/app.interface';
import { deleteStorage, deselectService, selectWindow, updateStorage } from '../../store/actions/app.action';
import { combineLatest, Subscription } from 'rxjs';
import { selectUser, selectView, selectStorages } from '../../store/selectors/app.selector';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-storage',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule],
  templateUrl: './edit-storage.component.html',
  styleUrl: './edit-storage.component.scss'
})
export class EditStorageComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  storage: Storage | null = null;

  sub: Subscription | null = null;

  dropdown = false;

  constructor(
    private store: Store<AppStateInit>,
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

  selectSchemaId(schemaId: string) {
    if (!this.storage) return;
    this.storage.schemaId = schemaId;
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

    if (window.confirm('Are you sure you want to delete this Storage?')) {
      this.store.dispatch(deleteStorage({ userId: this.storage.userId, storageId: this.storage._id }));
      this.cancel();
    }
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  openView() {
    this.store.dispatch(selectWindow({ windowName: 'Storage', windowId: '1' }));
  }
}

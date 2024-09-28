import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { selectKeys, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { AppStateInit, Key, Project, User, View } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { createKey, deleteKey } from '../../store/actions/app.action';
import { FormsModule } from '@angular/forms';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-key-view',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './key-view.component.html',
  styleUrl: './key-view.component.scss'
})
export class KeyViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  keys: Key[] | null = null;

  sub: Subscription | null = null;

  name: string = '';

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
      this.store.select(selectKeys),
    ]).subscribe(([user, view, project, keys]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.keys = keys;
    });
  }

  createKey() {
    if (!this.name) return;
    if (!this.user) return;
    if (!this.project) return;

    const _id = '';
    const userId = this.user._id;
    const projectId = this.project._id;
    const date = new Date().toISOString();
    const active = true;
    const name = this.name;

    this.store.dispatch(createKey({ projectId: this.project._id, key: { _id, userId, projectId, date, active, name, apiKey: '', apiHash: ''  }}))
  }

  deleteKey(keyId: string) {
    if (!keyId) return;
    if (!this.project) return;

    const project = this.project;

    this.deleteService.initDelete({
      service: this.view.service,
      serviceData: project,
      deleteFn: () => {
        this.store.dispatch(deleteKey({ projectId: project._id, keyId }));
      },
    });
  }
}
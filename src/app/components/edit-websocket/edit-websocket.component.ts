import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Project, User, View, Websocket } from '../../store/interfaces/app.interface';
import { selectMainProject, selectUser, selectView, selectWebsockets } from '../../store/selectors/app.selector';
import { deleteWebsocket, deselectService, updateWebsocket } from '../../store/actions/app.action';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-edit-websocket',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-websocket.component.html',
  styleUrl: './edit-websocket.component.scss'
})
export class EditWebsocketComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  websocket: Websocket | null = null;

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
      this.store.select(selectWebsockets),
    ]).subscribe(([user, view, project, websockets]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const websocket = websockets.find((existingWebsocket) => existingWebsocket._id === this.view.serviceId);
        this.websocket = websocket ? { ...websocket } : null;
      }
    });
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.websocket) return;

    this.store.dispatch(updateWebsocket({ projectId: this.project._id, websocket: this.websocket }));
  }

  delete() {
    if (!this.project) return;
    if (!this.websocket) return;

    const websocket = this.websocket;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: websocket,
      deleteFn: () => {
        this.store.dispatch(deleteWebsocket({ projectId: this.project!._id, websocketId: websocket._id }));
        this.cancel();
      },
    });
  }
}

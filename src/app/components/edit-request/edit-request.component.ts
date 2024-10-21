import { Component } from '@angular/core';
import { AppStateInit, Project, Request, User, View } from '../../store/interfaces/app.interface';
import { selectMainProject, selectRequests, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { DeleteService } from '../../services/delete.service';
import { deselectService } from '../../store/actions/app.action';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-request',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-request.component.html',
  styleUrl: './edit-request.component.scss'
})
export class EditRequestComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  request: Request | null = null;

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
      this.store.select(selectRequests),
    ]).subscribe(([user, view, project, requests]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const request = requests.find((existingRequest) => existingRequest._id === this.view.serviceId);
        this.request = request ? { ...request } : null;
      }
    });
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }
}

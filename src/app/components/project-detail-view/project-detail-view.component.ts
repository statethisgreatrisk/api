import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { updateProject } from '../../store/actions/app.action';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { User, View, Project, AppStateInit } from '../../store/interfaces/app.interface';
import { selectUser, selectView, selectMainProject } from '../../store/selectors/app.selector';

@Component({
  selector: 'app-project-detail-view',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './project-detail-view.component.html',
  styleUrl: './project-detail-view.component.scss'
})
export class ProjectDetailViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;

  sub: Subscription | null = null;

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
      this.store.select(selectMainProject),
    ]).subscribe(([user, view, project]) => {
      this.user = user;
      this.view = view;

      if (project) this.project = { ...project };
    });
  }

  save() {
    if (!this.project) return;
    if (!this.project.name) return;
    this.store.dispatch(updateProject({ projectId: this.project._id, project: this.project }));
  }
}

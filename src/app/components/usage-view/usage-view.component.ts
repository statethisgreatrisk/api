import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { selectDeploys, selectMainProject, selectUsages, selectUser, selectView } from '../../store/selectors/app.selector';
import { AppStateInit, Deploy, Project, Usage, User, View } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-usage-view',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './usage-view.component.html',
  styleUrl: './usage-view.component.scss'
})
export class UsageViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  deploys: Deploy[] | null = null;
  deploy: Deploy | null = null;
  usages: Usage[] | null = null;

  sub: Subscription | null = null;

  dropdown: boolean = false;

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
      this.store.select(selectDeploys),
      this.store.select(selectUsages),
    ]).subscribe(([user, view, project, deploys, usages]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (deploys) {
        this.deploys = deploys;

        if (deploys.length) {
          const sorted = [...deploys].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
          this.deploy = sorted[0];
        } else {
          this.deploy = null;
        }
      }

      if (usages) {
        const sorted = [...usages].filter((usage) => usage.deployId === this.deploy!._id).sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
        this.usages = sorted;
      }
    });
  }

  selectDeploy(deployId: string) {
    this.toggleDropdown();
    if (!this.deploys) return;

    const deploy = this.deploys.find((deploy) => deploy._id === deployId);
    if (!deploy) return;

    this.deploy = deploy;

    if (!this.usages) return;

    const sorted = [...this.usages].filter((usage) => usage.deployId === this.deploy!._id).sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
    this.usages = sorted;
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }
}

import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { selectDeploys, selectMainProject, selectUsages, selectUser, selectView } from '../../store/selectors/app.selector';
import { AppStateInit, Deploy, Project, Usage, User, View } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-usage-view',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
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
  usage: Usage | null = null;

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

      if (deploys && deploys.length) {
        const sorted = [...deploys].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

        this.deploys = sorted;
        
        if (!this.deploy) {
          this.deploy = sorted[0];
        }
      } else {
        this.deploys = null;
        this.deploy = null;
      }

      if (usages) {
        this.usages = [...usages].sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));

        if (this.deploy) {
          const filtered = [...this.usages].filter((usage) => usage.deployId === this.deploy!._id);
          this.usage = filtered[0];
        }
      } else {
        this.usages = null;
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

    const filtered = [...this.usages].filter((usage) => usage.deployId === this.deploy!._id);
    this.usage = filtered[0];
  }

  runningTime() {
    if (!this.deploy) return '';

    let startDate = new Date();
    let endDate = new Date();

    if (this.deploy.start === this.deploy.stop) {
      startDate = new Date(this.deploy.start);
      endDate = new Date();
    } else {
      startDate = new Date(this.deploy.start);
      endDate = new Date(this.deploy.stop);
    }

    const diffInMs: number = endDate.getTime() - startDate.getTime();

    const hours: number = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes: number = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((diffInMs % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }
}

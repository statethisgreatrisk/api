import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { createDeploy, deployStartError, deployStartSuccess, deployStopError, deployStopSuccess, updateDeploy } from '../../store/actions/app.action';
import { User, View, Project, Deploy, AppStateInit } from '../../store/interfaces/app.interface';
import { selectUser, selectView, selectMainProject, selectDeploys } from '../../store/selectors/app.selector';

@Component({
  selector: 'app-deploy-view',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './deploy-view.component.html',
  styleUrl: './deploy-view.component.scss'
})
export class DeployViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  deploys: Deploy[] | null = null;
  deploy: Deploy | null = null;

  sub: Subscription | null = null;
  deployStartSuccessSub: Subscription | null = null;
  deployStartErrorSub: Subscription | null = null;
  deployStopSuccessSub: Subscription | null = null;
  deployStopErrorSub: Subscription | null = null;

  loadingStart: boolean = false;
  loadingStop: boolean = false;

  size: string = 'standard';

  dropdown: boolean = false;
  dropdown2: boolean = false;

  constructor(
    private store: Store<AppStateInit>,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initDeployStartSuccess();
    this.initDeployStartError();
    this.initDeployStopSuccess();
    this.initDeployStopError();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.deployStartSuccessSub?.unsubscribe();
    this.deployStartErrorSub?.unsubscribe();
    this.deployStopSuccessSub?.unsubscribe();
    this.deployStopErrorSub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectDeploys),
    ]).subscribe(([user, view, project, deploys]) => {
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
    });
  }

  initDeployStartSuccess() {
    this.deployStartSuccessSub = this.actions$.pipe((ofType(deployStartSuccess))).subscribe(() => {
      this.loadingStart = false;
    });
  }

  initDeployStartError() {
    this.deployStartErrorSub = this.actions$.pipe((ofType(deployStartError))).subscribe(() => {
      this.loadingStart = false;
    });
  }

  initDeployStopSuccess() {
    this.deployStopSuccessSub = this.actions$.pipe((ofType(deployStopSuccess))).subscribe(() => {
      this.loadingStop = false;
    });
  }

  initDeployStopError() {
    this.deployStopErrorSub = this.actions$.pipe((ofType(deployStopError))).subscribe(() => {
      this.loadingStop = false;
    });
  }

  startDeployment() {
    if (!this.user) return;
    if (!this.project) return;
    if (!this.size) return;
    if (this.size !== 'standard') return;

    const _id = '';
    const userId = this.user._id;
    const projectId = this.project._id;
    const instanceId = '';
    const date = new Date().toISOString();
    const active = true;
    const type = 'standard';
    const start = new Date().toISOString();
    const stop = new Date().toISOString();
    const status = 'starting';
    const received = 0;
    const transmitted = 0;

    this.loadingStart = true;
    this.store.dispatch(createDeploy({ projectId: this.project._id, deploy: { _id, userId, projectId, instanceId, date, active, type, start, stop, status, received, transmitted }}));
  }

  stopDeployment() {
    if (!this.project) return;
    if (!this.deploy) return;

    this.loadingStop = true;
    this.store.dispatch(updateDeploy({ projectId: this.project._id, deploy: { ...this.deploy, status: 'stopping' } }));
  }

  toggleDropdown() {
    if (this.dropdown2) this.dropdown2 = false;
    this.dropdown = !this.dropdown;
  }
  
  toggleDropdown2() {
    if (this.dropdown) this.dropdown = false;
    this.dropdown2 = !this.dropdown2;
  }

  selectSize(size: string) {
    this.size = size;
    this.toggleDropdown();
  }

  convertToSize(size: string) {
    if (size === 'standard') return 'Standard';
    return '';
  }
}

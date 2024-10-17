import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { App, AppStateInit } from '../../store/interfaces/app.interface';
import { selectApps } from '../../store/selectors/app.selector';
import { ApiDocsComponent } from '../../docs/api-docs/api-docs.component';
import { StorageDocsComponent } from '../../docs/storage-docs/storage-docs.component';
import { ObjectDocsComponent } from '../../docs/object-docs/object-docs.component';
import { WorkflowDocsComponent } from '../../docs/workflow-docs/workflow-docs.component';

@Component({
  selector: 'app-app-view',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ApiDocsComponent,
    StorageDocsComponent,
    ObjectDocsComponent,
    WorkflowDocsComponent,
  ],
  templateUrl: './app-view.component.html',
  styleUrl: './app-view.component.scss'
})
export class AppViewComponent {
  apps: App[] = [];
  appDocs: string = '';

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initApps();
  }

  initApps() {
    this.store.select(selectApps).subscribe((apps) => {
      const mutableApps = [...apps];
      this.apps = mutableApps.sort((a, b) => (a.name + a.method).localeCompare(b.name + b.method));
    });
  }

  selectInfo(appName: string) {
    this.appDocs = appName;
  }
}

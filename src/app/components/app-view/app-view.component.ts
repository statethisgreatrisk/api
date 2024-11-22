import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { App, AppStateInit } from '../../store/interfaces/app.interface';
import { selectApps } from '../../store/selectors/app.selector';
import { ApiDocsComponent } from '../../docs/api-docs/api-docs.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-view',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgStyle,
    FormsModule,
    ApiDocsComponent,
  ],
  templateUrl: './app-view.component.html',
  styleUrl: './app-view.component.scss'
})
export class AppViewComponent {
  @ViewChild(ApiDocsComponent) apiDocComponent!: ApiDocsComponent;

  apps: App[] = [];

  search = '';

  sidebar = true;

  sidebarWidth: string = '400px';

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initApps();
  }

  initApps() {
    this.store.select(selectApps).subscribe((apps) => {
      const mutableApps = [...apps];
      this.apps = mutableApps.filter((app) => !app.hidden).sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        if (a.method < b.method) return -1;
        if (a.method > b.method) return 1;
        return 0;
      });
    });
  }

  get filteredApps() {
    return this.apps.filter((app) => {
      if (!this.search) return true;

      const appName = `${app.name.toLowerCase()}.${app.method.toLowerCase()}`;
      return appName.includes(this.search.toLowerCase());
    });
  }

  scrollToApp(appName: string, appMethod: string) {
    this.apiDocComponent.scrollToApp(`${appName}${appMethod}`);
  }

  toggleSidebar() {
    this.sidebar = !this.sidebar;

    if (!this.sidebar) this.sidebarWidth = 'auto';
    else this.sidebarWidth = '400px';
  }
}

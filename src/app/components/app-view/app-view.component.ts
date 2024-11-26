import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { App, AppStateInit } from '../../store/interfaces/app.interface';
import { selectApps } from '../../store/selectors/app.selector';
import { ApiDocsComponent } from '../../docs/api-docs/api-docs.component';
import { FormsModule } from '@angular/forms';

interface Category {
  name: string;
  icon: string;
}

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
  category = '';

  categoryView = true;
  sidebarView = true;

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

  get categories() {
    const categories: Category[] = [];

    this.apps.forEach((app) => {
      const foundCategory = categories.find((category) => category.name === app.name);
      if (foundCategory) return;

      categories.push({ name: app.name, icon: `app-${app.name.toLowerCase()}` });
    });

    return categories.filter((category) => {
      if (!this.search) return true;
      return category.name.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  get filteredApps() {
    const categoryApps = this.apps.filter((app) => {
      return app.name === this.category;
    });

    return categoryApps.filter((app) => {
      if (!this.search) return true;

      const appName = `${app.name.toLowerCase()}.${app.method.toLowerCase()}`;
      return appName.includes(this.search.toLowerCase());
    });
  }

  scrollToApp(appName: string, appMethod: string) {
    this.apiDocComponent.scrollToApp(`${appName}${appMethod}`);
  }

  toggleSidebar() {
    this.sidebarView = !this.sidebarView;

    if (!this.sidebarView) this.sidebarWidth = 'auto';
    else this.sidebarWidth = '400px';
  }

  selectCategory(category: string) {
    this.category = category;
    this.categoryView = false;
  }

  resetToCategoryView() {
    this.search = '';
    this.category = '';
    this.categoryView = true;
  }
}

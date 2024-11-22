import { Injectable } from '@angular/core';
import { App, AppSelect, AppStateInit } from '../store/interfaces/app.interface';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectApps } from '../store/selectors/app.selector';

@Injectable({
  providedIn: 'root'
})
export class SelectAppService {
  private app: Subject<AppSelect> = new Subject<AppSelect>();
  public app$: Observable<AppSelect | null> = this.app.asObservable();

  apps: App[] = [];

  init: boolean = false;

  constructor(private store: Store<AppStateInit>) {
    this.initApps();
  }

  initApps() {
    if (this.init) return;
    else this.init = true;

    this.store.select(selectApps).subscribe((apps) => {
      this.apps = apps;
    });
  }

  selectApp(appSelect: AppSelect) {
    this.app.next(appSelect);
  }

  selectAppByName(appName: string, appMethod: string, below: boolean = true) {
    const app = this.apps.find((app) => app.name === appName && app.method === appMethod);
    if (!app) return;

    this.selectApp({ app, below });
  }
}

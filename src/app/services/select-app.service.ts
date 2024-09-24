import { Injectable } from '@angular/core';
import { App } from '../store/interfaces/app.interface';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectAppService {
  private app: Subject<App> = new Subject<App>();
  public app$: Observable<App | null> = this.app.asObservable();

  constructor() {}

  selectApp(app: App) {
    this.app.next(app);
  }
}

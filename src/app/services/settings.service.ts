import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public settingsOpen$: Observable<boolean> = this.settingsOpen.asObservable();

  constructor() {}

  openSettings() {
    this.settingsOpen.next(true);
  }

  closeSettings() {
    this.settingsOpen.next(false);
  }
}

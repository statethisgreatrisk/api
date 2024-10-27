import { Injectable } from '@angular/core';
import { InfoData } from '../store/interfaces/app.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private infoData: BehaviorSubject<InfoData | null> = new BehaviorSubject<InfoData | null>(null);
  public infoData$: Observable<InfoData | null> = this.infoData.asObservable();

  constructor() {}

  initInfo(infoData: InfoData) {
    this.infoData.next(infoData);
  }

  clearInfo() {
    this.infoData.next(null);
  }
}

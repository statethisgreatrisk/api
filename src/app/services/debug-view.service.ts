import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DebugData } from '../store/interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class DebugViewService {
  private debugView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public debugView$: Observable<boolean> = this.debugView.asObservable();

  private debugData: BehaviorSubject<null | DebugData> = new BehaviorSubject<null | DebugData>(null);
  public debugData$: Observable<null | DebugData> = this.debugData.asObservable();

  toggleDebugView() {
    const view = this.debugView.getValue();
    this.debugView.next(!view);
  }

  setDebugData(debugData: DebugData) {
    this.debugData.next(debugData);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebugViewService {
  private debugView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public debugView$: Observable<boolean> = this.debugView.asObservable();

  toggleDebugView() {
    const view = this.debugView.getValue();
    this.debugView.next(!view);
  }
}

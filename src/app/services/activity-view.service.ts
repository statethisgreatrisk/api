import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityViewService {
  private activityView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public activityView$: Observable<boolean> = this.activityView.asObservable();

  toggleActivityView() {
    const view = this.activityView.getValue();
    this.activityView.next(!view);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deploy } from '../store/interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivityViewService {
  private activityView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public activityView$: Observable<boolean> = this.activityView.asObservable();

  private selectedDeployment: BehaviorSubject<Deploy | null> = new BehaviorSubject<Deploy | null>(null);
  public selectedDeployment$: Observable<Deploy | null> = this.selectedDeployment.asObservable();

  toggleActivityView() {
    const view = this.activityView.getValue();
    this.activityView.next(!view);
  }

  setDeployment(deploy: Deploy) {
    this.selectedDeployment.next(deploy)
  }

  clearDeployment() {
    this.selectedDeployment.next(null);
  }
}

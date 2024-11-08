import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deploy } from '../store/interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class LogsViewService {
  private logsView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public logsView$: Observable<boolean> = this.logsView.asObservable();

  private selectedDeployment: BehaviorSubject<Deploy | null> = new BehaviorSubject<Deploy | null>(null);
  public selectedDeployment$: Observable<Deploy | null> = this.selectedDeployment.asObservable();

  toggleLogsView() {
    const view = this.logsView.getValue();
    this.logsView.next(!view);
  }

  setDeployment(deploy: Deploy) {
    this.selectedDeployment.next(deploy)
  }

  clearDeployment() {
    this.selectedDeployment.next(null);
  }
}

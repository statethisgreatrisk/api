import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsViewService {
  private logsView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public logsView$: Observable<boolean> = this.logsView.asObservable();

  toggleLogsView() {
    const view = this.logsView.getValue();
    this.logsView.next(!view);
  }
}

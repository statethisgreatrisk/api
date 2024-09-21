import { Injectable } from '@angular/core';
import { Toast } from '../store/interfaces/app.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];

  private toast: BehaviorSubject<Toast | null> = new BehaviorSubject<Toast | null>(null);
  public toast$: Observable<Toast | null> = this.toast.asObservable();

  constructor() {
    this.interval();
  }

  interval() {
    setInterval(() => this.addCycle(), 1000);
    setInterval(() => this.removeCycle(), 7000);
  }

  addCycle() {
    if (this.toast.getValue()) return;
    if (!this.toasts.length) return;

    this.toast.next(this.toasts[0]);
    this.toasts.shift();
  }

  removeCycle() {
    if (!this.toast.getValue()) return;
    
    this.toast.next(null);
  }

  addToast(toast: Toast) {
    this.toasts.push(toast);
  }
}

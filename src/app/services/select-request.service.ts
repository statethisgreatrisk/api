import { Injectable } from '@angular/core';
import { Request } from '../store/interfaces/app.interface';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectRequestService {
  private request: Subject<Request> = new Subject<Request>();
  public request$: Observable<Request | null> = this.request.asObservable();

  selectRequest(request: Request) {
    this.request.next(request);
  }
}

import { Injectable } from '@angular/core';
import { DeleteData } from '../store/interfaces/app.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private deleteData: BehaviorSubject<DeleteData | null> = new BehaviorSubject<DeleteData | null>(null);
  public deleteData$: Observable<DeleteData | null> = this.deleteData.asObservable();

  constructor() {}

  initDelete(deleteData: DeleteData) {
    this.deleteData.next(deleteData);
  }

  clearDelete() {
    this.deleteData.next(null);
  }
}

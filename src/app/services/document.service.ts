import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private document: BehaviorSubject<any | null> = new BehaviorSubject<any>({});
  public document$: Observable<any | null> = this.document.asObservable().pipe(skip(1));

  selectDocument(document: any) {
    this.document.next(document);
  }
}

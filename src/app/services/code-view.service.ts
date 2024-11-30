import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CodeData } from '../store/interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class CodeViewService {
  private codeData: BehaviorSubject<null | CodeData> = new BehaviorSubject<null | CodeData>(null);
  public codeData$: Observable<null | CodeData> = this.codeData.asObservable();

  setCodeData(codeData: CodeData) {
    this.codeData.next(codeData);
  }

  clearCodeData() {
    this.codeData.next(null);
  }
}

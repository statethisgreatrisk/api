import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loginOpen$: Observable<boolean> = this.loginOpen.asObservable();

  constructor() {

  }

  signUp() {

  }

  login() {

  }

  logout() {

  }

  setSession() {

  }

  validateSession() {

  }

  openLogin() {
    this.loginOpen.next(true);
  }

  closeLogin() {
    this.loginOpen.next(false);
  }
}

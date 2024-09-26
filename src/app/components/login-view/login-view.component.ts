import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Auth } from '../../store/interfaces/app.interface';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { authError, authSuccess, confirmUser, forgotUser, loginUser, resendUser, resetUser, signupUser } from '../../store/actions/app.action';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {
  view: string = 'login';
  message: string = '';

  loading: boolean = false;

  email: string = '';
  password: string = '';
  confirmationCode: string = '';

  authResponse: Auth | null = null;
  authSuccessSub: Subscription | null = null;
  authErrorSub: Subscription | null = null;

  constructor(private actions$: Actions, private store: Store<AppStateInit>, private authService: AuthService) {}

  ngOnInit() {
    this.authSuccessSub = this.actions$.pipe((ofType(authSuccess))).subscribe((authResponse) => {
      if (authResponse.action === 'signup') this.signupSuccess(authResponse);
      if (authResponse.action === 'resend') this.resendSuccess(authResponse);
      if (authResponse.action === 'confirm') this.confirmSuccess(authResponse);
      if (authResponse.action === 'forgot') this.forgotSuccess(authResponse);
      if (authResponse.action === 'reset') this.resetSuccess(authResponse);
      if (authResponse.action === 'login') this.loginSuccess(authResponse);
    });
    
    this.authErrorSub = this.actions$.pipe((ofType(authError))).subscribe((authResponse) => {
      if (authResponse.action === 'signup') this.signupError(authResponse);
      if (authResponse.action === 'resend') this.resendError(authResponse);
      if (authResponse.action === 'confirm') this.confirmError(authResponse);
      if (authResponse.action === 'forgot') this.forgotError(authResponse);
      if (authResponse.action === 'reset') this.resetError(authResponse);
      if (authResponse.action === 'login') this.loginError(authResponse);
    });
  }

  ngOnDestroy() {
    this.authSuccessSub?.unsubscribe();
    this.authErrorSub?.unsubscribe();
  }

  openSignup() {
    this.view = 'signup';
  }

  // openResend() {
  //   this.view = 'resend';
  // }

  openConfirm() {
    this.view = 'confirm';
  }

  openForgot() {
    this.view = 'forgot';
  }

  openReset() {
    this.view = 'reset';
  }

  openLogin() {
    this.view = 'login';
  }

  signup() {
    if (!this.email || !this.password) return;
    this.loading = true;
    this.store.dispatch(signupUser({ email: this.email, password: this.password }));
  }

  resend() {
    if (!this.email) return;
    this.loading = true;
    this.store.dispatch(resendUser({ email: this.email }));
  }

  confirm() {
    if (!this.email || !this.confirmationCode) return;
    this.loading = true;
    this.store.dispatch(confirmUser({ email: this.email, confirmationCode: this.confirmationCode }));
  }

  forgot() {
    if (!this.email) return;
    this.loading = true;
    this.store.dispatch(forgotUser({ email: this.email }));
  }

  reset() {
    if (!this.email || !this.password || !this.confirmationCode) return;
    this.loading = true;
    this.store.dispatch(resetUser({ email: this.email, password: this.password, confirmationCode: this.confirmationCode }));
  }

  login() {
    if (!this.email || !this.password) return;
    this.loading = true;
    this.store.dispatch(loginUser({ email: this.email, password: this.password }));
  }

  signupSuccess(authResponse: Auth) {
    this.loading = false;
    this.password = '';
    this.openConfirm();
  }

  resendSuccess(authResponse: Auth) {
    this.loading = false;
    this.confirmationCode = '';
  }

  confirmSuccess(authResponse: Auth) {
    this.loading = false;
    this.confirmationCode = '';
    this.openLogin();
  }

  forgotSuccess(authResponse: Auth) {
    this.loading = false;
    this.openReset();
  }

  resetSuccess(authResponse: Auth) {
    this.loading = false;
    this.password = '';
    this.confirmationCode = '';
    this.openLogin();
  }

  loginSuccess(authResponse: Auth) {
    this.loading = false;
    this.email = '';
    this.password = '';
    this.confirmationCode = '';
    this.authService.closeLogin();
  }

  signupError(authResponse: Auth) {
    this.loading = false;
  }

  resendError(authResponse: Auth) {
    this.loading = false;
  }

  confirmError(authResponse: Auth) {
    this.loading = false;
  }

  forgotError(authResponse: Auth) {
    this.loading = false;
  }

  resetError(authResponse: Auth) {
    this.loading = false;
  }

  loginError(authResponse: Auth) {
    this.loading = false;
  }
}

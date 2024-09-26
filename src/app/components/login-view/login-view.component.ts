import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  email: string = '';
  password: string = '';

  openLogin() {
    this.clearForm();
    this.view = 'login';
  }

  openForgotPassword() {
    this.clearForm();
    this.view = 'forgotPassword';
  }

  openSignUp() {
    this.clearForm();
    this.view = 'signUp';
  }

  openMessageView() {
    this.clearForm();
    this.view = 'message';
  }

  login() {

  }

  signup() {

  }

  reset() {

  }

  clearForm() {
    this.email = '';
    this.password = '';
    this.message = '';
  }
}

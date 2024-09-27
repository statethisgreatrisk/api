import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit, User } from '../../store/interfaces/app.interface';
import { authSuccess, logoutUser } from '../../store/actions/app.action';
import { Subscription } from 'rxjs';
import { selectUser } from '../../store/selectors/app.selector';
import { NgIf } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-account-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './account-view.component.html',
  styleUrl: './account-view.component.scss'
})
export class AccountViewComponent {
  user: User | null = null;
  sub: Subscription | null = null;

  logoutSub: Subscription | null = null;
  
  loading: boolean = false;

  constructor(private store: Store<AppStateInit>, private actions$: Actions,) {}

  ngOnInit() {
    this.initLatest();
    this.initLoadingRequest();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.logoutSub?.unsubscribe();
  }

  logout() {
    if (!this.user) return;
    this.loading = true;
    this.store.dispatch(logoutUser({ email: this.user.email }));
  }

  initLatest() {
    this.sub = this.store.select(selectUser).subscribe((user) => this.user = user);
  }

  initLoadingRequest() {
    this.logoutSub = this.actions$.pipe((ofType(authSuccess))).subscribe((authResponse) => {
      if (authResponse.action === 'logout') {
        this.loading = false;
      }
    });
  }
}

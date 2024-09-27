import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit, User } from '../../store/interfaces/app.interface';
import { Subscription } from 'rxjs';
import { selectUser } from '../../store/selectors/app.selector';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-account-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './account-view.component.html',
  styleUrl: './account-view.component.scss'
})
export class AccountViewComponent {
  user: User | null = null;
  userSub: Subscription | null = null;

  constructor(private store: Store<AppStateInit>) {}

  ngOnInit() {
    this.initUser();
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

  initUser() {
    this.userSub = this.store.select(selectUser).subscribe((user) => this.user = user);
  }
}

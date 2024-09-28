import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { selectBillings, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { Subscription, combineLatest } from 'rxjs';
import { User, View, Project, Billing, AppStateInit } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { billingError, billingSuccess, createBilling } from '../../store/actions/app.action';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-billing-view',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './billing-view.component.html',
  styleUrl: './billing-view.component.scss'
})
export class BillingViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  billings: Billing[] | null = null;

  sub: Subscription | null = null;
  billingSuccessSub: Subscription | null = null;
  billingErrorSub: Subscription | null = null;

  dropdown: boolean = false;

  amount: number = 1000;
  balance: number = 0;

  loading = false;

  constructor(
    private store: Store<AppStateInit>,
    private actions$: Actions,
  ) {}

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  ngOnInit() {
    this.initLatest();
    this.initBillingSuccess();
    this.initBillingError();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.billingSuccessSub?.unsubscribe();
    this.billingErrorSub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectBillings),
    ]).subscribe(([user, view, project, billings]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (billings) {
        this.billings = billings;
        for (const billing of billings) {
          if (billing.debit) this.balance += billing.debit;
          if (billing.credit) this.balance -= billing.credit;
        }
      }
    });
  }

  initBillingSuccess() {
    this.billingSuccessSub = this.actions$.pipe((ofType(billingSuccess))).subscribe(() => {
      this.loading = false;
    });
  }

  initBillingError() {
    this.billingSuccessSub = this.actions$.pipe((ofType(billingError))).subscribe(() => {
      this.loading = false;
    });
  }

  selectAmount(amount: number) {
    this.amount = amount;
    this.toggleDropdown();
  }

  dollarAmount(amount: number) {
    return (amount / 100).toFixed(2);
  }

  charge() {
    if (!this.user) return;
    if (!this.project) return;
    if (!this.amount) return;
    if (this.amount !== 1000 && this.amount !== 2500) return;

    const _id = '';
    const userId = this.user._id;
    const projectId = this.project._id;
    const date = new Date().toISOString();
    const active = true;
    const debit = this.amount;
    const credit = 0;

    this.loading = true;
    this.store.dispatch(createBilling({ projectId: this.project._id, billing: { _id, userId, projectId, date, active, debit, credit }}));
  }
}

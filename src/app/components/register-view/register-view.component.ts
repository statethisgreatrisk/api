import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AppStateInit, Project, Register, User, View } from '../../store/interfaces/app.interface';
import { selectMainProject, selectRegisters, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-view',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './register-view.component.html',
  styleUrl: './register-view.component.scss'
})
export class RegisterViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  registers: Register[] | null = null;

  register = '';

  sub: Subscription | null = null;

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initLatest();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectRegisters),
    ]).subscribe(([user, view, project, registers]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.registers = registers;
    });
  }
}

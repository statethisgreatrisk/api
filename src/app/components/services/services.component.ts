import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit, Service, View } from '../../store/interfaces/app.interface';
import { map } from 'rxjs';
import { NgClass, NgFor } from '@angular/common';
import { deselectServiceData, selectService } from '../../store/actions/app.action';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  view: View = { service: '', serviceDataId: '' };
  services: Service[] = [];

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initView();
    this.initServices();
  }

  selectService(name: string) {
    this.store.dispatch(deselectServiceData());
    this.store.dispatch(selectService({ name }));
  }

  initView() {
    this.store.pipe(map((store) => store.app.view)).subscribe((view) => {
      if (!view) return;
      this.view = view;
    });
  }

  initServices() {
    this.store.pipe(map((store) => store.app.services)).subscribe((services) => {
      if (!services || !services.length) return;
      this.services = services;
    });
  }
}

import { Component } from '@angular/core';
import { AppStateInit, Endpoint, View } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-service-data',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './service-data.component.html',
  styleUrl: './service-data.component.scss'
})
export class ServiceDataComponent {
  endpoints: Endpoint[] = [];
  view: View = { service: '' };

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initView();
    this.initEndpoints();
  }

  initView() {
    this.store.pipe(map((store) => store.app.view)).subscribe((view) => {
      if (!view) return;
      this.view = view;
    });
  }

  initEndpoints() {
    this.store.pipe(map((store) => store.app.endpoints)).subscribe((endpoints) => {
      if (!endpoints || !endpoints.length) return;
      this.endpoints = endpoints;
    });
  }
}

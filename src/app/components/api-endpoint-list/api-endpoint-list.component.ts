import { Component } from '@angular/core';
import { AppStateInit, Endpoint, View } from '../../store/interfaces/app.interface';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-api-endpoint-list',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './api-endpoint-list.component.html',
  styleUrl: './api-endpoint-list.component.scss'
})
export class ApiEndpointListComponent {
  endpoints: Endpoint[] = [];
  view: View = { service: '' };

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initView();
    this.initAPIEndpoints();
  }

  initView() {
    this.store.pipe(map((store) => store.app.view)).subscribe((view) => {
      if (!view) return;
      this.view = view;
    });
  }

  initAPIEndpoints() {
    this.store.pipe(map((store) => store.app.endpoints)).subscribe((endpoints) => {
      if (!endpoints || !endpoints.length) return;
      this.endpoints = endpoints;
    });
  }
}

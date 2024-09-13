import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit, Service } from '../../store/interfaces/app.interface';
import { map } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services: Service[] = [];

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initServices();
  }

  initServices() {
    this.store.pipe(map((store) => store.app.services)).subscribe((services) => {
      if (!services || !services.length) return;
      this.services = services;
    });
  }
}

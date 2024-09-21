import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { ServiceEditComponent } from './components/service-edit/service-edit.component';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { View, AppStateInit } from './store/interfaces/app.interface';
import { StorageViewComponent } from './components/storage-view/storage-view.component';
import { ApiViewComponent } from './components/api-view/api-view.component';
import { LandingViewComponent } from './components/landing-view/landing-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, ServicesComponent, ServiceEditComponent, StorageViewComponent, ApiViewComponent, LandingViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  view: View = { service: '', serviceDataId: '' };

  constructor(
    private store: Store<AppStateInit>,
  ) {}

  ngOnInit() {
    this.initView();
  }

  initView() {
    this.store.pipe(map((store) => store.app.view)).subscribe((view) => {
      if (!view) return;
      this.view = view;
    });
  }
}

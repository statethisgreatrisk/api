import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { App, AppStateInit } from '../../store/interfaces/app.interface';
import { selectApps } from '../../store/selectors/app.selector';
import { SelectAppService } from '../../services/select-app.service';

@Component({
  selector: 'app-app-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './app-view.component.html',
  styleUrl: './app-view.component.scss'
})
export class AppViewComponent {
  apps: App[] = [];

  constructor(
    private store: Store<AppStateInit>,
    private selectAppService: SelectAppService,
  ) {}

  ngOnInit() {
    this.initApps();
  }

  initApps() {
    this.store.select(selectApps).subscribe((apps) => {
      const mutableApps = [...apps];
      this.apps = mutableApps.sort((a, b) => (a.name + a.method).localeCompare(b.name + b.method));
    });
  }

  selectApp(app: App) {
    this.selectAppService.selectApp(app);
  }
}

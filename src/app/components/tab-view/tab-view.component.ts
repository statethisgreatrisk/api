import { Component } from '@angular/core';
import { ActivityViewService } from '../../services/activity-view.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tab-view',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tab-view.component.html',
  styleUrl: './tab-view.component.scss'
})
export class TabViewComponent {
  activityViewSub: Subscription | null = null;
  activityViewOpen: boolean = false;

  tab = '';
  
  constructor(
    private activityViewService: ActivityViewService,
  ) {}
  
  ngOnInit() {
    this.initActivityView();
  }

  ngOnDestroy() {
    this.activityViewSub?.unsubscribe();
  }

  initActivityView() {
    this.activityViewService.activityView$.subscribe((activityView) => this.activityViewOpen = activityView);
  }

  toggleActivityView() {
    this.activityViewService.toggleActivityView();
  }
}

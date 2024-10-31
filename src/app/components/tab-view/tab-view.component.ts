import { Component } from '@angular/core';
import { ActivityViewService } from '../../services/activity-view.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { DebugViewService } from '../../services/debug-view.service';

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

  debugViewSub: Subscription | null = null;
  debugViewOpen: boolean = false;
  
  constructor(
    private activityViewService: ActivityViewService,
    private debugViewService: DebugViewService,
  ) {}
  
  ngOnInit() {
    this.initActivityView();
    this.initDebugView();
  }

  ngOnDestroy() {
    this.activityViewSub?.unsubscribe();
    this.debugViewSub?.unsubscribe();
  }

  initActivityView() {
    this.activityViewService.activityView$.subscribe((activityView) => this.activityViewOpen = activityView);
  }

  initDebugView() {
    this.debugViewService.debugView$.subscribe((debugView) => this.debugViewOpen = debugView);
  }

  toggleActivityView() {
    if (this.debugViewOpen) this.toggleDebugView();
    this.activityViewService.toggleActivityView();
  }

  toggleDebugView() {
    if (this.activityViewOpen) this.toggleActivityView();
    this.debugViewService.toggleDebugView();
  }
}

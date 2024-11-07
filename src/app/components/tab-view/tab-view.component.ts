import { Component } from '@angular/core';
import { ActivityViewService } from '../../services/activity-view.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { DebugViewService } from '../../services/debug-view.service';
import { LogsViewService } from '../../services/logs-view.service';

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

  logsViewSub: Subscription | null = null;
  logsViewOpen: boolean = false;
  
  constructor(
    private activityViewService: ActivityViewService,
    private debugViewService: DebugViewService,
    private logsViewService: LogsViewService,
  ) {}
  
  ngOnInit() {
    this.initActivityView();
    this.initDebugView();
    this.initLogsView();
  }

  ngOnDestroy() {
    this.activityViewSub?.unsubscribe();
    this.debugViewSub?.unsubscribe();
    this.logsViewSub?.unsubscribe();
  }

  initActivityView() {
    this.activityViewService.activityView$.subscribe((activityView) => this.activityViewOpen = activityView);
  }

  initDebugView() {
    this.debugViewService.debugView$.subscribe((debugView) => this.debugViewOpen = debugView);
  }

  initLogsView() {
    this.logsViewService.logsView$.subscribe((logsView) => this.logsViewOpen = logsView);
  }

  toggleActivityView() {
    if (this.debugViewOpen) this.toggleDebugView();
    if (this.logsViewOpen) this.toggleLogsView();
    this.activityViewService.toggleActivityView();
  }

  toggleDebugView() {
    if (this.activityViewOpen) this.toggleActivityView();
    if (this.logsViewOpen) this.toggleLogsView();
    this.debugViewService.toggleDebugView();
  }

  toggleLogsView() {
    if (this.activityViewOpen) this.toggleActivityView();
    if (this.debugViewOpen) this.toggleDebugView();
    this.logsViewService.toggleLogsView();
  }
}

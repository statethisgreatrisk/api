import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-activity-view',
  standalone: true,
  imports: [NgClass],
  templateUrl: './activity-view.component.html',
  styleUrl: './activity-view.component.scss'
})
export class ActivityViewComponent {
  tab = 'api';

  selectedRowId = '';

  constructor(
    private infoService: InfoService,
  ) {}

  selectTab(tab: string) {
    this.tab = tab;
  }

  showData() {
    this.infoService.initInfo({ data: { "foo": "bar" } })
  }
}

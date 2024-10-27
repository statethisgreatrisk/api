import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { InfoData } from '../../store/interfaces/app.interface';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-info-view',
  standalone: true,
  imports: [NgIf, JsonPipe],
  templateUrl: './info-view.component.html',
  styleUrl: './info-view.component.scss'
})
export class InfoViewComponent {
  infoData: InfoData | null = null;

  constructor(private infoService: InfoService) {}

  ngOnInit() {
    this.infoService.infoData$.subscribe((infoData) => this.infoData = infoData);
  }

  close() {
    this.infoService.clearInfo();
  }
}

import { Component } from '@angular/core';
import { SelectAppService } from '../../services/select-app.service';

@Component({
  selector: 'app-request-docs',
  standalone: true,
  imports: [],
  templateUrl: './request-docs.component.html',
  styleUrl: './request-docs.component.scss'
})
export class RequestDocsComponent {
  constructor(
    private selectAppService: SelectAppService
  ) {}

  selectApp(appName: string, appMethod: string) {
    this.selectAppService.selectAppByName(appName, appMethod);
  }
}

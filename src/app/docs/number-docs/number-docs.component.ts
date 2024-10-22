import { Component } from '@angular/core';
import { SelectAppService } from '../../services/select-app.service';

@Component({
  selector: 'app-number-docs',
  standalone: true,
  imports: [],
  templateUrl: './number-docs.component.html',
  styleUrl: './number-docs.component.scss'
})
export class NumberDocsComponent {
  constructor(
    private selectAppService: SelectAppService
  ) {}

  selectApp(appName: string, appMethod: string) {
    this.selectAppService.selectAppByName(appName, appMethod);
  }
}

import { Component } from '@angular/core';
import { SelectAppService } from '../../services/select-app.service';

@Component({
  selector: 'app-string-docs',
  standalone: true,
  imports: [],
  templateUrl: './string-docs.component.html',
  styleUrl: './string-docs.component.scss'
})
export class StringDocsComponent {
  constructor(
    private selectAppService: SelectAppService
  ) {}

  selectApp(appName: string, appMethod: string) {
    this.selectAppService.selectAppByName(appName, appMethod);
  }
}

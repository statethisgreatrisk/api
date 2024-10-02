import { Component } from '@angular/core';
import { SelectAppService } from '../../services/select-app.service';

@Component({
  selector: 'app-object-docs',
  standalone: true,
  imports: [],
  templateUrl: './object-docs.component.html',
  styleUrl: './object-docs.component.scss'
})
export class ObjectDocsComponent {
  constructor(
    private selectAppService: SelectAppService
  ) {}

  selectApp(appName: string, appMethod: string) {
    this.selectAppService.selectAppByName(appName, appMethod);
  }
}

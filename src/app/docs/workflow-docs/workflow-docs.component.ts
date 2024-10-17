import { Component } from '@angular/core';
import { SelectAppService } from '../../services/select-app.service';

@Component({
  selector: 'app-workflow-docs',
  standalone: true,
  imports: [],
  templateUrl: './workflow-docs.component.html',
  styleUrl: './workflow-docs.component.scss'
})
export class WorkflowDocsComponent {
  constructor(
    private selectAppService: SelectAppService
  ) {}

  selectApp(appName: string, appMethod: string) {
    this.selectAppService.selectAppByName(appName, appMethod);
  }
}

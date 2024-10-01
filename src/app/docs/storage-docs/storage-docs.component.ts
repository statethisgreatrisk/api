import { Component } from '@angular/core';
import { SelectAppService } from '../../services/select-app.service';

@Component({
  selector: 'app-storage-docs',
  standalone: true,
  imports: [],
  templateUrl: './storage-docs.component.html',
  styleUrl: './storage-docs.component.scss'
})
export class StorageDocsComponent {
  constructor(
    private selectAppService: SelectAppService
  ) {}

  selectApp(appName: string, appMethod: string) {
    this.selectAppService.selectAppByName(appName, appMethod);
  }
}

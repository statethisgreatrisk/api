import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DeleteData } from '../../store/interfaces/app.interface';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-delete-view',
  standalone: true,
  imports: [NgIf, JsonPipe],
  templateUrl: './delete-view.component.html',
  styleUrl: './delete-view.component.scss'
})
export class DeleteViewComponent {
  deleteData: DeleteData | null = null;

  constructor(private deleteService: DeleteService) {}

  ngOnInit() {
    this.deleteService.deleteData$.subscribe((deleteData) => this.deleteData = deleteData);
  }

  cancel() {
    this.deleteService.clearDelete();
  }

  delete() {
    this.deleteData?.deleteFn();
    this.deleteService.clearDelete();
  }
}

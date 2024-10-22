import { Component, ViewChild } from '@angular/core';
import { RequestEditComponent } from '../request-edit/request-edit.component';

@Component({
  selector: 'app-edit-request',
  standalone: true,
  imports: [RequestEditComponent],
  templateUrl: './edit-request.component.html',
  styleUrl: './edit-request.component.scss'
})
export class EditRequestComponent {
  requestEditWide = false;
  @ViewChild(RequestEditComponent) requestEditComponent!: RequestEditComponent;

  cancel() {
    this.requestEditComponent.cancel();
  }

  save() {
    this.requestEditComponent.save();
  }

  delete() {
    this.requestEditComponent.delete();
  }
}

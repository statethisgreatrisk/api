import { Component } from '@angular/core';
import { RequestEditComponent } from '../request-edit/request-edit.component';

@Component({
  selector: 'app-row-edit',
  standalone: true,
  imports: [RequestEditComponent],
  templateUrl: './row-edit.component.html',
  styleUrl: './row-edit.component.scss'
})
export class RowEditComponent {

}

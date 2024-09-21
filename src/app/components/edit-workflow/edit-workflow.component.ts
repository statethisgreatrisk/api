import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit } from '../../store/interfaces/app.interface';
import { selectWindow } from '../../store/actions/app.action';

@Component({
  selector: 'app-edit-workflow',
  standalone: true,
  imports: [],
  templateUrl: './edit-workflow.component.html',
  styleUrl: './edit-workflow.component.scss'
})
export class EditWorkflowComponent {
  constructor(
    private store: Store<AppStateInit>,
  ) {}

  openView() {
    this.store.dispatch(selectWindow({ windowName: 'Workflow', windowId: '1' }));
  }
}

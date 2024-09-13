import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiListComponent } from './components/api-list/api-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ApiListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'api';
}

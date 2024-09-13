import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { ServiceDataComponent } from './components/service-data/service-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ServicesComponent, ServiceDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'api';
}

import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../store/interfaces/app.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toast-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './toast-view.component.html',
  styleUrl: './toast-view.component.scss'
})
export class ToastViewComponent {
  toast: Toast | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((toast) => this.toast = toast);
  }
}

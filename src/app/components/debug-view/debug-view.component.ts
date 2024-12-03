import { Component, ElementRef, ViewChild } from '@angular/core';
import { DebugViewService } from '../../services/debug-view.service';
import { Subscription } from 'rxjs';
import { NgFor, NgStyle } from '@angular/common';
import { ResizableHeightDirective } from '../../directives/resizable-height.directive';

interface ValidationError {
  row: number;
  position: string;
  error: string;
}

@Component({
  selector: 'app-debug-view',
  standalone: true,
  imports: [NgFor, NgStyle, ResizableHeightDirective],
  templateUrl: './debug-view.component.html',
  styleUrl: './debug-view.component.scss'
})
export class DebugViewComponent {
  debugDataSub: Subscription | null = null;
  validationErrors: ValidationError[] = [];

  @ViewChild('debugViewContainer') debugViewContainer!: ElementRef;

  workflowBarHeight: string = localStorage.getItem('workflowBarHeight') || '250';

  constructor(private debugViewService: DebugViewService) {}

  openDocumentation() {
    
  }
}

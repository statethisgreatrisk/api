import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizableHeight]',
  standalone: true
})
export class ResizableHeightDirective {
  @Input() minHeight: number = 100;
  @Input() maxHeight: number = 255;
  @Input() localStorageKey!: string;
  @Input() resizingElement!: any;
  @Input() reverse: boolean = false;

  private resizing: boolean = false;
  private startY: number = 0;
  private startHeight: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (!this.resizingElement) return;

    this.resizing = true;
    this.startY = event.clientY;
    this.startHeight = this.resizingElement.offsetHeight;
    event.preventDefault();
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.resizing = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.resizingElement) return;
    if (!this.resizing) return;

    let newHeight = 0;

    if (this.reverse) newHeight = this.startHeight + (this.startY - event.clientY);
    else newHeight = this.startHeight + (event.clientY - this.startY);

    if (newHeight >= this.minHeight && newHeight <= this.maxHeight) {
      this.renderer.setStyle(this.resizingElement, 'height', `${newHeight}px`);
      this.renderer.setStyle(this.resizingElement, 'max-height', `${newHeight}px`);
      localStorage.setItem(this.localStorageKey, String(newHeight));
    }
  }
}

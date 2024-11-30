import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizableWidth]',
  standalone: true
})
export class ResizableWidthDirective {
  @Input() minWidth: number = 400;
  @Input() maxWidth: number = 600;
  @Input() localStorageKey!: string;
  @Input() resizingElement!: any;
  @Input() reverse: boolean = false;

  private resizing: boolean = false;
  private startX: number = 0;
  private startWidth: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (!this.resizingElement) return;

    this.resizing = true;
    this.startX = event.clientX;
    this.startWidth = this.resizingElement.offsetWidth;
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

    let newWidth = 0;

    if (this.reverse) newWidth = this.startWidth + (this.startX - event.clientX);
    else newWidth = this.startWidth + (event.clientX - this.startX);

    if (newWidth >= this.minWidth && newWidth <= this.maxWidth) {
      this.renderer.setStyle(this.resizingElement, 'width', `${newWidth}px`);
      localStorage.setItem(this.localStorageKey, String(newWidth));
    }
  }
}

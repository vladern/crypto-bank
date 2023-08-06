import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightChange]',
  standalone: true
})
export class HighlightChangeDirective implements OnChanges {
  @Input() appHighlightChange: number;
  @Input() lowerClassName = 'lower-value';
  @Input() higherClassName = 'higher-value';
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: any) {
    const prevValue = changes.appHighlightChange.previousValue;
    const currValue = changes.appHighlightChange.currentValue;
    if (prevValue < currValue) {
      this.renderer.addClass(this.el.nativeElement, this.higherClassName);
      this.renderer.removeClass(this.el.nativeElement, this.lowerClassName);
      setTimeout(() => {
        this.renderer.removeClass(this.el.nativeElement, this.higherClassName);
      }, 1000);
    } else if (prevValue > currValue) {
      this.renderer.addClass(this.el.nativeElement, this.lowerClassName);
      this.renderer.removeClass(this.el.nativeElement, this.higherClassName);
      setTimeout(() => {
        this.renderer.removeClass(this.el.nativeElement, this.lowerClassName);
      }, 1000);
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.higherClassName);
      this.renderer.removeClass(this.el.nativeElement, this.lowerClassName);
    }
  }

}

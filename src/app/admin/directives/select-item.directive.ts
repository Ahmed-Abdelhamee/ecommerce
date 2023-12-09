import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[SelectItem]'
})
export class SelectItemDirective {

  constructor(private eleRef:ElementRef) { }
  
  @HostListener('mousemove') changeBrightness(){
    this.eleRef.nativeElement.style.filter="brightness(.7)";
   }
   @HostListener('mouseleave') resetBrightness(){
    this.eleRef.nativeElement.style.filter="brightness(1)";
   }
}

import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[LtrDirective]'
})
export class LtrDirective {

  constructor(private eleRef:ElementRef) {
    eleRef.nativeElement.style.direction="ltr !important";
   }

}

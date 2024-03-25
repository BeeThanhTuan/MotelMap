import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el: ElementRef) {}

  @HostListener('click')
  nextFunc() {
   let elm =  this.el.nativeElement.parentElement.parentElement.children[1].children[0];
   let img = elm.getElementsByClassName("img-secondary");
   elm.append(img[0])
  }
}

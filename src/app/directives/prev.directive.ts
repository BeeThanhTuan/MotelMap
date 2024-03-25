import { Directive ,  ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private el: ElementRef) {}

  @HostListener('click')
  
  prevFunc() {
  let elm =  this.el.nativeElement.parentElement.parentElement.children[1].children[0];
  let img = elm.getElementsByClassName("img-secondary");
   elm.prepend(img[img.length - 1])
  }

}

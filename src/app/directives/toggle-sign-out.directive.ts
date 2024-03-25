import { Directive ,  ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appToggleSignOut]'
})
export class ToggleSignOutDirective {

  constructor(private el: ElementRef) {}

  @HostListener('click')
  toggleSignOutFunc() {
    let elm = this.el.nativeElement.parentElement;
    console.log(elm);
    elm.classList.toggle("active");
    
    
  }

}

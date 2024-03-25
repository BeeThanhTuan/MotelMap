import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleFilter]'
})
export class ToggleFilterDirective {

  constructor(private el: ElementRef) {}

  @HostListener('click')
  toggleSignOutFunc() {
 
    const elm = this.el.nativeElement.parentElement;
    console.log(elm);
    elm.classList.toggle("active");
    let changeI = document.querySelector(".i-filter") ;
    console.log(changeI);
    
    if(changeI){
      if(elm.classList.contains("active")){
        changeI.className="fa-solid fa-angles-left i-filter";
      }
      else{
        changeI.className="fa-solid fa-angles-right i-filter";

      }
    }
    
  }

}

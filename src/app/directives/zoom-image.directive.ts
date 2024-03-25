import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appZoomImage]'
})
export class ZoomImageDirective {

  constructor(private elm: ElementRef) {}
  @HostListener('click')

  zoomImageSecondary(){
    const imgSecondary = this.elm.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    // console.log(imgSecondary);

    const images = this.elm.nativeElement.children[0];

    const imgZoom = document.createElement("div");
    imgZoom.classList.add("img-Zoom");
    imgZoom.style.position = "absolute";
    imgZoom.style.width = "100%";
    imgZoom.style.height = "100vh";
    imgZoom.style.backgroundColor = "rgba(20, 20, 20, 0.85)";
    imgZoom.style.zIndex = "100";
    imgZoom.style.top = "0";
    imgZoom.style.left = "0";
    imgZoom.style.display = "flex";
    imgZoom.style.justifyContent = "center";
    imgZoom.style.alignItems = "center";
    imgSecondary.appendChild(imgZoom);


    const img = document.createElement("img");
    img.src = images.src;
    imgZoom.appendChild(img);
    img.style.width="70%";
    img.style.height="80%";
    img.style.objectFit="cover";
    img.style.filter= "brightness(120%)";
    img.style.border = "1px solid #fff"

    imgZoom.addEventListener("click", (event) => {
        console.log('aaa');
        imgSecondary.removeChild(imgZoom);
    });
    img.addEventListener("click", (event) => {
      event.stopPropagation();
    });

  }
}

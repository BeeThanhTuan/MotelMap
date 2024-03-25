import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Map, icon, marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet';
import { MotelService } from 'src/app/services/motel.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  map!: L.Map;
  routingControl: any;
  listMarkersLayer: L.Layer[] = [];
  listMarkers: { id: string; latLng: string; details: object }[] = [];
  currentMotelDetail: any = {};
  linkImages: string[] = [];
  addressMotel!: string;
  svMotel!: string;
  distanceMotel!: string;
  descriptionMotel!: string;
  convenientMotel!: string;
  priceMotel!: number;
  numberPhoneMotel!: string;
  locationMotel!: string;
  idMotel!: string;

  listSearchMarker: any[] = [];
  valueSearchInput: string = '';

  //phường xã
  listSV: any;

  //filter
  selectedSV: string = '';
  sliderPriceValue: number = 2000000;
  sliderDistanceValue: number = 1;
  isCheckSV: boolean = false;
  isCheckPrice: boolean = false;
  isCheckDistance: boolean = false;

  constructor(
    private router: Router,
    private motelService: MotelService,
  ) {}

  @ViewChild('infoMotel') infoMotel!: ElementRef;

  ngAfterViewInit(): void {
    this.getListMarker();
    this.getListSV();
  }

  // lấy ra các list marker
  getListMarker(): void {
    this.motelService.getAllMotels().subscribe((data) => {
      this.listSearchMarker = data;
      data.forEach((motel) => {
        const latLng = motel.LatLng;
        this.listMarkers.push({ id: motel._id, latLng, details: motel });
      });
      this.initMap();
    });
  }
  //lấy ra phường xã
  getListSV(): void {
    this.motelService.getAllMotels().subscribe((data) => {
      // Sử dụng Set để loại bỏ phần tử trùng lặp
      const uniquePhuongXaSet = new Set<string>();
      data.forEach((motel) => {
        uniquePhuongXaSet.add(motel.PhuongXa.toString());
      });
      // Chuyển đổi Set thành mảng
      this.listSV = Array.from(uniquePhuongXaSet);
    });
  }

  // Khởi tao map
  initMap(): void {
    // Khởi tao map
    if (!this.map) {
      this.map = new Map('map').setView([13.7594, 109.2173], 14);
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
    }

    this.removeZoom();
    // icon map
    const motelIcon = icon({
      iconUrl: './assets/icon/marker.png',
      iconSize: [40, 42],
      iconAnchor: [16, 16],
    });

    // lay tat ca cac marker trong csdl
    this.listMarkers.forEach((markers) => {
      // Ẩn tất cả các marker
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      const { id, latLng, details } = markers;
      const [lat, lng] = latLng.split(',').map(parseFloat);
      this.motelService.getMotelById(id.toString()).subscribe((motelDetail) => {
        const markerInstance = marker([lat, lng], {
          icon: motelIcon,
        })
          .addTo(this.map)
          .bindPopup(
            `<p style="color: rgb(0, 71, 193);font-weight:680">${motelDetail.GiaThue.toLocaleString()}đ </p>`,
            {
              autoClose: false,
              closeOnClick: false,
              maxWidth: 70,
            }
          )
          .on('click', (e) => {
            this.setInforMotel(id);
            this.infoMotel.nativeElement.style.left = `0`;
            markerInstance.openPopup();
          })
          .on('popupopen', () => {
            const popup = markerInstance.getPopup()!;
            popup.getElement()!.classList.add('custom-popup');
          });
        markerInstance.openPopup();
        this.setPopupStyles();
      });
    });
  }

  //set information motel
  setInforMotel(id: string): void {
    this.linkImages = [];
    const motelDetail = this.listMarkers.find(
      (marker) => marker.id === id
    )?.details;
    if (motelDetail) {
      this.currentMotelDetail = motelDetail;
      const listLinkImages = this.currentMotelDetail.HinhAnh;
      listLinkImages.map((link: any) => {
        this.linkImages.push(link.Anh);
      });
      this.addressMotel = this.currentMotelDetail.DiaChi;
      this.svMotel = this.currentMotelDetail.PhuongXa;
      this.distanceMotel = this.currentMotelDetail.KhoangCach;
      this.descriptionMotel = this.currentMotelDetail.MoTa;
      this.convenientMotel = this.currentMotelDetail.TienNghi;
      this.priceMotel = this.currentMotelDetail.GiaThue;
      this.numberPhoneMotel = this.currentMotelDetail.ChuNhaTro.SDT;
      this.locationMotel = this.currentMotelDetail.LatLng;
      this.idMotel = this.currentMotelDetail._id;
    }
  }

  // css các thuộc tính của popup
  setPopupStyles(): void {
    const listPopup = document.querySelectorAll(
      '.custom-popup'
    ) as NodeListOf<HTMLElement>;
    listPopup.forEach((element) => {
      const children1 = element.children[0] as HTMLElement;
      children1.style.width = 'fit-content';
      children1.style.height = '1px';
      children1.style.boxShadow = 'none';
      children1.style.position = 'relative';
      children1.style.left = '10px';
      children1.style.top = '-35px';
      children1.style.backgroundColor = 'transparent';
      children1.style.zIndex = '1';

      const children2 = element.children[1].children[0] as HTMLElement;
      children2.style.backgroundColor = 'transparent';
      children2.style.boxShadow = 'none';

      const children3 = element.children[2] as HTMLElement;
      children3.style.display = 'none';
    });
  }

  // toggle information motel
  toggleInfoMotel(event: Event): void {
    this.infoMotel.nativeElement.style.left = `-470px`;
  }

  //vẽ đường đi
  onDrawRoute() {
    // Kiểm tra xem bản đồ đã tồn tại chưa
    if (!this.map) {
      this.map = new Map('map').setView([13.7594, 109.2173], 14);
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
    }
    this.drawRoute(this.map);
    this.infoMotel.nativeElement.style.left = `-470px`;

  }

  //vẽ đường đi
  drawRoute(map: L.Map) {
    // Ẩn tất cả các marker
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    const [lat, lng] = this.locationMotel.split(',').map(parseFloat);
    //Location marker
    const endWaypoint = L.latLng(lat, lng);
    //Location trường đại học quy nhơn
    const startWaypoint = L.latLng(13.7587,109.2191);
    this.routingControl = L.Routing.control({
      waypoints: [startWaypoint, endWaypoint],
      routeWhileDragging: true,
      createMarker: function (i: any, waypoint: any, n: any) {
        // Sử dụng biểu tượng tùy chỉnh cho điểm xuất phát và điểm đến
        return L.marker(waypoint.latLng, {
          icon: L.icon({
            iconUrl:
              i === 0
                ? 'http://localhost:4200/assets/icon/u.png'
                : 'http://localhost:4200/assets/icon/marker.png',
            iconSize: [40, 40],
            iconAnchor: [16, 32],
          }),
        });
      },
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.8, weight: 4 }],
        extendToWaypoints: true, // Add this property
        missingRouteTolerance: 10, // Add this property
      },
    } as L.Routing.RoutingControlOptions).addTo(this.map);

    this.createCancelRoute();
  }

  createCancelRoute(): void {
    const instruct = document.querySelector(
      '.leaflet-routing-container.leaflet-bar.leaflet-control'
    ) as HTMLElement;
    instruct.style.position = 'relative';
    instruct.style.top = '100px';
    const cancelRoute = document.createElement('div');
    cancelRoute.className = 'cancelRoute';
    cancelRoute.style.display = 'flex';
    cancelRoute.style.justifyContent = 'center';
    cancelRoute.style.alignItems = 'center';
    cancelRoute.style.paddingBottom = '10px';
    const button = document.createElement('button');
    button.textContent = 'Huỷ đường đi';
    button.style.width = '150px';
    button.style.height = '30px';
    button.style.fontSize = '15px';
    button.style.fontWeight = '600';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.backgroundColor = 'rgb(53, 184, 223)';
    button.addEventListener('click', () => this.cancelRoute()); // Sử dụng arrow function để giữ ngữ cảnh this
    cancelRoute.appendChild(button);
    instruct.appendChild(cancelRoute);
  }

  // Hàm để huỷ đường đi
  cancelRoute() {
    if (this.routingControl) {
      this.routingControl.spliceWaypoints(
        0,
        this.routingControl.getWaypoints().length
      ); // Huỷ toàn bộ waypoints
      this.map.removeControl(this.routingControl); // Huỷ bỏ đối tượng L.Routing.control khỏi bản đồ
      // Sau khi huỷ đường đi, load lại các marker
      this.ngAfterViewInit();
    }
  }

  // đến view information motel
  toInfoDetail(id: string) {
    this.router.navigate(['motel/detail', id]);
  }

  // lọc tiện ích
  filterKey(str: string): boolean {
    // Kiểm tra xem this.convenientMotel có tồn tại không
    if (this.convenientMotel !== undefined && this.convenientMotel !== null) {
      const convenient = this.convenientMotel.toLowerCase();
      // Kiểm tra xem str có xuất hiện trong chuỗi convenient không
      if (convenient.indexOf(str) !== -1) {
        return true;
      }
    }
    return false;
  }

  // Tìm kiếm
  resultSearch!: any;
  searchByAddress(): any {
    const keySearch: string = this.valueSearchInput;
    if (keySearch === '') {
      this.ngAfterViewInit();
    }
    this.resultSearch = this.listSearchMarker.filter((item) =>
      item.DiaChi.toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(keySearch.toLowerCase().trim())
    );

    this.listMarkers = [];
    this.resultSearch.forEach((motel: any) => {
      this.listMarkers.push({
        id: motel._id,
        latLng: motel.LatLng,
        details: motel,
      });
    });

    if (this.listMarkers.length === 0) {
      // Ẩn tất cả các marker
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
    }
    this.initMap();
  }

  onCheckboxChange(type: string, value: any, event: any) {
    // Xử lý khi checkbox thay đổi và chỉ khi checkbox được kiểm tra
    if (event.target.checked) {
      if (type === 'phuongXa') {
        this.selectedSV = value;
        this.isCheckSV = true;
      } else if (type === 'price') {
        this.sliderPriceValue = value;
        this.isCheckPrice = true;
      } else if (type === 'distance') {
        this.sliderDistanceValue = value;      
        this.isCheckDistance = true;
      }
    } else {
      // Nếu checkbox bị bỏ chọn, bạn cũng có thể xử lý tương tự
      if (type === 'phuongXa') {
        this.isCheckSV = false;
      } else if (type === 'price') {
        this.isCheckPrice = false;
      } else if (type === 'distance') {
        this.isCheckDistance = false;
      }
    }
  }

  resultFilter!: any;
  filter() {
    // filter by sv
    let numberCase = 0;
    if (this.isCheckSV && !this.isCheckPrice && !this.isCheckDistance) {
      numberCase = 1;
    }
    if (this.isCheckPrice  && !this.isCheckDistance && !this.isCheckSV) {
      numberCase = 2;
    }
    if (this.isCheckDistance && !this.isCheckSV  && !this.isCheckPrice ){
      numberCase = 3;   
    }
    if (this.isCheckSV && this.isCheckPrice && !this.isCheckDistance) {
      numberCase = 4;
    }
    if (this.isCheckPrice  && this.isCheckDistance && !this.isCheckSV) {
      numberCase = 5;
    }
    if (this.isCheckDistance && this.isCheckSV && !this.isCheckPrice ) {
      numberCase = 6;   
    }
    if (this.isCheckPrice && this.isCheckSV && this.isCheckDistance) {
      numberCase = 7;
    }

    console.log(numberCase);
    

    switch (numberCase) {
      case 0: {
        alert('Vui lòng chọn vào mục muốn filter!');
        break;
      }
      case 1: {
        const keyFilter: string = this.selectedSV;
        this.resultFilter = this.listSearchMarker.filter((item) =>
          item.PhuongXa.toLowerCase()
            .trim()
            .includes(keyFilter.toLowerCase().trim())
        );
        break;
      }
      case 2: {
        const numberFilter: number = this.sliderPriceValue;
        this.resultFilter = this.listSearchMarker.filter(
          (item) => item.GiaThue <= numberFilter
        );
        break;
      }
      case 3: {
        const distanceFilter: number = this.sliderDistanceValue;
        this.resultFilter = this.listSearchMarker.filter(
          (item) => item.KhoangCach <= distanceFilter
        );
        break;
      }
      case 4: {
        const keyFilter: string = this.selectedSV;
        this.resultFilter = this.listSearchMarker.filter((item) =>
          item.PhuongXa.toLowerCase()
            .trim()
            .includes(keyFilter.toLowerCase().trim())
        );
        const numberFilter: number = this.sliderPriceValue;
        this.resultFilter = this.resultFilter.filter(
          (item: any) => item.GiaThue <= numberFilter
        );
        break;
      }
      case 5: {
        const numberFilter: number = this.sliderPriceValue;
        this.resultFilter = this.listSearchMarker.filter(
          (item: any) => item.GiaThue <= numberFilter
        );

        const distanceFilter: number = this.sliderDistanceValue;
        this.resultFilter = this.resultFilter.filter(
          (item:any) => item.KhoangCach <= distanceFilter
        );
        break;
      }

      case 6: {
        const keyFilter: string = this.selectedSV;
        this.resultFilter = this.listSearchMarker.filter((item) =>
          item.PhuongXa.toLowerCase()
            .trim()
            .includes(keyFilter.toLowerCase().trim())
        );
        const distanceFilter: number = this.sliderDistanceValue;
        this.resultFilter = this.resultFilter.filter(
          (item:any) => item.KhoangCach <= distanceFilter
        );
        break;
      }
      case 7: {
        const keyFilter: string = this.selectedSV;
        this.resultFilter = this.listSearchMarker.filter((item) =>
          item.PhuongXa.toLowerCase()
            .trim()
            .includes(keyFilter.toLowerCase().trim())
        );
        const numberFilter: number = this.sliderPriceValue;
        this.resultFilter = this.listSearchMarker.filter(
          (item: any) => item.GiaThue <= numberFilter
        );
        
        const distanceFilter: number = this.sliderDistanceValue;
        this.resultFilter = this.resultFilter.filter(
          (item:any) => item.KhoangCach <= distanceFilter
        );
        break;
      }
    }
    console.log(this.resultFilter);

    this.filterAndShow();
  }

  filterAndShow() {
    this.listMarkers = [];
    this.resultFilter.forEach((motel: any) => {
      this.listMarkers.push({
        id: motel._id,
        latLng: motel.LatLng,
        details: motel,
      });
    });
    this.initMap();
    if (this.listMarkers.length === 0) {
      // Ẩn tất cả các marker
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
    }
  }

  removeFilter() {
    this.ngAfterViewInit();
  }

  removeZoom() {
    const zoom = document.querySelector(
      '.leaflet-control-zoom.leaflet-bar.leaflet-control'
    ) as HTMLElement;
    zoom.style.display = 'none';
  }
}

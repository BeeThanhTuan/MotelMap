import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MotelService } from 'src/app/services/motel.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet';
@Component({
  selector: 'app-add-motel',
  templateUrl: './add-motel.component.html',
  styleUrls: ['./add-motel.component.css'],
})
export class AddMotelComponent {
  selectedFileImages: File[] = [];
  selectedFileVideo: File | null = null;

  imageUrl: string | null = null;
  distanceKm: number | null = 0;
  constructor(
    private http: HttpClient,
    private motelService: MotelService,
    private router: Router
  ) {}
  formData: any = {
    tenNhaTro: '',
    toaDo: '',
    diaChi: '',
    phuongXa: '',
    moTa: '',
    dienTich: '',
    giaThue: '',
    giaDien: '',
    giaNuoc: '',
    giaWifi: '',
    soLuongPhong: '',
    convenient: '',
    tenChuTro: '',
    diaChiChuTro: '',
    soDienThoai: '',
    khoangCach: '',
    tienIch: [],
  };

  phuongXaList = [
    'Bùi Thị Xuân',
    'Đống Đa',
    'Ghềnh Ráng',
    'Hải Cảng',
    'Lê Hồng Phong',
    'Lê Lợi',
    'Lý Thường Kiệt',
    'Ngô Mây',
    'Nguyễn Văn Cừ',
    'Nhơn Bình',
    'Nhơn Phú',
    'Quang Trung',
    'Thị Nại',
    'Trần Hưng Đạo',
    'Trần Phú',
    'Trần Quang Diệu',
    'Nhơn Châu',
    'Nhơn Hải',
    'Nhơn Hội',
    'Nhơn Lý',
    'Phước Mỹ',
  ];
  convenientOptions = [
    'Giường',
    'Điều hoà',
    'Nhà xe',
    'Wifi',
    'Tủ lạnh',
    ' Máy giặt',
    'Vệ sinh riêng',
    'Chỗ nấu ăn',
    'Máy nóng lạnh',
    'Gác lỡ',
  ];
  

  onChangeCheckbox(event: any, convenient: any): void {
    let isChecked = event.target.checked;
    if (isChecked) {
      this.formData.tienIch.push(convenient);
    } else {
      // Nếu checkbox không được chọn, loại bỏ giá trị khỏi mảng
      const index = this.formData.tienIch.indexOf(convenient);
      if (index !== -1) {
        this.formData.tienIch.splice(index, 1);
      }
    }
    this.formData.convenient = this.formData.tienIch.join(', ');
    console.log(this.formData.tienIch);
  }

  //lấy ra list images
  onFileSelectedImages(event: any): void {
    this.selectedFileImages = event.target.files;
  }
  
  //lấy ra video
  onFileSelectedVideo(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      this.selectedFileVideo = file;
    } else {
      console.error('Chỉ chấp nhận các tệp tin video!');
    }
  }


  //thêm nhà trọ
  addMotel(): void {
    const dataMotel = new FormData();
    if (!this.selectedFileImages || this.selectedFileImages.length === 0) {
      console.error('No files selected for upload.');
      return;
    }
    // Thêm image vào dataMotel
    for (let file of this.selectedFileImages) {
      dataMotel.append('images', file);
    }
    // Thêm video vào dataMotel
    if (this.selectedFileVideo) {
      dataMotel.append('video', this.selectedFileVideo);
    }
    console.log(this.distanceKm);
    
    // Gộp cả hình ảnh và dữ liệu vào dataMotel
    for (let key in this.formData) {
      if (this.formData.hasOwnProperty(key)) {
        dataMotel.append(key, this.formData[key]);
      }
    }

    //gọi phương thức post
    this.http.post<any>('http://localhost:3000/api/motel', dataMotel).subscribe(
      (data) => {
        console.log('Upload successful:', data);
        alert('Thêm thành công 1 nhà trọ.');
        this.router.navigate(['/manager/admin/motels']);
      },
      (error) => {
        console.error('Error uploading files and data:', error);
      }
    );
  }

  //tính khoảng cách
  calculateDistance() { 
    // Kiểm tra xem toaDo có giá trị không rỗng
    if (this.formData.toaDo  && this.formData.toaDo.trim() !== '' ) {
      // Thực hiện tính khoảng cách
      const [lat, lng] = this.formData.toaDo.split(',').map(parseFloat);
      const startWaypoint = L.latLng(lat, lng);
      const endWaypoint = L.latLng(13.75892, 109.21872);

      // Tạo đối tượng điều khiển định tuyến
      const routingControlOptions: L.Routing.RoutingControlOptions & {
        createMarker?: () => null;
      } = {
        waypoints: [startWaypoint, endWaypoint],
        routeWhileDragging: true,
        addWaypoints: false,
        createMarker: () => null,
      };
      const routingControl = L.Routing.control(routingControlOptions);

      // Lắng nghe sự kiện sau khi đường đi đã được tính toán
      routingControl.on('routesfound', (event) => {
        const routes = event.routes;

        // Kiểm tra xem có ít nhất một đường đi hay không
        if (routes.length > 0) {
          const route = routes[0];
          const distanceInMeters = route.summary.totalDistance;

          // Convert to kilometers
          const distanceInKm = (distanceInMeters / 1000).toFixed(1);
          this.distanceKm = Number(distanceInKm);

          // Update other data or trigger subsequent actions
          this.formData.khoangCach = this.distanceKm;
          console.log(this.formData.khoangCach);
        }
      });

      // Trigger tính toán đường đi
      if (routingControl) {
        routingControl.route();
      } 
    }
  }
}

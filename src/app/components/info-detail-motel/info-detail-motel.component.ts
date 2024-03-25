import { Component } from '@angular/core';
import { MotelService } from 'src/app/services/motel.service';

@Component({
  selector: 'app-info-detail-motel',
  templateUrl: './info-detail-motel.component.html',
  styleUrls: ['./info-detail-motel.component.css','./info-detail-motel.component_1.css'],
})
export class InfoDetailMotelComponent {
  motelDetail: any;
  listImages: string[] = [];
  listVideos: string[] = [];
  convenientMotel!: string;


  constructor(private motelService: MotelService) {}
  ngOnInit() {
    const path = window.location.pathname;
    const segments = path.split('/');
    const id = segments[segments.length - 1];
    this.motelService.getMotelById(id).subscribe((motel: any) => {
      this.motelDetail = motel;
      this.convenientMotel = this.motelDetail.TienNghi;  
      const listLinkAnh= this.motelDetail.HinhAnh;
      listLinkAnh.map((link: any) => {
        this.listImages.push(link.Anh);            
      });
      const listLinkVideo = this.motelDetail.Video;
    
      listLinkVideo.map((link: any) => {
        this.listVideos.push(link.Video);            
      });
      this.listVideos = this.listVideos.filter((video: any) => video);
      console.log(this.listVideos);
      console.log(this.listImages);
      
      
    });
    
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

  isExistVideo(): boolean{
    if(this.listVideos.length !== 0)
      return true;
    return false
  }
  
}

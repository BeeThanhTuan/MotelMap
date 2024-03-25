import { Component } from '@angular/core';
import { MotelService } from 'src/app/services/motel.service';
import { Router } from '@angular/router';
import { SearchFilterPipe } from 'src/app/pipe/search-filter.pipe';

@Component({
  selector: 'app-motels',
  templateUrl: './motels.component.html',
  styleUrls: ['./motels.component.css'],
})
export class MotelsComponent {
  originalListMotels: any[] = [];
  listMotels: any[] = [];
  inputSearch: string = '';
  page:number = 1;
  searchText= '';
  constructor(private motelService: MotelService, private route: Router) {}

  ngOnInit(): void {
    this.motelService.getAllMotels().subscribe((data) => {
      this.originalListMotels = data;
      this.listMotels = [...this.originalListMotels]; // Tạo một bản sao của danh sách ban đầu
    });
  }

  redirectToAddMotel() {
    this.route.navigate(['/manager/admin/motels/add-motel']);
  }

  redirectToUpdateMotel(id: string, i: number) {
    this.route.navigate(['/manager/admin/motels/update-motel', id]);
  }

  onDeleteMotel(motelId: string, index: number): void {
    // Hiển thị xác nhận xóa (nếu cần)
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa nhà trọ này?');

    if (confirmDelete) {
      // Gọi service để xóa nhà trọ từ CSDL
      this.motelService.deleteMotel(motelId).subscribe(
        (response) => {
          console.log('Motel deleted successfully:', response);
          // Xóa nhà trọ khỏi listMotels khi xóa thành công
          this.listMotels.splice(index, 1);
        },
        (error) => {
          console.error('Error deleting motel:', error);
          // Xử lý lỗi, hiển thị thông báo hoặc làm gì đó khác
        }
      );
    }
  }

  // search(): any {
  //   const keySearch: string = this.inputSearch.trim();

  //   if (keySearch === '') {
  //     // Nếu trường tìm kiếm trống, hiển thị toàn bộ danh sách
  //     this.listMotels = [...this.originalListMotels];
  //     return;
  //   }

  //   let resultFilter: any[] = [];
  //   let result = 0;

  //   if (keySearch.includes('p-')) {
  //     result = 1;
  //   } else if (keySearch.includes('sv-')) {
  //     result = 2;
  //   }

  //   console.log(result);

  //   switch (result) {
  //     case 0:
  //       resultFilter = this.originalListMotels.filter((item: any) =>
  //         item.DiaChi.toLowerCase()
  //           .trim()
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .includes(keySearch.toLowerCase().trim())
  //       );
  //       break;
  //     case 1:
  //       const priceValue = parseInt(keySearch.replace('p-', ''), 10); // Chuyển đổi chuỗi thành số
  //       if (!isNaN(priceValue)) {
  //         // Nếu là một số hợp lệ, thực hiện bộ lọc
  //         resultFilter = this.originalListMotels.filter(
  //           (item: any) => item.GiaThue <= priceValue
  //         );
  //       } else {
  //         // Nếu không phải là một số hợp lệ, không thực hiện bộ lọc và giữ nguyên danh sách
  //         resultFilter = this.originalListMotels;
  //       }
  //       break;
  //     case 2:
  //       resultFilter = this.originalListMotels.filter((item: any) =>
  //         item.PhuongXa.toLowerCase()
  //           .trim()
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .includes(keySearch.replace('sv-', '').toLowerCase().trim())
  //       );
  //       break;
  //     default:
  //       return null;
  //   }

  //   // Hiển thị danh sách đã lọc mà không làm thay đổi listMotels gốc
  //   this.listMotels = resultFilter;
  // }
}

import { Component } from '@angular/core';
import { MotelService } from 'src/app/services/motel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  listMotels: any;
  listSV: any;
  listSVUnrefined: string[] = [];
  constructor(private motelService: MotelService) {}

  ngOnInit() {
    this.motelService.getAllMotels().subscribe((data) => {
      this.listMotels = data;
      data.forEach((sv) => {
        this.listSVUnrefined.push(sv.PhuongXa.toString());
      });
      console.log(this.listSVUnrefined);

      // Loại bỏ những phường xã bị trùng bằng Set
      this.listSV = this.countDuplicateElements(this.listSVUnrefined);
      console.log(this.listSV);
    });
  }

  countDuplicateElements(list: string[]): { name: string; count: number }[] {
    const counts: { [name: string]: number } = {};
    // Đếm số lần xuất hiện của từng phần tử trong mảng
    list.forEach((element) => {
      counts[element] = (counts[element] || 0) + 1;
    });

    // Chuyển đổi counts thành mảng các đối tượng
    const result: { name: string; count: number }[] = [];
    for (const name in counts) {
      if (counts.hasOwnProperty(name)) {
        result.push({ name, count: counts[name] });
      }
    }
    return result;
  }
}

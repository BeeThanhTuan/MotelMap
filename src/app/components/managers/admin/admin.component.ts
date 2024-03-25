import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private router: Router, private authService: AuthService) {}
  signOut(): void {
    this.authService.removeTokenCookie();
    alert('Đăng xuất thành công.');
    this.router.navigate(['/home']);
  }
}

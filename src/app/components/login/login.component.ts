import { Component ,OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void {
    let isLogin = this.authService.isUserLoggedIn();
    console.log(isLogin);
    if(isLogin === false){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/manager/admin/dashboard']);
      alert('Bạn đã đăng nhập.');
    }
  }


  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Token:', response.token);
        // Lưu token vào cookie
        this.authService.setTokenCookie(response.token);
        alert('Đăng nhập thanh công.');
        this.router.navigate(['/manager/admin/dashboard']);
      },
      (error) => {
        console.error('Error:', error);
        alert(`Lỗi đăng nhập!!! 
Làm ơn kiểm tra lại tài khoản và mật khẩu.`);
      }
    );
  }
}

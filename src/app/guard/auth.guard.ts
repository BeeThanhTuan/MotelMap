import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

// guard kiểm soát việc người dùng có quyền truy cập vào một route hay không
@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      alert('Vui lòng đăng nhập!!!');
      return false;
    }
  }
};

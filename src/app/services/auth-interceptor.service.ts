import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

//  trước khi mỗi HTTP request được gửi đi.
//  Mục đích chính của interceptor này là thêm token xác thực vào header của mỗi request,
//  giúp chuyển thông tin xác thực từ phía frontend (Angular) đến phía backend (Express API).

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getTokenCookie();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}

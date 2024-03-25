import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private REST_API_SERVER = 'http://localhost:3000';
  private readonly TOKEN_KEY = 'your-secret-key';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  public login(credentials: {username: string;password: string;}): Observable<any> {
    const url = `${this.REST_API_SERVER}/auth/login`;
    return this.httpClient.post(url, credentials, this.httpOptions);
  }

  public getAllAccounts(): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/accounts`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getTokenCookie(): string | null {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  setTokenCookie(token: string): void {
    this.cookieService.set(this.TOKEN_KEY, token, { expires: 1, path: '/' });
  }

  removeTokenCookie(): void {
    this.cookieService.delete(this.TOKEN_KEY, '/');
  }

  // kiểm tra đăng nhập hay chưa
  isAuthenticated(): boolean {
    const token = this.getTokenCookie();
    // Kiểm tra xem token có tồn tại hay không
    return !!token;
  }

  isUserLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}

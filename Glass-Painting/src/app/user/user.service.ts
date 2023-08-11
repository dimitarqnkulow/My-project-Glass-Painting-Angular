import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string = '';
  private userId: string = '';
  private email: string = '';
  private authenticated$$ = new Subject<boolean>();
  private isAuthenticated = false;
  private logoutTimer: any;
  apiError$ = this.errorService.apiError$$.asObservable();
  errorMsg = '';

  get errorMessage(): any {
    return this.errorMsg;
  }
  getAuthenticated() {
    return this.authenticated$$.asObservable();
  }
  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  getToken() {
    return this.token;
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private errorService: ErrorService
  ) {}
  register(email: string, password: string, repeatPassword: string) {
    const { apiURL } = environment;
    return this.http
      .post<User>(`${apiURL}/users/register`, {
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      })
      .subscribe({
        next: (res) => {
          this.errorMsg = '';
          this.login(res.email, password);
        },
        error: (res) => {
          this.apiError$.subscribe((err: any) => {
            this.errorMsg = err.message;
          });
        },
      });
  }

  login(email: string, password: string) {
    const { apiURL } = environment;

    return this.http
      .post<{
        token: string;
        userId: string;
        email: string;
        expiresIn: number;
      }>(`${apiURL}/users/login`, {
        email: email,
        password: password,
      })
      .subscribe({
        next: (res) => {
          this.token = res.token;
          this.userId = res.userId;
          this.email = res.email;

          if (this.token) {
            this.authenticated$$.next(true);
            this.isAuthenticated = true;
            this.logoutTimer = setTimeout(() => {
              this.logout();
            }, res.expiresIn * 1000);
          }
          this.storeUser(this.token, this.userId, this.email);
          this.router.navigate(['/home']);
        },
        error: (res) => {
          this.apiError$.subscribe((err: any) => {
            this.errorMsg = err.message;
          });
        },
      });
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authenticated$$.next(false);
    this.clearUser();
    this.router.navigate(['/home']);
    clearTimeout(this.logoutTimer);
  }

  storeUser(token: string, userId: string, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('email', email);
  }

  clearUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
  }

  getUserData() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (!token) {
      return;
    }

    return { token: token, email: email };
  }

  authenticateFromLocalStorage() {
    const localStorageData = this.getUserData();

    if (localStorageData) {
      this.token = localStorageData.token;
      this.isAuthenticated = true;
      this.authenticated$$.next(true);
    }
  }
}

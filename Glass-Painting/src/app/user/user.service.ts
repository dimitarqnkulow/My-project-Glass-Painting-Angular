import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string = '';
  private authenticated$$ = new Subject<boolean>();
  private isAuthenticated = false;

  getAuthenticated() {
    return this.authenticated$$.asObservable();
  }
  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  getToken() {
    return this.token;
  }
  constructor(private http: HttpClient, private router: Router) {}
  register(email: string, password: string, repeatPassword: string) {
    const { apiURL } = environment;
    return this.http
      .post<User>(`${apiURL}/users/register`, {
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  login(email: string, password: string) {
    const { apiURL } = environment;

    return this.http
      .post<{ token: string }>(`${apiURL}/users/login`, {
        email: email,
        password: password,
      })
      .subscribe((res) => {
        this.token = res.token;
        if (this.token) {
          this.authenticated$$.next(true);
          this.isAuthenticated = true;
        }
        this.storeUser(this.token);
        this.router.navigate(['/home']);
      });
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authenticated$$.next(false);
    this.clearUser();
    this.router.navigate(['/home']);
  }

  storeUser(token: string) {
    localStorage.setItem('token', token);
  }

  clearUser() {
    localStorage.removeItem('token');
  }

  getUserData() {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    return { token: token };
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

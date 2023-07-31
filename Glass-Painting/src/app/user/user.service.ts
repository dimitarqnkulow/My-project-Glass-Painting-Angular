import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
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
        this.router.navigate(['/home']);
      });
  }
}

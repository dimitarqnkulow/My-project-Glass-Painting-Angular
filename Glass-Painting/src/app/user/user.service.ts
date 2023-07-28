import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string, repeatPassword: string) {
    const { apiURL } = environment;
    return this.http.post<User>(`${apiURL}/users/register`, {
      email,
      password,
      repeatPassword,
    });
  }
}

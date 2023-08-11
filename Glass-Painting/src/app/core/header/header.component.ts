import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  authenticationSub: Subscription | undefined;
  userAuthenticated = false;

  get email(): any {
    return localStorage.getItem('email');
  }

  ngOnDestroy(): void {
    this.authenticationSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.userAuthenticated = this.userService.getIsAuthenticated();
    this.authenticationSub = this.userService
      .getAuthenticated()
      .subscribe((status) => {
        this.userAuthenticated = status;
      });
  }

  logout() {
    this.userService.logout();
  }
}

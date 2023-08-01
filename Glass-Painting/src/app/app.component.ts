import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Glass-Painting';
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.authenticateFromLocalStorage();
  }
}

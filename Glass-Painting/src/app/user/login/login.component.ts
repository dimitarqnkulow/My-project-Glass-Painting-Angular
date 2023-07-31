import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, appEmailValidator()]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  login(): void {
    if (this.form.invalid) {
      return;
    }
    const { email, password } = this.form.value;

    this.userService.login(email!, password!);
  }
}

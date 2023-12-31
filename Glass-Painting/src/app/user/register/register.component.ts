import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordsValidator } from 'src/app/shared/validators/password-validator';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { ErrorService } from 'src/app/shared/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  apiError$ = this.errorService.apiError$$.asObservable();
  errorMsg = '';
  form = this.fb.group({
    email: ['', [Validators.required, appEmailValidator()]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validators: [passwordsValidator('password', 'repeatPassword')],
      }
    ),
  });
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private errorService: ErrorService
  ) {}
  register(): void {
    if (this.form.invalid) {
      return;
    }
    this.apiError$.subscribe((data: any) => {
      this.errorMsg = data;
    });
    const { email, passGroup: { password, repeatPassword } = {} } =
      this.form.value;
    this.userService.register(email!, password!, repeatPassword!);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { nameValidator } from 'src/app/shared/validators/name-validator';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-number-validator';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.css'],
})
export class MakeComponent {
  form = this.fb.group({
    name: ['', [Validators.required, nameValidator()]],
    sureName: ['', [Validators.required]],
    phone: [
      '',
      [Validators.required, phoneNumberValidator(), Validators.minLength(10)],
    ],
    description: ['', [Validators.required, Validators.minLength(15)]],
  });
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  order() {
    if (this.form.invalid) {
      return;
    }
    const { name, sureName, phone, description } = this.form.value;

    this.apiService.orderArticle(name!, sureName!, phone!, description!);

    this.router.navigate(['/home']);
  }
}

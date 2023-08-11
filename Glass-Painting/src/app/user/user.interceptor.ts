import {
  HTTP_INTERCEPTORS,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { UserService } from './user.service';
import { Injectable, Provider } from '@angular/core';
import { ErrorService } from '../shared/error.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.userService.getToken();

    if (!token) {
      return next.handle(req).pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          } else {
            this.errorService.setError(err.error.message);
          }
          return [err];
        })
      );
    }

    const userRequest = req.clone({
      headers: req.headers.set('Authorization', token),
    });
    return next.handle(userRequest);
  }
}

export const userInterceptorProvider: Provider = {
  multi: true,
  useClass: UserInterceptor,
  provide: HTTP_INTERCEPTORS,
};

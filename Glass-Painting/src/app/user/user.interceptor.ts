import {
  HTTP_INTERCEPTORS,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { UserService } from './user.service';
import { Injectable, Provider } from '@angular/core';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.userService.getToken();

    if (!token) {
      return next.handle(req);
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

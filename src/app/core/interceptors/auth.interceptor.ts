import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const cookieService = inject(CookieService);

  const token = cookieService.get('token');

  if (token) {
    const clonedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(clonedReq);
  } else {
    return next(request);
  }
};

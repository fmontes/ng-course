import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';

export const isUserLoginGuard: CanActivateFn = (): Observable<boolean> => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (!!cookieService.get('token') && !!cookieService.get('userId')) {
    return of(true);
  }

  cookieService.delete('token');
  cookieService.delete('userId');

  router.navigate(['/login']);

  return of(false);
};

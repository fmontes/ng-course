import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsersResponse } from '../types/pocketbase-types';
import { CookieService } from 'ngx-cookie-service';

export const profileGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  const router = inject(Router);
  const username: string = route.params['username'];
  const userService = inject(UserService);
  const cookieService = inject(CookieService);

  if (!cookieService.get('token') || !cookieService.get('userId')) {
    cookieService.delete('token');
    cookieService.delete('userId');

    router.navigate(['login']);
    return of(false);
  }

  return userService.getByUsername(username).pipe(
    map((user: UsersResponse) => {
      if (user.id === cookieService.get('userId')) {
        return true;
      }

      router.navigate(['profile-not-found']);
      return false;
    })
  );
};

// if (!!cookieService.get('token') && !!cookieService.get('userId')) {
//   return of(true);
// }

// cookieService.delete('token');
// cookieService.delete('userId');

// router.navigate(['/login']);

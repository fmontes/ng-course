import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const profileGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  const router = inject(Router);
  const username: string = route.params['username'];
  const userService = inject(UserService);

  return userService.getByUsername(username).pipe(
    map((user) => {
      if (!!user) {
        return true;
      }

      router.navigate(['profile-not-found']);
      return false;
    })
  );
};

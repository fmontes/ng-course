import { CanActivateFn, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';

export const isUserLoginGuard: CanActivateFn = (): Observable<boolean> => {
  return of(true)

  // return authState$.pipe(
  //   map((user) => {
  //     if (user) {
  //       return true;
  //     }
  //     router.navigate(['/login']);
  //     return false;
  //   })
  // );
};

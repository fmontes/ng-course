import { CanActivateFn, Router } from '@angular/router';
import { Observable, from, map, of, switchMap } from 'rxjs';

export const haveUsernameGuard: CanActivateFn = (): Observable<boolean> => {
  return of(true)

  // return authState$.pipe(
  //   switchMap((authUser) => {
  //     if (authUser) {
  //       console.log(authUser.uid);

  //       const docRef = doc(firestore, 'users', authUser.uid);
  //       const userInfo$ = from(getDoc(docRef));

  //       return userInfo$.pipe(
  //         map((userInfo) => {
  //           if (userInfo.exists()) {
  //             console.log('user exists');
  //             return true;
  //           } else {
  //             router.navigate(['/set-username'], {
  //               queryParams: { userId: authUser.uid },
  //             });
  //             return false;
  //           }
  //         })
  //       );
  //     }

  //     router.navigate(['/login']);
  //     return of(false);
  //   })
};

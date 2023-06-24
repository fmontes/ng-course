import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const registerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (route.queryParams['username']) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

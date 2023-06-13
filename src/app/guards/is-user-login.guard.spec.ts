import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isUserLoginGuard } from './is-user-login.guard';

describe('isUserLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isUserLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

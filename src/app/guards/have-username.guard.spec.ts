import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { haveUsernameGuard } from './have-username.guard';

describe('haveUsernameGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => haveUsernameGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userFormGuard } from './user-form.guard';

describe('userFormGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userFormGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

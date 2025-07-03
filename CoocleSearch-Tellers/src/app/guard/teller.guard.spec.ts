import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tellerGuard } from './teller.guard';

describe('tellerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tellerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

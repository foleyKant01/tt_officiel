import { TestBed } from '@angular/core/testing';

import { AdvertissementService } from './advertissement.service';

describe('AdvertissementService', () => {
  let service: AdvertissementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertissementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

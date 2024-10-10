import { TestBed } from '@angular/core/testing';

import { MessageModeService } from './message-mode.service';

describe('MessageModeService', () => {
  let service: MessageModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

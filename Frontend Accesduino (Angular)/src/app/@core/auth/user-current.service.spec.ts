import { TestBed } from '@angular/core/testing';

import { UserCurrentService } from './user-current.service';

describe('UserCurrentService', () => {
  let service: UserCurrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCurrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

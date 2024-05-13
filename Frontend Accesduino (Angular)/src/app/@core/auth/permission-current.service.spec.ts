import { TestBed } from '@angular/core/testing';

import { PermissionCurrentService } from './permission-current.service';

describe('PermissionCurrentService', () => {
  let service: PermissionCurrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionCurrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

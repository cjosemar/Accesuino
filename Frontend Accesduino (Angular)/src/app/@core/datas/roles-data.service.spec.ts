import { TestBed } from '@angular/core/testing';

import { RolesDataService } from './roles-data.service';

describe('RolesDataService', () => {
  let service: RolesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

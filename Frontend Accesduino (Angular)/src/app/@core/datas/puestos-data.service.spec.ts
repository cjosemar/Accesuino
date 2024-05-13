import { TestBed } from '@angular/core/testing';

import { PuestosDataService } from './puestos-data.service';

describe('PuestosDataService', () => {
  let service: PuestosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuestosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

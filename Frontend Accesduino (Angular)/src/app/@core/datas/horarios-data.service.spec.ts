import { TestBed } from '@angular/core/testing';

import { HorariosDataService } from './horarios-data.service';

describe('HorariosDataService', () => {
  let service: HorariosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

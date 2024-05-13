import { TestBed } from '@angular/core/testing';

import { EmpleadosDataService } from './empleados-data.service';

describe('EmpleadosDataService', () => {
  let service: EmpleadosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

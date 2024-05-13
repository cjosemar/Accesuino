import { TestBed } from '@angular/core/testing';

import { PermisosDataService } from './permisos-data.service';

describe('PermisosDataService', () => {
  let service: PermisosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

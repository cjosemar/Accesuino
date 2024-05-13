import { TestBed } from '@angular/core/testing';

import { TiposPermisoDataService } from './tipos-permiso-data.service';

describe('TiposPermisoDataService', () => {
  let service: TiposPermisoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposPermisoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DatosEmpresaDataService } from './datos-empresa-data.service';

describe('DatosEmpresaDataService', () => {
  let service: DatosEmpresaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosEmpresaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

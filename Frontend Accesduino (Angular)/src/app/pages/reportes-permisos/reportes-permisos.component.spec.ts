import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPermisosComponent } from './reportes-permisos.component';

describe('ReportesPermisosComponent', () => {
  let component: ReportesPermisosComponent;
  let fixture: ComponentFixture<ReportesPermisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesPermisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

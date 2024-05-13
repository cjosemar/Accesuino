import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesEmpleadosComponent } from './reportes-empleados.component';

describe('ReportesEmpleadosComponent', () => {
  let component: ReportesEmpleadosComponent;
  let fixture: ComponentFixture<ReportesEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

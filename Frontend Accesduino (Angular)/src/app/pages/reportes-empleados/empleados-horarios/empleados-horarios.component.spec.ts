import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosHorariosComponent } from './empleados-horarios.component';

describe('EmpleadosHorariosComponent', () => {
  let component: EmpleadosHorariosComponent;
  let fixture: ComponentFixture<EmpleadosHorariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosHorariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

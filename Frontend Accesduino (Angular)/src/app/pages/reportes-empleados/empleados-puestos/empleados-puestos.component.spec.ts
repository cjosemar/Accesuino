import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosPuestosComponent } from './empleados-puestos.component';

describe('EmpleadosPuestosComponent', () => {
  let component: EmpleadosPuestosComponent;
  let fixture: ComponentFixture<EmpleadosPuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosPuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosPuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

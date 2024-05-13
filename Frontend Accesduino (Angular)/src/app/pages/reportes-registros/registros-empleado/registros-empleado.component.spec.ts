import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosEmpleadoComponent } from './registros-empleado.component';

describe('RegistrosEmpleadoComponent', () => {
  let component: RegistrosEmpleadoComponent;
  let fixture: ComponentFixture<RegistrosEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrosEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosMesComponent } from './permisos-mes.component';

describe('PermisosMesComponent', () => {
  let component: PermisosMesComponent;
  let fixture: ComponentFixture<PermisosMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

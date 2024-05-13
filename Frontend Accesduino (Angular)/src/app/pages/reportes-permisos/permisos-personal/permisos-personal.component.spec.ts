import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosPersonalComponent } from './permisos-personal.component';

describe('PermisosPersonalComponent', () => {
  let component: PermisosPersonalComponent;
  let fixture: ComponentFixture<PermisosPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

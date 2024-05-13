import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosAdminComponent } from './permisos-admin.component';

describe('PermisosAdminComponent', () => {
  let component: PermisosAdminComponent;
  let fixture: ComponentFixture<PermisosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

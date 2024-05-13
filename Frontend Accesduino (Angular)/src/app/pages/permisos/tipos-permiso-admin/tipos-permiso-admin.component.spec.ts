import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPermisoAdminComponent } from './tipos-permiso-admin.component';

describe('TiposPermisoAdminComponent', () => {
  let component: TiposPermisoAdminComponent;
  let fixture: ComponentFixture<TiposPermisoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposPermisoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposPermisoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

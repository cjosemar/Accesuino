import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoPermisoComponent } from './edit-tipo-permiso.component';

describe('EditTipoPermisoComponent', () => {
  let component: EditTipoPermisoComponent;
  let fixture: ComponentFixture<EditTipoPermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTipoPermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipoPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

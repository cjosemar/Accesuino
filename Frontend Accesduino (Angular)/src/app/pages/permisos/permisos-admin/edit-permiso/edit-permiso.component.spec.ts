import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermisoComponent } from './edit-permiso.component';

describe('EditPermisoComponent', () => {
  let component: EditPermisoComponent;
  let fixture: ComponentFixture<EditPermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

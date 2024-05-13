import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPuestoComponent } from './edit-puesto.component';

describe('EditPuestoComponent', () => {
  let component: EditPuestoComponent;
  let fixture: ComponentFixture<EditPuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

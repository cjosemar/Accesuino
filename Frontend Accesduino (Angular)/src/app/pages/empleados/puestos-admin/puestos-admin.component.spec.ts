import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosAdminComponent } from './puestos-admin.component';

describe('PuestosAdminComponent', () => {
  let component: PuestosAdminComponent;
  let fixture: ComponentFixture<PuestosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuestosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

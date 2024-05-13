import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaGestionComponent } from './ayuda-gestion.component';

describe('AyudaGestionComponent', () => {
  let component: AyudaGestionComponent;
  let fixture: ComponentFixture<AyudaGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyudaGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

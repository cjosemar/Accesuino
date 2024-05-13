import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaRegistroComponent } from './ayuda-registro.component';

describe('AyudaRegistroComponent', () => {
  let component: AyudaRegistroComponent;
  let fixture: ComponentFixture<AyudaRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyudaRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

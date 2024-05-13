import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosModComponent } from './registros-mod.component';

describe('RegistrosModComponent', () => {
  let component: RegistrosModComponent;
  let fixture: ComponentFixture<RegistrosModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrosModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosListComponent } from './registros-list.component';

describe('RegistrosListComponent', () => {
  let component: RegistrosListComponent;
  let fixture: ComponentFixture<RegistrosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

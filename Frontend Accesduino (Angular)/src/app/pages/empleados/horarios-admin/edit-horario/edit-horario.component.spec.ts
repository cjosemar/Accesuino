import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHorarioComponent } from './edit-horario.component';

describe('EditHorarioComponent', () => {
  let component: EditHorarioComponent;
  let fixture: ComponentFixture<EditHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

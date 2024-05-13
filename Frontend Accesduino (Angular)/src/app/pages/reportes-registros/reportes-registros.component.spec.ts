import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesRegistrosComponent } from './reportes-registros.component';

describe('ReportesRegistrosComponent', () => {
  let component: ReportesRegistrosComponent;
  let fixture: ComponentFixture<ReportesRegistrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesRegistrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

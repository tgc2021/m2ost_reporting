import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTopperReportComponent } from './monthly-topper-report.component';

describe('MonthlyTopperReportComponent', () => {
  let component: MonthlyTopperReportComponent;
  let fixture: ComponentFixture<MonthlyTopperReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyTopperReportComponent]
    });
    fixture = TestBed.createComponent(MonthlyTopperReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

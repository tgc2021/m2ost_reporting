import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentScoreReportComponent } from './assessment-score-report.component';

describe('AssessmentScoreReportComponent', () => {
  let component: AssessmentScoreReportComponent;
  let fixture: ComponentFixture<AssessmentScoreReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentScoreReportComponent]
    });
    fixture = TestBed.createComponent(AssessmentScoreReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

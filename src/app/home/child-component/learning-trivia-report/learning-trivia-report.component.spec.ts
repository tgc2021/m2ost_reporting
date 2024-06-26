import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningTriviaReportComponent } from './learning-trivia-report.component';

describe('LearningTriviaReportComponent', () => {
  let component: LearningTriviaReportComponent;
  let fixture: ComponentFixture<LearningTriviaReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningTriviaReportComponent]
    });
    fixture = TestBed.createComponent(LearningTriviaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCompletionReportComponent } from './course-completion-report.component';

describe('CourseCompletionReportComponent', () => {
  let component: CourseCompletionReportComponent;
  let fixture: ComponentFixture<CourseCompletionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseCompletionReportComponent]
    });
    fixture = TestBed.createComponent(CourseCompletionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

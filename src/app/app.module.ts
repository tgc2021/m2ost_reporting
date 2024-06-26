import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginReportComponent } from './home/child-component/login-report/login-report.component';
import { CourseCompletionReportComponent } from './home/child-component/course-completion-report/course-completion-report.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MonthlyTopperReportComponent } from './home/child-component/monthly-topper-report/monthly-topper-report.component';

import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LearningTriviaReportComponent } from './home/child-component/learning-trivia-report/learning-trivia-report.component';
import { AssessmentScoreReportComponent } from './home/child-component/assessment-score-report/assessment-score-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginReportComponent,
    CourseCompletionReportComponent,
    MonthlyTopperReportComponent,
    LearningTriviaReportComponent,
    AssessmentScoreReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    // MatIconModule,
    // MatButtonModule,
    // MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    // MatButtonModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule
  ],
  providers: [DatePipe,NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }

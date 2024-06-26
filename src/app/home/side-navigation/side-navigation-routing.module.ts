import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavigationComponent } from './side-navigation.component';
import { LoginReportComponent } from '../child-component/login-report/login-report.component';
import { CourseCompletionReportComponent } from '../child-component/course-completion-report/course-completion-report.component';
import { MonthlyTopperReportComponent } from '../child-component/monthly-topper-report/monthly-topper-report.component';
import { LearningTriviaReportComponent } from '../child-component/learning-trivia-report/learning-trivia-report.component';
import { AssessmentScoreReportComponent } from '../child-component/assessment-score-report/assessment-score-report.component';

const routes: Routes = [{ path: '', component: SideNavigationComponent ,
children:[
  {path:'login-report',component:LoginReportComponent},
  {path:'course-completion-report',component:CourseCompletionReportComponent},
  {path:'learning-trivia-report',component:LearningTriviaReportComponent},
  {path:'assessment-trivia-report',component:AssessmentScoreReportComponent},
  {path:'monthly-topper-report',component:MonthlyTopperReportComponent},


]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideNavigationRoutingModule { }

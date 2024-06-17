import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavigationComponent } from './side-navigation.component';

const routes: Routes = [{ path: '', component: SideNavigationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideNavigationRoutingModule { }

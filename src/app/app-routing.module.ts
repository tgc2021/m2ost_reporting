import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'',redirectTo:'login',pathMatch:"full"},
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./home/side-navigation/side-navigation.module').then(m => m.SideNavigationModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}], // Use the HashLocationStrategy
  exports: [RouterModule]
})
export class AppRoutingModule { }

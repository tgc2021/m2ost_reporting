import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationRoutingModule } from './side-navigation-routing.module';
import { SideNavigationComponent } from './side-navigation.component';


@NgModule({
  declarations: [
    SideNavigationComponent
  ],
  imports: [
    CommonModule,
    SideNavigationRoutingModule
  ]
})
export class SideNavigationModule { }

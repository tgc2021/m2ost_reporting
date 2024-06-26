import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationRoutingModule } from './side-navigation-routing.module';
import { SideNavigationComponent } from './side-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SideNavigationComponent
  ],
  imports: [
    CommonModule,
    SideNavigationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SideNavigationModule { }

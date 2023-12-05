import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeDashComponent } from './components/home-dash/home-dash.component';


@NgModule({
  declarations: [
    AdminComponent,
    HomeDashComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeDashComponent } from './components/home-dash/home-dash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectItemDirective } from './directives/select-item.directive';


@NgModule({
  declarations: [
    AdminComponent,
    HomeDashComponent,
    SelectItemDirective,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

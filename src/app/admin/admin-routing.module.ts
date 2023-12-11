import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from '../models/gards/admin.guard';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  {path:"admin", component:AdminComponent,children:[
    {path:"",component:AdminComponent,canActivate:[AdminGuard]},
    {path:"home",component:AdminComponent,canActivate:[AdminGuard]},
    {path:"**",component:HomeComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

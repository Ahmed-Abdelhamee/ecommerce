import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenClothesComponent } from './components/men-clothes/men-clothes.component';
import { AccessoiesComponent } from './components/accessoies/accessoies.component';
import { BagsComponent } from './components/bags/bags.component';
import { WomenWatchesComponent } from './components/women-watches/women-watches.component';
import { MenWatchesComponent } from './components/men-watches/men-watches.component';
import { WomenShoesComponent } from './components/women-shoes/women-shoes.component';
import { MenShoesComponent } from './components/men-shoes/men-shoes.component';
import { WomenClothesComponent } from './components/women-clothes/women-clothes.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DashloginComponent } from './components/dashlogin/dashlogin.component';
// import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"men-clothes",component:MenClothesComponent},
  {path:"women-clothes",component:WomenClothesComponent},
  {path:"men-shoes",component:MenShoesComponent},
  {path:"women-shoes",component:WomenShoesComponent},
  {path:"men-watches",component:MenWatchesComponent},
  {path:"women-watches",component:WomenWatchesComponent},
  {path:"bags",component:BagsComponent},
  {path:"accessoires",component:AccessoiesComponent},
  {path:"contact-us",component:ContactUsComponent},
  {path:"admin-login-dash",component:DashloginComponent},

  // {path:"admin",component:AdminComponent},  // this admin route link  is working fine
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:"enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

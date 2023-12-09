import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LtrDirective } from './models/directives/ltr.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MenClothesComponent } from './components/men-clothes/men-clothes.component';
import { MycurrencyPipe } from './models/pipes/mycurrency.pipe';
import { WomenClothesComponent } from './components/women-clothes/women-clothes.component';
import { WomenShoesComponent } from './components/women-shoes/women-shoes.component';
import { MenShoesComponent } from './components/men-shoes/men-shoes.component';
import { MenWatchesComponent } from './components/men-watches/men-watches.component';
import { WomenWatchesComponent } from './components/women-watches/women-watches.component';
import { BagsComponent } from './components/bags/bags.component';
import { AccessoiesComponent } from './components/accessoies/accessoies.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DashloginComponent } from './components/dashlogin/dashlogin.component';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {HttpClientModule} from "@angular/common/http"
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat'// write this special code for upload img 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LtrDirective,
    MenClothesComponent,
    MycurrencyPipe,
    WomenClothesComponent,
    WomenShoesComponent,
    MenShoesComponent,
    MenWatchesComponent,
    WomenWatchesComponent,
    BagsComponent,
    AccessoiesComponent,
    ContactUsComponent,
    DashloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AdminModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)), provideDatabase(() => getDatabase()), provideStorage(() => getStorage()), // ToastrModule added
    HttpClientModule
  ],
  providers: [
    // write this special code for upload img 
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {provide : LocationStrategy , useClass : HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

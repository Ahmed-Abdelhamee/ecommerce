import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';
  faWhatsapp=faWhatsapp;

  showHeader:boolean=true;

  constructor(private route:Router){
    route.events.subscribe(val =>{
      if(val instanceof NavigationEnd){
        if(val.url.includes("admin") || val.url.endsWith("ecommerce-login-dash-2023#")){
          this.showHeader=false;
        }else{
          this.showHeader=true;
        }
      }
    })
  }

  

}

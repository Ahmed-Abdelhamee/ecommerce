import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { DataService } from './models/services/data.service';
import { social } from './models/interfaces/social.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';
  faWhatsapp=faWhatsapp;
  showHeader:boolean=true;
  whatsapp:social[]=[];

  constructor(private route:Router, private dataServ:DataService){
    route.events.subscribe(val =>{
      if(val instanceof NavigationEnd){
        if((val.url.includes("admin") && sessionStorage.getItem("Admin") == "you is admin") || val.url.endsWith("ecommerce-login-dash-2023#")){
          this.showHeader=false;
        }else{
          this.showHeader=true;
        }
      }
    })
    // ----------------------- get whatsapp -----------------------
    this.whatsapp=dataServ.returnSoical("whatsapp");

  }

  

}

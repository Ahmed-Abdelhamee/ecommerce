import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { DataService } from './models/services/data.service';
import { whatsapp } from './models/interfaces/whatsapp.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';
  faWhatsapp=faWhatsapp;
  showHeader:boolean=true;
  whatsapp:whatsapp[]=[];

  constructor(private route:Router, private dataServ:DataService){
    route.events.subscribe(val =>{
      if(val instanceof NavigationEnd){
        if(val.url.includes("admin") || val.url.endsWith("ecommerce-login-dash-2023#")){
          this.showHeader=false;
        }else{
          this.showHeader=true;
        }
      }
    })
    // ----------------------- get whatsapp -----------------------
    dataServ.getWhatsapp().subscribe(data=>{
      for (const key in data) {
        this.whatsapp.push(data[key]);
      }
      
    })
  }

  

}

import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { social } from 'src/app/models/interfaces/social.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-women-shoes',
  templateUrl: './women-shoes.component.html',
  styleUrls: ['./women-shoes.component.scss']
})
export class WomenShoesComponent implements OnInit {

  productsList:product[]=[];

  whatsapp:social[]=[];

  constructor(private dataServ:DataService) { 
    if(sessionStorage.getItem("page-Loaded")!="women-shoes"){
      sessionStorage.setItem("page-Loaded","women-shoes")
      window.location.reload()
    }
    // this.productsList=dataServ.getProducts("women-shoes");
    dataServ.getDataAPI("women-shoes").subscribe(data=>{
      for (const key in data) {
        this.productsList.push(data[key]);
      }
      this.productsList.reverse() // we put this code here to set the reverse after loading the product So as not to neglect  
    })
    // get whatsapp
    this.whatsapp=dataServ.returnSoical("whatsapp");
  }
  
  ngOnInit(): void {
  }

}

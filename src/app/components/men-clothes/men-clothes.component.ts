import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { social } from 'src/app/models/interfaces/social.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-men-clothes',
  templateUrl: './men-clothes.component.html',
  styleUrls: ['./men-clothes.component.scss']
})
export class MenClothesComponent implements OnInit {

  productsList:product[]=[]

  whatsapp:social[]=[];

  constructor(private dataServ:DataService) { 
    if(sessionStorage.getItem("page-Loaded")!="men-clothes"){
      sessionStorage.setItem("page-Loaded","men-clothes")
      window.location.reload()
    }
    // this.productsList=dataServ.getProducts("men-clothes");
    dataServ.getDataAPI("men-clothes").subscribe(data=>{
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

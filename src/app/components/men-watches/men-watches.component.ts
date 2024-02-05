import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { social } from 'src/app/models/interfaces/social.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-men-watches',
  templateUrl: './men-watches.component.html',
  styleUrls: ['./men-watches.component.scss']
})
export class MenWatchesComponent implements OnInit {

  productsList:product[]=[]

  whatsapp:social[]=[];
  
  constructor(private dataServ:DataService) { 
    if(sessionStorage.getItem("page-Loaded")!="men-watches"){
      sessionStorage.setItem("page-Loaded","men-watches")
      window.location.reload()
    }
    // this.productsList=dataServ.getProducts("men-watches");
    dataServ.getDataAPI("men-watches").subscribe(data=>{
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

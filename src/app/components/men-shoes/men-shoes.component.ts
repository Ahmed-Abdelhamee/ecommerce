import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { social } from 'src/app/models/interfaces/social.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-men-shoes',
  templateUrl: './men-shoes.component.html',
  styleUrls: ['./men-shoes.component.scss']
})
export class MenShoesComponent implements OnInit {
  
  productsList:product[]=[]

  whatsapp:social[]=[];

  constructor(private dataServ:DataService) { 
    this.productsList=dataServ.getProducts("men-shoes");
    // get whatsapp
    this.whatsapp=dataServ.returnSoical("whatsapp");
  }
  ngOnInit(): void {
  }

}

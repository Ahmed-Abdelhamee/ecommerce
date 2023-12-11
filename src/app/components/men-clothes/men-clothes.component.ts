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
    this.productsList=dataServ.getProducts("men-clothes");
    // get whatsapp
    this.whatsapp=dataServ.returnSoical("whatsapp");
  }

  ngOnInit(): void {
  }

}

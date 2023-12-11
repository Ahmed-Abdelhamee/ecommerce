import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { social } from 'src/app/models/interfaces/social.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-bags',
  templateUrl: './bags.component.html',
  styleUrls: ['./bags.component.scss']
})
export class BagsComponent implements OnInit {

  productsList:product[]=[]

  whatsapp:social[];

  constructor(private dataServ:DataService) { 
    this.productsList=dataServ.getProducts("bags");
    // get whatsapp
    this.whatsapp=dataServ.returnSoical("whatsapp");
  }

  ngOnInit(): void {
  }

}

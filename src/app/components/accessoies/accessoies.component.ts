import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { social } from 'src/app/models/interfaces/social.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-accessoies',
  templateUrl: './accessoies.component.html',
  styleUrls: ['./accessoies.component.scss']
})
export class AccessoiesComponent implements OnInit {
  
  productsList:product[]=[];

  whatsapp:social[]=[];

  constructor(private dataServ:DataService) { 
    this.productsList=dataServ.getProducts("accessoires");
    // get whatsapp
    this.whatsapp=dataServ.returnSoical("whatsapp");
  }

  ngOnInit(): void {
  }

}

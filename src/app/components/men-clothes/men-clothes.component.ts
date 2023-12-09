import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { whatsapp } from 'src/app/models/interfaces/whatsapp.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-men-clothes',
  templateUrl: './men-clothes.component.html',
  styleUrls: ['./men-clothes.component.scss']
})
export class MenClothesComponent implements OnInit {

  productsList:product[]=[]

  whatsapp:whatsapp[]=[];

  constructor(private dataServ:DataService) { 
    dataServ.getData('men-clothes').subscribe(data => {
      for(let key in data)
      this.productsList.push(data[key])
    })
    // get whatsapp
    dataServ.getWhatsapp().subscribe(data=>{
      for (const key in data) {
        this.whatsapp.push(data[key]);
      }
    })
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-men-shoes',
  templateUrl: './men-shoes.component.html',
  styleUrls: ['./men-shoes.component.scss']
})
export class MenShoesComponent implements OnInit {
  
  productsList:product[]=[]

  constructor(private dataServ:DataService) { 
    dataServ.getData('men-shoes').subscribe(data => {
      for(let key in data)
      this.productsList.push(data[key])
    })
  }
  ngOnInit(): void {
  }

}

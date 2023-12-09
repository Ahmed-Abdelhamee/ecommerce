import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-women-shoes',
  templateUrl: './women-shoes.component.html',
  styleUrls: ['./women-shoes.component.scss']
})
export class WomenShoesComponent implements OnInit {

  productsList:product[]=[]

  constructor(private dataServ:DataService) { 
    dataServ.getData('women-shoes').subscribe(data => {
      for(let key in data)
      this.productsList.push(data[key])
    })
  }
  
  ngOnInit(): void {
  }

}

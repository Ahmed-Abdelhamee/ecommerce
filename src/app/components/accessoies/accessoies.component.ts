import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-accessoies',
  templateUrl: './accessoies.component.html',
  styleUrls: ['./accessoies.component.scss']
})
export class AccessoiesComponent implements OnInit {
  
  productsList:product[]=[]

  constructor(private dataServ:DataService) { 
    dataServ.getData('accessoiries').subscribe(data => {
      for(let key in data)
      this.productsList.push(data[key])
    })
  }

  ngOnInit(): void {
  }

}

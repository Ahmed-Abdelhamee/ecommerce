import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-women-watches',
  templateUrl: './women-watches.component.html',
  styleUrls: ['./women-watches.component.scss']
})
export class WomenWatchesComponent implements OnInit {

  productsList:product[]=[]

  constructor(private dataServ:DataService) { 
    dataServ.getData('women-watches').subscribe(data => {
      for(let key in data)
      this.productsList.push(data[key])
    })
  }

  ngOnInit(): void {
  }

}

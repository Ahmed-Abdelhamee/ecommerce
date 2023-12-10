import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import { social } from 'src/app/models/interfaces/social.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-women-shoes',
  templateUrl: './women-shoes.component.html',
  styleUrls: ['./women-shoes.component.scss']
})
export class WomenShoesComponent implements OnInit {

  productsList:product[]=[];

  whatsapp:social[]=[];

  constructor(private dataServ:DataService) { 
    dataServ.getData('women-shoes').subscribe(data => {
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

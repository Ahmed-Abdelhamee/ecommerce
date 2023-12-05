import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrls: ['./home-dash.component.scss']
})
export class HomeDashComponent implements OnInit , OnChanges{

  @Input() typeOfPage:string="home" ;

  @Input() productsSent:product[]=[] ;
  
  products:product[]=[]

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // this.products= this.productsSent
  }


}

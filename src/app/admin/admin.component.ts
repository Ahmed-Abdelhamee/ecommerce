import { Component, OnInit } from '@angular/core';
import { product } from '../models/interfaces/product.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  typeOfPage:any;

  homeProducts:product[]=[
     {id:"1", photoUrl:"assets/accessoires/accessoires1.jpg", title:"product1", paragraph:"paragraph data ", price:"60", discount:"50"},
     {id:"2", photoUrl:"assets/menClothes/1.jpg", title:"product2", paragraph:"paragraph data ", price:"160", discount:"99"},
     {id:"3", photoUrl:"assets/womenClothes/1.jpg", title:"product3", paragraph:"paragraph data ", price:"260", discount:"150"},
    ]

  menProducts:product[]=[
    {id:"1", photoUrl:"assets/menClothes/1.jpg", title:"product1", paragraph:"paragraph data ", price:"60", discount:"50"},
    {id:"2", photoUrl:"assets/menClothes/2.jpg", title:"product2", paragraph:"paragraph data ", price:"160", discount:"99"},
    {id:"3", photoUrl:"assets/menClothes/3.jpg", title:"product3", paragraph:"paragraph data ", price:"260", discount:"150"},
    ]
    
  arrayToSend:product[]=this.homeProducts;

  constructor() { }

  ngOnInit(): void {
  }

  logOut(){
    sessionStorage.setItem("Admin","no admin");
  }

}

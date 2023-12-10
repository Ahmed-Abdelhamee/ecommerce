import { Component, OnInit, ViewChild } from '@angular/core';
import { product } from '../models/interfaces/product.interface';
import * as $ from 'jquery'
import { HomeDashComponent } from './components/home-dash/home-dash.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // myVal?:string;
  //  myFun(data:string)   function will be done on the event   myName
  // myFun(data:string){
  //   this.myVal = data;
  // }
  // ---------------------------
  // test view child    this is used 
  // @ViewChild(HomeDashComponent) myComp?:HomeDashComponent;
  // getChild(){
  //   // this.myComp. // any thing we want from the child component
  // }
  // ---------------------------


  typeOfPage:any = "";
  
  openLinksListOnPhone:boolean=false; // for phone view
  
  constructor() { }

  ngOnInit(): void {
  }

  logOut(){
    sessionStorage.setItem("Admin","no admin");
  }

  toggle(){
      if(window.innerWidth <=767)
        $(".collapse").toggle(100)
  }

  sendPart(item:string){
    this.typeOfPage=item; 
  }

}

import { Component, OnInit } from '@angular/core';
import { faFacebook  } from '@fortawesome/free-brands-svg-icons';
import { faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { faTwitter  } from '@fortawesome/free-brands-svg-icons';
import {faChevronRight ,faChevronLeft} from "@fortawesome/free-solid-svg-icons"

import * as Aos from 'aos';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  promoListPhoto:string[]=["assets/28.png" , "assets/29.png" , "assets/30.png" , "assets/31.png" , "assets/32.png" , "assets/33.png" , "assets/34.png" , "assets/35.png" , "assets/36.png" , "assets/37.png" , "assets/38.png"]
  thePromo="";
  // for direction changing 
  intervalControlVal:any =""
  intervalControlDirection:any ="right"
  btnAnimation=""
  // ------------- icons variable -------------
  faFacebook =faFacebook ;
  faInstagram =faInstagram ;
  faTwitter =faTwitter ;
  faChevronRight =faChevronRight ;
  faChevronLeft =faChevronLeft ;
  // ----------------------------------

  // Arrays of parts
  allMenList:any[]=["assets/shirt.jpg","assets/10.png","assets/28.png","assets/30.png","assets/menClothes8.jpg"];
  menPartList:any[]=[]; // for view
  allWomenList:any[]=["assets/dress7.jpg","assets/dress8.jpg","assets/dress9.jpg","assets/30.png","assets/menClothes8.jpg"];
  womenPartList:any[]=[]; // for view
  allMenShoesList:any[]=["assets/shirt.jpg","assets/10.png","assets/28.png","assets/30.png","assets/menClothes8.jpg"];
  menShoesPartList:any[]=[]; // for view
  allWomenShoesList:any[]=["assets/shirt.jpg","assets/10.png","assets/28.png","assets/30.png","assets/menClothes8.jpg"];
  womenShoesPartList:any[]=[]; // for view
  allMenAccessoiresList:any[]=["assets/shirt.jpg","assets/10.png","assets/28.png","assets/30.png","assets/menClothes8.jpg"];
  menAccessoiresPartList:any[]=[]; // for view
  allWomenAccessoiresList:any[]=["assets/shirt.jpg","assets/10.png","assets/28.png","assets/30.png","assets/menClothes8.jpg"];
  womenAccessoiresPartList:any[]=[]; // for view
  allBagsList:any[]=["assets/shirt.jpg","assets/10.png","assets/28.png","assets/30.png","assets/menClothes8.jpg"];
  bagsPartList:any[]=[]; // for view

  constructor() { 
    this.thePromo="assets/28.png";
    setTimeout(()=> this.intervalControlVal = setInterval(()=> this.intervalControl(),2000) , 6000 )
  }

  ngOnInit(): void {
    Aos.init();
    this.setProducts();
  }
  // --------------------- codes for alone image ---------------------
  intervalControl(){
    if(this.intervalControlDirection=="right"){
      this.thePromo = (this.promoListPhoto.indexOf(this.thePromo) < this.promoListPhoto.length-1) ? this.promoListPhoto[this.promoListPhoto.indexOf(this.thePromo) + 1 ] : this.promoListPhoto[0]
    }else{
      this.thePromo = (this.promoListPhoto.indexOf(this.thePromo) > 0 ) ? this.promoListPhoto[this.promoListPhoto.indexOf(this.thePromo) - 1 ] : this.promoListPhoto[this.promoListPhoto.length-1] ;
    }
  }
  // move alone image to right 
  getRightProduct(promo:string){
    this.intervalControlDirection="right";
    clearInterval(this.intervalControlVal);
    this.thePromo = (this.promoListPhoto.indexOf(promo) < this.promoListPhoto.length-1) ? this.promoListPhoto[this.promoListPhoto.indexOf(promo) + 1 ] : this.promoListPhoto[0] ;
  }
  // move alone image to left 
  getLeftProduct(promo:string){
    this.intervalControlDirection="left";
    clearInterval(this.intervalControlVal);
    this.thePromo = (this.promoListPhoto.indexOf(promo) > 0 ) ? this.promoListPhoto[this.promoListPhoto.indexOf(promo) - 1 ] : this.promoListPhoto[this.promoListPhoto.length-1] ;
  }

  
  // codes for part images
  setProducts(){
    this.menPartList=[]
    for(let i = 0 ; i< 3 ; i++){
      this.menPartList.push(this.allMenList[i]);
      this.womenPartList.push(this.allWomenList[i]);
      this.menShoesPartList.push(this.allMenList[i]);
      this.womenShoesPartList.push(this.allMenList[i]);
      this.menAccessoiresPartList.push(this.allMenList[i]);
      this.womenAccessoiresPartList.push(this.allMenList[i]);
      this.bagsPartList.push(this.allMenList[i]);
    }
  }
  moveProducts(item:any){
    if(item=="left-men-btn"){
      this.allMenList.unshift(this.allMenList.pop());
    }else if(item=="right-men-btn"){
      this.allMenList.push(this.allMenList.shift());
    }else if(item=="left-women-btn"){
      this.allWomenList.unshift(this.allMenList.pop());
    }else if(item=="right-women-btn"){
      this.womenPartList.push(this.allMenList.shift());
    }

    if(window.innerWidth > 600 ){
      this.setProducts()
    }

    if(window.innerWidth < 600 ){
      $("#menProductsPartDiv").removeClass("animation-up")
      setTimeout(()=> {$("#menProductsPartDiv").addClass("animation-up"); this.setProducts()},.00001)
    }
  }

}

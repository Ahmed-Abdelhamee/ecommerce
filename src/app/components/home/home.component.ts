import { Component, OnInit } from '@angular/core';
import { faSnapchat  } from '@fortawesome/free-brands-svg-icons';
import { faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp  } from '@fortawesome/free-brands-svg-icons';
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
  faSnapchat =faSnapchat ;
  faInstagram =faInstagram ;
  faWhatsapp =faWhatsapp ;
  faChevronRight =faChevronRight ;
  faChevronLeft =faChevronLeft ;
  // ----------------------------------

  // Arrays of parts
  allMenClothesList:any[]=["assets/shirt.jpg","assets/10.png","assets/28.png","assets/29.png","assets/menClothes8.jpg"];
  menClothesPartList:any[]=[]; // for view
  
  allWomenClothesList:any[]=["assets/dress7.jpg","assets/dress8.jpg","assets/dress9.jpg","assets/womenClothes/2.jpg","assets/menClothes8.jpg"];
  womenClothesPartList:any[]=[]; // for view
  
  allMenShoesList:any[]=["assets/menShoes/1.jpg","assets/menShoes/2.jpg","assets/menShoes/3.jpg","assets/menShoes/4.jpg","assets/menShoes/5.jpg","assets/menShoes/6.jpg"];
  menShoesPartList:any[]=[]; // for view
  
  allWomenShoesList:any[]=["assets/womenShoes/1.jpg","assets/womenShoes/2.jpg","assets/womenShoes/3.jpg","assets/womenShoes/5.jpg","assets/womenShoes/6.jpg","assets/womenShoes/7.jpg"];
  womenShoesPartList:any[]=[]; // for view
  
  allMenWatchesList:any[]=["assets/menWatches/1.jpg","assets/menWatches/2.jpg","assets/menWatches/3.jpg","assets/menWatches/4.jpg","assets/menWatches/5.jpg","assets/menWatches/6.jpg"];
  menWatchesPartList:any[]=[]; // for view
  
  allWomenWatchesList:any[]=["assets/womenWatches/1.jpg","assets/womenWatches/2.jpg","assets/womenWatches/3.jpg","assets/womenWatches/4.jpg","assets/womenWatches/5.jpg","assets/womenWatches/6.jpg"];
  womenWatchesPartList:any[]=[]; // for view
  
  allBagsList:any[]=["assets/bags/1.jpg","assets/bags/2.jpg","assets/bags/3.jpg","assets/bags/4.jpg","assets/bags/5.jpg","assets/bags/6.jpg"];
  bagsPartList:any[]=[]; // for view
  
  allAccessoiresList:any[]=["assets/accessoires/accessoires1.jpg","assets/accessoires/accessoires2.jpg","assets/accessoires/accessoires3.jpg","assets/accessoires/accessoires4.jpg","assets/accessoires/accessoires5.jpg","assets/accessoires/accessoires6.jpg"];
  accessoiresPartList:any[]=[]; // for view


  constructor() { 
    this.thePromo="assets/28.png";
    setTimeout(()=> this.intervalControlVal = setInterval(()=> this.intervalControl(),4000) , 10000 )
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
    this.menClothesPartList=[]
    this.womenClothesPartList=[]
    this.menShoesPartList=[]
    this.womenShoesPartList=[]
    this.menWatchesPartList=[]
    this.womenWatchesPartList=[]
    this.bagsPartList=[]
    this.accessoiresPartList=[]

    for(let i = 0 ; i< 3 ; i++){
      this.menClothesPartList.push(this.allMenClothesList[i]);
      this.womenClothesPartList.push(this.allWomenClothesList[i]);
      this.menShoesPartList.push(this.allMenShoesList[i]);
      this.womenShoesPartList.push(this.allWomenShoesList[i]);
      this.menWatchesPartList.push(this.allMenWatchesList[i]);
      this.womenWatchesPartList.push(this.allWomenWatchesList[i]);
      this.bagsPartList.push(this.allBagsList[i]);
      this.accessoiresPartList.push(this.allAccessoiresList[i]);
    }
  }

  moveProducts(item:any){
    if(item=="left-men-clothes-btn"){
      this.allMenClothesList.unshift(this.allMenClothesList.pop());
    }else if(item=="right-men-clothes-btn"){
      this.allMenClothesList.push(this.allMenClothesList.shift());
    }
    else if(item=="left-women-clothes-btn"){
      this.allWomenClothesList.unshift(this.allWomenClothesList.pop());
    }else if(item=="right-women-clothes-btn"){
      this.allWomenClothesList.push(this.allWomenClothesList.shift());
    }
    else if(item=="left-men-shoes-btn"){
      this.allMenShoesList.unshift(this.allMenShoesList.pop());
    }else if(item=="right-men-shoes-btn"){
      this.allMenShoesList.push(this.allMenShoesList.shift());
    }
    else if(item=="left-women-shoes-btn"){
      this.allWomenShoesList.unshift(this.allWomenShoesList.pop());
    }else if(item=="right-women-shoes-btn"){
      this.allWomenShoesList.push(this.allWomenShoesList.shift());
    }
    else if(item=="left-men-watches-btn"){
      this.allMenWatchesList.unshift(this.allMenWatchesList.pop());
    }else if(item=="right-men-watches-btn"){
      this.allMenWatchesList.push(this.allMenWatchesList.shift());
    }
    else if(item=="left-women-watches-btn"){
      this.allWomenWatchesList.unshift(this.allWomenWatchesList.pop());
    }else if(item=="right-women-watches-btn"){
      this.allWomenWatchesList.push(this.allWomenWatchesList.shift());
    }
    else if(item=="left-bags-btn"){
      this.allBagsList.unshift(this.allBagsList.pop());
    }else if(item=="right-bags-btn"){
      this.allBagsList.push(this.allBagsList.shift());
    }
    else if(item=="left-accessoires-btn"){
      this.allAccessoiresList.unshift(this.allAccessoiresList.pop());
    }else if(item=="right-accessoires-btn"){
      this.allAccessoiresList.push(this.allAccessoiresList.shift());
    }


    if(window.innerWidth > 600 ){
      this.setProducts()
    }

    if(window.innerWidth < 600 ){
      $(".products-part-div").removeClass("animation-up")
      if(item=="left-men-clothes-btn" || item=="right-men-clothes-btn") setTimeout(()=> {$("#menClothessPartDiv").addClass("animation-up"); this.setProducts()},.00001);
      if(item=="left-women-clothes-btn" || item=="right-women-clothes-btn") setTimeout(()=> {$("#womenClothessPartDiv").addClass("animation-up"); this.setProducts()},.00001);
      if(item=="left-men-shoes-btn" || item=="right-men-shoes-btn") setTimeout(()=> {$("#menShoesPartDiv").addClass("animation-up"); this.setProducts()},.00001);
      if(item=="left-women-shoes-btn" || item=="right-women-shoes-btn") setTimeout(()=> {$("#womenShoesPartDiv").addClass("animation-up"); this.setProducts()},.00001);
      if(item=="left-men-watches-btn" || item=="right-men-watches-btn") setTimeout(()=> {$("#menWatchesPartDiv").addClass("animation-up"); this.setProducts()},.00001);
      if(item=="left-women-watches-btn" || item=="right-women-watches-btn") setTimeout(()=> {$("#womenWatchesPartDiv").addClass("animation-up"); this.setProducts()},.00001);
      if(item=="left-bags-btn" || item=="right-bags-btn") setTimeout(()=> {$("#bagsPartDiv").addClass("animation-up"); this.setProducts()},.00001);
      if(item=="left-accessoires-btn" || item=="right-accessoires-btn") setTimeout(()=> {$("#accessoiresPartDiv").addClass("animation-up"); this.setProducts()},.00001);
    }
  }

}

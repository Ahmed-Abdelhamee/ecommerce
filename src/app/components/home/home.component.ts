import { Component, OnInit } from '@angular/core';
import { faSnapchat  } from '@fortawesome/free-brands-svg-icons';
import { faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp  } from '@fortawesome/free-brands-svg-icons';
import {faChevronRight ,faChevronLeft} from "@fortawesome/free-solid-svg-icons"

import * as Aos from 'aos';
import * as $ from 'jquery';
import { product } from 'src/app/models/interfaces/product.interface';
import { social } from 'src/app/models/interfaces/social.interface';
import { DataService } from 'src/app/models/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // promoListPhoto:string[]=["assets/28.png" , "assets/29.png" , "assets/30.png" , "assets/31.png" , "assets/32.png" , "assets/33.png" , "assets/34.png" , "assets/35.png" , "assets/36.png" , "assets/37.png" , "assets/38.png"]
  // promoListPhoto:string[]=["assets/03.png" , "assets/04.png" , "assets/10.png" , "assets/12.png" , "assets/32.png" , "assets/11.png" , "assets/20.png"]
  promoListPhoto:product[]=[]
  thePromo!:product;
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

  emptyProduct:product={
    id:'',
    photoUrl:'',
    title:'',
    paragraph:'',
    price:0,
    discount:0,
    selectedPage:'',
    basicPagePart:'',
  }
  // Arrays of parts
  allMenClothesList:product[]=[];
  menClothesPartList:product[]=[]; // for view
  
  allWomenClothesList:product[]=[];
  womenClothesPartList:product[]=[]; // for view
  
  allMenShoesList:product[]=[];
  menShoesPartList:product[]=[]; // for view
  
  allWomenShoesList:product[]=[];
  womenShoesPartList:product[]=[]; // for view
  
  allMenWatchesList:product[]=[];
  menWatchesPartList:product[]=[]; // for view
  
  allWomenWatchesList:product[]=[];
  womenWatchesPartList:product[]=[]; // for view
  
  allBagsList:product[]=[];
  bagsPartList:product[]=[]; // for view
  
  allAccessoiresList:product[]=[];
  accessoiresPartList:product[]=[]; // for view

  // icons form dash 
  whatsapp:social[]=[]
  instagram:social[]=[]
  snapchat:social[]=[]

  constructor(private dataServ:DataService) { 
    /* make promo wait */ setTimeout(()=> this.intervalControlVal = setInterval(()=> this.intervalControl(),4000) , 10000 );
    // ----------------------- get whatsapp -----------------------
    this.whatsapp=dataServ.returnSoical("whatsapp");
    // ----------------------- get instagram -----------------------
    this.instagram=dataServ.returnSoical("insta");
    // ----------------------- get snapchat -----------------------
    this.snapchat=dataServ.returnSoical("snapchat");
    // get icons 
    dataServ.getDataAPI("basic-page-icons").subscribe(  data =>{
      for (const key in data) {
        this.promoListPhoto.push(data[key])
      }
       this.thePromo=this.promoListPhoto[0];
    });
    // ----------------------------------- get all data for basic page -----------------------------------
    // in the last functions we used   async / wait   to make pause for geting items view untill all data be loaded
    dataServ.getDataAPI("basic-page-women-clothes").subscribe(async data =>{
      for (const key in data) {
        this.allWomenClothesList.push(data[key])
      }
      this.allWomenClothesList.reverse();
      await this.setProducts()
    });
    dataServ.getDataAPI("basic-page-women-shoes").subscribe(async data =>{
      for (const key in data) {
        this.allWomenShoesList.push(data[key])
      }
      this.allWomenShoesList.reverse();
      await this.setProducts()
    });
    dataServ.getDataAPI("basic-page-women-watches").subscribe(async data =>{
      for (const key in data) {
        this.allWomenWatchesList.push(data[key])
      }
      this.allWomenWatchesList.reverse();
      await this.setProducts()
    });
    dataServ.getDataAPI("basic-page-bags").subscribe(async data =>{
      for (const key in data) {
        this.allBagsList.push(data[key])
      }
      this.allBagsList.reverse();
      await this.setProducts()
    });
    dataServ.getDataAPI("basic-page-accessoires").subscribe(async data =>{
      for (const key in data) {
        this.allAccessoiresList.push(data[key])
      }
      this.allAccessoiresList.reverse();
      await this.setProducts()
    });
    dataServ.getDataAPI("basic-page-men-clothes").subscribe( async data =>{
      for (const key in data) {
        this.allMenClothesList.push(data[key])
      }
      this.allMenClothesList.reverse();
      await this.setProducts()
    });
    dataServ.getDataAPI("basic-page-men-shoes").subscribe(async data =>{
      for (const key in data) {
        this.allMenShoesList.push(data[key])
      }
      this.allMenShoesList.reverse();
      await this.setProducts()
    });
    this.dataServ.getDataAPI("basic-page-men-watches").subscribe(async data =>{
      for (const key in data) {
        this.allMenWatchesList.push(data[key])
      }
      this.allMenWatchesList.reverse();
      await this.setProducts()
    });
  }

  ngOnInit(): void {
    Aos.init();
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
  getRightProduct(promo:product){
    this.intervalControlDirection="right";
    clearInterval(this.intervalControlVal);
    this.thePromo = (this.promoListPhoto.indexOf(promo) < this.promoListPhoto.length-1) ? this.promoListPhoto[this.promoListPhoto.indexOf(promo) + 1 ] : this.promoListPhoto[0] ;
  }
  // move alone image to left 
  getLeftProduct(promo:product){
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
      this.menClothesPartList.push(this.allMenClothesList[i]? this.allMenClothesList[i] : this.emptyProduct);
      this.womenClothesPartList.push(this.allWomenClothesList[i]? this.allWomenClothesList[i] : this.emptyProduct);
      this.menShoesPartList.push(this.allMenShoesList[i]? this.allMenShoesList[i] : this.emptyProduct);
      this.womenShoesPartList.push(this.allWomenShoesList[i]? this.allWomenShoesList[i] : this.emptyProduct);
      this.menWatchesPartList.push(this.allMenWatchesList[i]? this.allMenWatchesList[i]: this.emptyProduct);
      this.womenWatchesPartList.push(this.allWomenWatchesList[i]? this.allWomenWatchesList[i] : this.emptyProduct);
      this.bagsPartList.push(this.allBagsList[i]? this.allBagsList[i] :this.emptyProduct);
      this.accessoiresPartList.push(this.allAccessoiresList[i]? this.allAccessoiresList[i]:this.emptyProduct);
    }
  }

  moveProducts(item:any){
    if(item=="left-men-clothes-btn"){
      this.allMenClothesList.unshift(this.allMenClothesList.pop()!);
    }else if(item=="right-men-clothes-btn"){
      this.allMenClothesList.push(this.allMenClothesList.shift()!);
    }
    else if(item=="left-women-clothes-btn"){
      this.allWomenClothesList.unshift(this.allWomenClothesList.pop()!);
    }else if(item=="right-women-clothes-btn"){
      this.allWomenClothesList.push(this.allWomenClothesList.shift()!);
    }
    else if(item=="left-men-shoes-btn"){
      this.allMenShoesList.unshift(this.allMenShoesList.pop()!);
    }else if(item=="right-men-shoes-btn"){
      this.allMenShoesList.push(this.allMenShoesList.shift()!);
    }
    else if(item=="left-women-shoes-btn"){
      this.allWomenShoesList.unshift(this.allWomenShoesList.pop()!);
    }else if(item=="right-women-shoes-btn"){
      this.allWomenShoesList.push(this.allWomenShoesList.shift()!);
    }
    else if(item=="left-men-watches-btn"){
      this.allMenWatchesList.unshift(this.allMenWatchesList.pop()!);
    }else if(item=="right-men-watches-btn"){
      this.allMenWatchesList.push(this.allMenWatchesList.shift()!);
    }
    else if(item=="left-women-watches-btn"){
      this.allWomenWatchesList.unshift(this.allWomenWatchesList.pop()!);
    }else if(item=="right-women-watches-btn"){
      this.allWomenWatchesList.push(this.allWomenWatchesList.shift()!);
    }
    else if(item=="left-bags-btn"){
      this.allBagsList.unshift(this.allBagsList.pop()!);
    }else if(item=="right-bags-btn"){
      this.allBagsList.push(this.allBagsList.shift()!);
    }
    else if(item=="left-accessoires-btn"){
      this.allAccessoiresList.unshift(this.allAccessoiresList.pop()!);
    }else if(item=="right-accessoires-btn"){
      this.allAccessoiresList.push(this.allAccessoiresList.shift()!);
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

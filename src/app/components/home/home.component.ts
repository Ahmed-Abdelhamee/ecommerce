import { Component, OnInit } from '@angular/core';
import { faFacebook  } from '@fortawesome/free-brands-svg-icons';
import { faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { faTwitter  } from '@fortawesome/free-brands-svg-icons';
import {faChevronRight ,faChevronLeft} from "@fortawesome/free-solid-svg-icons"

import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  promoListPhoto:string[]=["assets/28.png" , "assets/29.png" , "assets/30.png" , "assets/31.png" , "assets/32.png" , "assets/33.png" , "assets/34.png" , "assets/35.png" , "assets/36.png" , "assets/37.png" , "assets/38.png"]
  thePromo="";
  animation:string =""
  // ------------- icons variable -------------
  faFacebook =faFacebook ;
  faInstagram =faInstagram ;
  faTwitter =faTwitter ;
  faChevronRight =faChevronRight ;
  faChevronLeft =faChevronLeft ;
  // ----------------------------------


  constructor() { 
    this.thePromo="assets/28.png"
  }

  ngOnInit(): void {
    Aos.init()
  }

  getRightProduct(promo:string){
    this.animation="";
    this.thePromo="1243.png";
    setTimeout(() => {
      this.animation="animation-right";
      if(this.animation=="animation-right")
      this.thePromo = (this.promoListPhoto.indexOf(promo) < this.promoListPhoto.length-1) ? this.promoListPhoto[this.promoListPhoto.indexOf(promo) + 1 ] : this.promoListPhoto[0] ;
  }, .9);
  }
  getLeftProduct(promo:string){
    this.animation="";
    this.thePromo="1243.png";
    setTimeout(() => {
      this.animation="animation-left";
      if(this.animation=="animation-left")
      this.thePromo = (this.promoListPhoto.indexOf(promo) > 0 ) ? this.promoListPhoto[this.promoListPhoto.indexOf(promo) - 1 ] : this.promoListPhoto[this.promoListPhoto.length-1] ;
    }, 1);
  }

}

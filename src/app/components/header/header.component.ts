import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $( "#navbarToggle" ).on( "click", function() {
      $("#navbarNavDropdown").toggle(500)
    });   
  }

  closeNavbar(){
    if(window.innerWidth < 991){
      $("#navbarNavDropdown").toggle(500)
    }
  }

}

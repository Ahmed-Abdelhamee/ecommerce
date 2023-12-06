import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import {FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrls: ['./home-dash.component.scss']
})
export class HomeDashComponent implements OnInit , OnChanges{

  
  @Input() typeOfPage:string="home" ;
  @Input() productsSent:product[]=[] ;
  showForm:boolean=false;
  products:product[]=[]
  selectedPage:any="";
  photoPromo:any="";

  

  constructor(private formBuilder:FormBuilder) { }

  product=this.formBuilder.group({
    id:[""],
    photoUrl:[""],
    title:[""],
    paragraph:[""],
    price:[""],
    discount:[""],
  })

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // this.products= this.productsSent
  }

  submit(){
    console.log(this.product.value)
  }
  uploadPhoto(event:any){
    let loader=new FileReader();
    loader.readAsDataURL(event.target.files[0])
    loader.onload=(event)=>{
      this.photoPromo=event.target?.result;
    }
  }
  edit(item:product){
    console.log(item)
  }
  del(item:product){
    console.log(item)
  }

}

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import {FormBuilder} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrls: ['./home-dash.component.scss']
})
export class HomeDashComponent implements OnInit , OnChanges{
  
  @Input() typeOfPage:string="home" ;
  @Input() productsSent:product[]=[] ;
  showParts:string="products";
  showdelete:boolean=false;
  products:product[]=[];
  photoPromoURL:any="";
  deleteProduct:product={};

  product=this.formBuilder.group({
    id:[new Date().getTime().toString()],
    photoUrl:[""],
    selectedPage:[""],
    basicPagePart:[""],
    title:[""],
    paragraph:[""],
    price:[0],
    discount:[0],
  })

  whatsapp=this.formBuilder.group({
    whatsapp:[""],
  })

  constructor(private formBuilder:FormBuilder , private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.showParts=this.typeOfPage;
    this.showdelete=false;
  }

  viewControl(text:string){
    this.showParts=text
  }

  addProductBtn(){
    this.showParts='form';
    this.photoPromoURL='';
    this.product.patchValue({
      id:new Date().getTime().toString(),
      photoUrl:"",
      selectedPage:"",
      basicPagePart:"",
      title:"",
      paragraph:"",
      price:0,
      discount:0,
    })
  }

  selectedPageValue(val:string){
    if(val!="basic-bage"){
      this.product.patchValue({
        basicPagePart:""
      })
    }
  }
  
  submit(){
    if( (this.product.get("price")?.value!>this.product.get("discount")?.value!) && this.product.get("price")?.value! !=0 && this.product.get("discount")?.value! !=0 ){
      this.product.patchValue({
        photoUrl:this.photoPromoURL
      })
      if(this.showParts=="form"){
        console.log(this.product.value);
        this.toastr.success("تم اضافة المنتج","error");
      }else{
        console.log(this.product.value);
        this.toastr.warning("تم تعديل المنتج","error");
      }
    }else{
      this.toastr.error("راجع بيانات المنتج","error");
    }
  }

  submitWhats(){
    console.log(this.whatsapp.value)
  }

  uploadPhoto(event:any){
    let loader=new FileReader();
    loader.readAsDataURL(event.target.files[0])
    loader.onload=(event)=>{
      this.photoPromoURL=event.target?.result;
    }
  }

  showProductForEdit(item:product){
    this.product.patchValue({
      id:item.id,
      photoUrl:item.photoUrl,
      selectedPage:item.selectedPage,
      basicPagePart:item.basicPagePart,
      title:item.title,
      paragraph:item.paragraph,
      price:item.price,
      discount:item.discount,
    })
    this.photoPromoURL=item.photoUrl
  }

  del(item:product){
    console.log(item);
  }


}

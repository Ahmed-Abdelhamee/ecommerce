import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import {FormBuilder} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrls: ['./home-dash.component.scss']
})
export class HomeDashComponent implements OnInit , OnChanges{
  
  @Input() typeOfPage:string="" ;
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

  selectedPageValue(val:string){
    if(val!="basic-bage"){
      this.product.patchValue({
        basicPagePart:""
      })
    }
  }
  
  // -------------- add product --------------
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

  submit(){
    if( (this.product.get("price")?.value!>this.product.get("discount")?.value!  || this.product.get("price")?.value! ==0 ) &&
         this.product.get("discount")?.value! !=0 &&
         this.product.get("selectedPage")?.value!='' &&
         this.product.get("title")?.value!='' &&
         this.product.get("paragraph")?.value!='' &&
         this.photoPromoURL!='' )
      {
      this.product.patchValue({
        photoUrl:this.photoPromoURL
      })
      if(this.showParts=="form"){
        console.log(this.product.value);
        this.toastr.success("تم اضافة المنتج","عملية ناجحة");
      }else{
        console.log(this.product.value);
        this.toastr.warning("تم تعديل المنتج","");
      }
    }else{
      this.toastr.error("راجع بيانات المنتج","خطاء");
    }
  }


  // -------------- image uploaded --------------
  uploadPhoto(event:any){
    let loader=new FileReader();
    loader.readAsDataURL(event.target.files[0])
    loader.onload=(event)=>{
      this.photoPromoURL=event.target?.result;
    }
  }

  // -------------- update product --------------
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

  // -------------- delete product --------------
  del(item:product){
    console.log(item);
    this.toastr.success("تم اضافة المنتج","عملية ناجحة");
  }

  // update what's app
  submitWhats(){
    console.log(this.whatsapp.value)
  }





  // test output component interaction
  // using event way to send data  from child to parent
  // @Output() myName:EventEmitter<string>=new EventEmitter<string>();
  // sendDataToParent(){
  //   this.myName.emit("medo from child to parent") // when this event done the data will be sent to [parent component]
  // }
  
}

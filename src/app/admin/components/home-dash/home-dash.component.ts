import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import {FormBuilder} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from 'src/app/models/services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Feedback } from 'src/app/models/interfaces/feedback.interface';
import * as $ from 'jquery'

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrls: ['./home-dash.component.scss']
})
export class HomeDashComponent implements OnInit , OnChanges{
  
  @Input() typeOfPage:string="" ;
  // @Input() productsSent:product[]=[] ;
  showParts:string="products";
  showdelete:boolean=false;
  products:product[]=[];
  photoPromoURL:any="";
  deleteProduct:product={};
  uploading:string="";
  keyForDeleteOrEdit:string="";
  feedback:Feedback[]=[];
  oldImageEdited:string="";
  del_ID:string="";

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
    id:["phone"],
    social:[""],
  })

  instagram=this.formBuilder.group({
    id:["instagram"],
    social:[""],
  })

  snapchat=this.formBuilder.group({
    id:["snapchat"],
    social:[""],
  })

  constructor(private formBuilder:FormBuilder , private http :HttpClient  , private toastr:ToastrService , private firestorage:AngularFireStorage, private dataServ:DataService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.showParts=this.typeOfPage;
    this.showdelete=false;
    this.products=[];
    this.feedback=[]
    if(this.typeOfPage != "")
    this.products=this.dataServ.getProducts(this.typeOfPage);
    // for get feedback
    if(this.typeOfPage == "contact-us"){
      this.feedback=this.dataServ.getFeedback()
  }
  }

  // <!-- select page function for adding products  -->
  selectedPageValue(val:string){
    if(!val.includes("basic-page")){
      this.product.patchValue({
        basicPagePart:""
      })
    }
  }

  // -------------- product image upload --------------
  async uploadPhoto(event:any){
    this.uploading="uploadingImage";
    const file=event.target.files[0];
    if(file){
      const path=`ecommerce/${new Date().getTime()}${file.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.photoPromoURL=url;
    }
    this.uploading="uploadedImage";
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
  // submit customer products
  submit(){
    if( (this.product.get("price")?.value!>this.product.get("discount")?.value!  || this.product.get("price")?.value! <=0 ) &&
         this.product.get("discount")?.value! >0 &&
         this.product.get("selectedPage")?.value!='' &&
         this.product.get("title")?.value!='' &&
         this.product.get("paragraph")?.value!='' &&
         this.photoPromoURL!='' ) 
      {
        this.product.patchValue({
          photoUrl:this.photoPromoURL,
        })

        // ----------- add & edit part -----------
        if(this.showParts=="form"){
          // to create new id 
          this.product.patchValue({
            id:new Date().getTime().toString(),
          })
          this.dataServ.create(this.product.value) // send data 
        }else{
          // -------------- edit product --------------
          // to get product for editing 
  /* this variable for identify which data will be edit */ let checkBasicPage=this.product.value.selectedPage! == "basic-page"? `${this.product.value.selectedPage!}-${this.product.value.basicPagePart!}`:`${this.product.value.selectedPage!}`;
          this.dataServ.getDataAPI(checkBasicPage).subscribe(data =>{
            for (const key in data) {
              if(this.product.value.id==data[key].id){
                this.keyForDeleteOrEdit=key;
                  this.http.put(`${environment.firebase.databaseURL}/${checkBasicPage}/${key}.json`,this.product.value).subscribe((data)=>{
                  this.toastr.warning("تم تعديل المنتج","");
                  this.ngOnChanges()            
                })
                if(this.oldImageEdited!=this.photoPromoURL && this.photoPromoURL !="") 
                  this.firestorage.storage.refFromURL(this.oldImageEdited).delete()
                break;
              }
            }
          })
        }
    }else{
      this.toastr.error("راجع بيانات المنتج","خطاء");
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
    this.photoPromoURL=item.photoUrl;
    this.oldImageEdited=item.photoUrl!;
  }

  // -------------- delete product --------------
  del(item:product){
/* this variable for identify which data will be edit */ let checkBasicPage=item.selectedPage! == "basic-page"? `${item.selectedPage!}-${item.basicPagePart!}`:`${item.selectedPage!}`;
    this.dataServ.getDataAPI(checkBasicPage).subscribe(data =>{
      for (const key in data) {
        if(item.id==data[key].id){
          this.keyForDeleteOrEdit=key;
          this.http.delete(`${environment.firebase.databaseURL}/${checkBasicPage}/${key}.json`).subscribe((data)=>{
            this.toastr.success("تم حذف المنتج","");
            this.ngOnChanges()            
          })
          this.firestorage.storage.refFromURL(this.deleteProduct.photoUrl!).delete()
          break;
        }
      }
    })
  }

  //-------------------------------------- what'sapp ---------------------------------------

  //------------------------------------ update what's app ------------------------------------
  submitWhats(){
    this.dataServ.updateWhatsapp(this.whatsapp.value)
  }
  submitInstagram(){
    this.dataServ.updateInstagram(this.instagram.value)
  }
  submitSnapChat(){
    this.dataServ.updateSnapChat(this.snapchat.value)
  }


// ------------------------------------- delete contact us -------------------------------------

deleteFeedback(item:Feedback){
 this.dataServ.delete(item);
 $(`#contact-us-${item.id}`).hide()
}


  
}

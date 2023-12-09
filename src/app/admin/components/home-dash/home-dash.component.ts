import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { product } from 'src/app/models/interfaces/product.interface';
import {FormBuilder} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from 'src/app/models/services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  constructor(private formBuilder:FormBuilder , private http :HttpClient  , private toastr:ToastrService , private firestorage:AngularFireStorage, private dataServ:DataService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.showParts=this.typeOfPage;
    this.showdelete=false;
    this.products=[]
    if(this.typeOfPage != "")
    this.dataServ.getData(this.typeOfPage).subscribe(data =>{
      for (const key in data) {
        this.products.push(data[key])
      }
    })
    console.log(this.products)
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
      if(this.showParts=="form"){
        // to create new id 
        this.product.patchValue({
          id:new Date().getTime().toString(),
        })
        this.dataServ.create(this.product.value) // send data 
      }else{
        // to get product for edit product 
        this.dataServ.getData(this.product.value.selectedPage!).subscribe(data =>{
          for (const key in data) {
            if(this.product.value.id==data[key].id){
              this.keyForDeleteOrEdit=key;
              this.http.put(`${environment.firebase.databaseURL}/${data[key].selectedPage}/${key}.json`,this.product.value).subscribe((data)=>{
                this.toastr.warning("تم تعديل المنتج","");
                this.ngOnChanges()            
              })
              break;
            }
          }
        })
      }
    }else{
      this.toastr.error("راجع بيانات المنتج","خطاء");
    }
  }


  // -------------- image uploaded --------------
  async uploadPhoto(event:any){
    this.uploading="uploadingImage";
    const file=event.target.files[0];
    if(file){
      const path=`ecommerce/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.photoPromoURL=url;
    }
    this.uploading="uploadedImage";
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
    this.dataServ.getData(item.selectedPage!).subscribe(data =>{
      for (const key in data) {
        if(item.id==data[key].id){
          this.keyForDeleteOrEdit=key;
          this.http.delete(`${environment.firebase.databaseURL}/${data[key].selectedPage}/${key}.json`).subscribe((data)=>{
            this.toastr.success("تم حذف المنتج","");
            this.ngOnChanges()            
          })
          break;
        }
      }
    })
  }

  // update what's app
  submitWhats(){
    console.log(this.whatsapp.value)
    this.toastr.success("تم تعديل الواتساب","عملية ناجحة");
  }





  // test output component interaction
  // using event way to send data  from child to parent
  // @Output() myName:EventEmitter<string>=new EventEmitter<string>();
  // sendDataToParent(){
  //   this.myName.emit("medo from child to parent") // when this event done the data will be sent to [parent component]
  // }
  
}

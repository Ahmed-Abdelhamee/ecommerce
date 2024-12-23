import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { social} from '../interfaces/social.interface';
import {Feedback} from '../interfaces/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http : HttpClient , private toastr : ToastrService ) { }
  // get products from API 
  getDataAPI(selectedPage:string):Observable<product[]>{
    return this.http.get<product[]>(`${environment.firebase.databaseURL}/${selectedPage}.json`)
   }
  // put products in lists  --  this code deprercated in usere components view , because of bugs  but it work in dash-board
   getProducts(selectedPage:string):product[]{
    let productList:product[]=[];
    this.getDataAPI(selectedPage).subscribe(data =>{
      for (const key in data) {
        productList.push(data[key])
      }
      productList.reverse() // we put this code here to set the reverse after loading the product So as not to neglect  
    })
    return productList;
   }
  //  create product 
  create(product:any){
  /* this variable for identify which data will be created */ let checkBasicPage=product.selectedPage! == "basic-page"? `${product.selectedPage!}-${product.basicPagePart!}`:`${product.selectedPage!}`;
      this.http.post(`${environment.firebase.databaseURL}/${checkBasicPage}.json`,product).subscribe((data)=>{
        this.toastr.success("تم اضافة المنتج","عملية ناجحة"); 
        this.http.post(`${environment.firebase.databaseURL}/${checkBasicPage}-copy.json`,product).subscribe()
      })
  }
  // ---------------------------------------------- social Media Links API ---------------------------------------------
  // -------------------------- note that update & delete is working in the Component.ts directly -----------------------
  getSocialAPI(socialtype:string):Observable<social[]>{
    return this.http.get<social[]>(`${environment.firebase.databaseURL}/${socialtype}.json`)
  }
  // --------------------- get data of social Links ---------------------
  returnSoical(social:string):social[]{
    let arr:social[]=[];
    this.getSocialAPI(social).subscribe(data=>{
      for (const key in data) {
        arr.push(data[key]);
      }
    })
    return arr;
  }
  // --------------------------------------- update social media links ---------------------------------------
  updateWhatsapp(whats:any){
    this.getSocialAPI("whatsapp").subscribe(data=>{
      for(let key in data){
        this.http.put(`${environment.firebase.databaseURL}/whatsapp/${key}.json`,whats).subscribe((data)=>{
          this.toastr.success("تم تعديل الواتساب","عملية ناجحة"); 
        })
      }
    })
  }
  updateInstagram(insta:any){
    this.getSocialAPI("insta").subscribe(data=>{
      for(let key in data){
        this.http.put(`${environment.firebase.databaseURL}/insta/${key}.json`,insta).subscribe((data)=>{
          this.toastr.error("تم تعديل الانستجرام","عملية ناجحة"); 
        })
      }
    })
  }
  updateSnapChat(snapchat:any){
    this.getSocialAPI("snapchat").subscribe(data=>{
      for(let key in data){
        this.http.put(`${environment.firebase.databaseURL}/snapchat/${key}.json`,snapchat).subscribe((data)=>{
          this.toastr.warning("تم تعديل سناب شات","عملية ناجحة"); 
        })
      }
    })
  }
  // --------------------------------------- send & get and delete contact us data ---------------------------------------
  sendFeedback(data:any){
    this.http.post(`${environment.firebase.databaseURL}/feedback.json`,data).subscribe(()=>{ });
  }
  // get  Feedback
  getFeedbackAPI():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${environment.firebase.databaseURL}/feedback.json`)
  }
  getFeedback():Feedback[]{
    let Feedback:Feedback[]=[]
    this.http.get<Feedback[]>(`${environment.firebase.databaseURL}/feedback.json`).subscribe(data =>{
      for (const key in data) {
        Feedback.push(data[key])
      }
    })
    return Feedback
  }

  //------------------------------------------------------------------------------
  // delete the data
  delete(item:Feedback){
    this.getFeedbackAPI().subscribe(data =>{
      for (const key in data) {
        if(data[key].id==item.id){
          this.http.delete(`${environment.firebase.databaseURL}/feedback/${key}.json`).subscribe(()=>{
            this.toastr.success("تم حذف رسالة العميل","");
          });
          break;
        }
      }
    })
  }
}

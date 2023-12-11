import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { social} from '../interfaces/social.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http : HttpClient , private toastr : ToastrService ) { }

  getData(selectedPage:string):Observable<product[]>{
    return this.http.get<product[]>(`${environment.firebase.databaseURL}/${selectedPage}.json`)
   }

   getProducts(selectedPage:string):product[]{
    let productList:product[]=[];
    this.getData(selectedPage).subscribe(data =>{
      for (const key in data) {
        productList.push(data[key])
      }
    })
    return productList;
   }

  create(product:any){
/* this variable for identify which data will be edit */ let checkBasicPage=product.selectedPage! == "basic-page"? `${product.selectedPage!}-${product.basicPagePart!}`:`${product.selectedPage!}`;
      this.http.post(`${environment.firebase.databaseURL}/${checkBasicPage}.json`,product).subscribe((data)=>{
        this.toastr.success("تم اضافة المنتج","عملية ناجحة"); 
      })
  }

//   deleteItem(product:any,key:string){
// /* this variable for identify which data will be edit */ let checkBasicPage=product.selectedPage! == "basic-page"? `${product.selectedPage!}-${product.basicPagePart!}`:`${product.selectedPage!}`;
//     this.http.delete(`${environment.firebase.databaseURL}/${checkBasicPage}/${key}.json`).subscribe((data)=>{
//       this.toastr.success("تم حذف المنتج","");
//     })
//   }

  
  // -------------------------- note that update & delete is working in the Component.ts directly -----------------------
  



  // --------------------- social  app ---------------------
  getWhatsapp():Observable<social[]>{
    return this.http.get<social[]>(`${environment.firebase.databaseURL}/whatsapp.json`)
  }
  getInstagram():Observable<social[]>{
    return this.http.get<social[]>(`${environment.firebase.databaseURL}/insta.json`)
  }
  getSnapChat():Observable<social[]>{
    return this.http.get<social[]>(`${environment.firebase.databaseURL}/snapchat.json`)
  }
  getSocialAPI(socialtype:string):Observable<social[]>{
    return this.http.get<social[]>(`${environment.firebase.databaseURL}/${socialtype}.json`)
  }
  returnSoical(social:string):social[]{
    let arr:social[]=[];
    this.getSocialAPI(social).subscribe(data=>{
      for (const key in data) {
        arr.push(data[key]);
      }
    })
    return arr;
  }
  updateWhatsapp(whats:any){
    this.getWhatsapp().subscribe(data=>{
      for(let key in data){
        this.http.put(`${environment.firebase.databaseURL}/whatsapp/${key}.json`,whats).subscribe((data)=>{
          this.toastr.success("تم تعديل الواتساب","عملية ناجحة"); 
        })
      }
    })
  }
  updateInstagram(insta:any){
    this.getInstagram().subscribe(data=>{
      for(let key in data){
        this.http.put(`${environment.firebase.databaseURL}/insta/${key}.json`,insta).subscribe((data)=>{
          this.toastr.error("تم تعديل الانستجرام","عملية ناجحة"); 
        })
      }
    })
  }
  updateSnapChat(snapchat:any){
    this.getSnapChat().subscribe(data=>{
      for(let key in data){
        this.http.put(`${environment.firebase.databaseURL}/snapchat/${key}.json`,snapchat).subscribe((data)=>{
          this.toastr.warning("تم تعديل سناب شات","عملية ناجحة"); 
        })
      }
    })
  }

}

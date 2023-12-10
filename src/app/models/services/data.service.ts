import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { whatsapp } from '../interfaces/whatsapp.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http : HttpClient , private toastr : ToastrService ) { }

  getData(selectedPage:string):Observable<product[]>{
    return this.http.get<product[]>(`${environment.firebase.databaseURL}/${selectedPage}.json`)
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

  // -------------------------- note that update is working in the Component.ts directly -----------------------
  



  // --------------------- what's app ---------------------
  getWhatsapp():Observable<whatsapp[]>{
    return this.http.get<whatsapp[]>(`${environment.firebase.databaseURL}/whatsapp.json`)
  }
  updateWhatsapp(whats:any){
    this.http.post(`${environment.firebase.databaseURL}/whatsapp.json`,whats).subscribe((data)=>{
      this.toastr.warning("تم تعديل الواتساب","عملية ناجحة"); 
    })
  }

}

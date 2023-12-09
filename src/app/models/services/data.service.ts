import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http :HttpClient , private toastr:ToastrService) {
   }

   getData(selectedPage:string):Observable<product[]>{
    return this.http.get<product[]>(`${environment.firebase.databaseURL}/${selectedPage}.json`)
   }

  create(product:any){
    this.http.post(`${environment.firebase.databaseURL}/${product.selectedPage}.json`,product).subscribe((data)=>{
      this.toastr.success("تم اضافة المنتج","عملية ناجحة"); 
    })
  }

  deleteItem(product:any,key:string){
    this.http.delete(`${environment.firebase.databaseURL}/${product.selectedPage}/${key}.json`).subscribe((data)=>{
      this.toastr.success("تم حذف المنتج","");
    })

  }

}

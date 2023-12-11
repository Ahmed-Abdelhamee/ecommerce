import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  AdminUserID:any="admin";
  loginAdminError:boolean=false;

  constructor(private auth:Auth ,private route:Router) { }

  login(Admin:any){
     return signInWithEmailAndPassword(this.auth,Admin.email,Admin.pass).then((user)=>{
      sessionStorage.setItem("Admin","you is admin");
      this.route.navigate(["/admin/home"])
    })
  }
}

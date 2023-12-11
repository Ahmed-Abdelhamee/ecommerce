import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/models/services/admin-auth.service';

@Component({
  selector: 'app-dashlogin',
  templateUrl: './dashlogin.component.html',
  styleUrls: ['./dashlogin.component.scss']
})
export class DashloginComponent implements OnInit {

  error:boolean=false;
  
  constructor(private fb:FormBuilder ,private route:Router,private auth:AdminAuthService) { 
  }

  login=this.fb.group({
    email:["",Validators.required],
    pass:["",Validators.required],
  })

  ngOnInit(): void {
  }

  submit(){
    this.auth.login(this.login.value).catch(()=>{
      sessionStorage.setItem("Admin","is False not Admin")
      this.error=true;
    });
  }
}

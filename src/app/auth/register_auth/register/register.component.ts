import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import * as registerModels from "./register.models"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private authSrv:AuthService) { }

  parentForm:FormGroup
  errorMsg:boolean = false

  ngOnInit() {
    this.initForm()
  }

  navigateTo()
  {
    this.router.navigate(["authenticate/login"])
  }

  registerUser(form:FormGroup)
  {
    if(form.valid){
    let user:registerModels.RegisterUser = form.value
  
    this.authSrv.registerUser(user).subscribe((response)=>{
      console.log(response)
    })
    
    }
    else
    { 
      this.errorMsg = true
      setTimeout(()=>{this.errorMsg=false},3000)
    }
  }

  initForm()
  {
    let first_name =""
    let last_name =""
    let email=""
    let password=""


    this.parentForm = new FormGroup({
      firstName:new FormControl(first_name, Validators.required),
      lastName:new FormControl(last_name, Validators.required),
      email:new FormControl(email, [Validators.required, Validators.email]),
      password:new FormControl(password, Validators.required)
    })
  }

}

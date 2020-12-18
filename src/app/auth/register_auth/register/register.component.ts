import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
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
  formError:boolean = false
  errorMsg:string = null


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
    let newUser:registerModels.RegisterUser = form.value
  
    this.authSrv.registerUser(newUser).pipe(
      catchError((error)=>{
        this.formError = true
        this.errorMsg = "Unexpected Error. Please try again"
        setTimeout(()=>{this.formError=false; this.errorMsg =  null},3000)
        return of(error)
      }), 
      filter((error)=>{
        return !error["error"]
      }),tap((response:registerModels.emailTakenError | registerModels.successRegister)=>{
        if(response["fail"])
        {
          let data = <registerModels.emailTakenError> response
          this.formError = true
          this.errorMsg = data.fail
          setTimeout(()=>{this.formError=false; this.errorMsg =  null},5000)
        }
        else
        {
          let data = <registerModels.successRegister> response
          localStorage.setItem('token', data.token.access)
          this.router.navigate([`profile/${data.userId}`])
        }

      })).subscribe()
    }
    else
    { 
      this.formError = true
      this.errorMsg = "Please complete the form"
      setTimeout(()=>{this.formError=false; this.errorMsg =  null},3000)
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

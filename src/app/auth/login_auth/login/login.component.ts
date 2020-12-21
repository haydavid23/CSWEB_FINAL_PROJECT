import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import * as loginModels from "./login.models"
import { mergeMap, catchError, tap, filter } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private router:Router, 
    private authSrv:AuthService) { }

  hide = true;
  parentForm:FormGroup
  formError:boolean = false
  errorMsg:string = null
  

  ngOnInit() {
    this.initForm()
  }

  navigateToRegister()
  {
    this.router.navigate(["authenticate/register"])
  }

  logUser(form:FormGroup)
  {
    if(form.valid)
    {
      let user:loginModels.LogginUser = form.value

     this.authSrv.logUser(user).pipe(
      catchError((error)=>{
        this.formError = true
        this.errorMsg = "Incorrect username/and or password"
        setTimeout(()=>{this.formError=false; this.errorMsg = null},3000)
        return of(error)
      }), 
      filter((error)=>{
        return !error["error"]
      }),tap((response:loginModels.successResponseLogin)=>{
  
        localStorage.setItem('token', JSON.stringify(response.access))
        this.router.navigate([`profile/${response.userId}`])
      })).subscribe()
  
    }
    else
    {
      this.formError = true
      this.errorMsg = "Please complete the form"
      setTimeout(()=>{this.formError=false; this.errorMsg = null},3000)
    }
    

  }

  initForm()
  {

    let email=""
    let password=""

    this.parentForm = new FormGroup({
      email:new FormControl(email, [Validators.required, Validators.email]),
      password:new FormControl(password, Validators.required)
    })
  }

  ngOnDestroy()
  {
    
  }

}

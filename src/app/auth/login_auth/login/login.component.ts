import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import * as loginModels from "./login.models"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private authSrv:AuthService) { }

  hide = true;
  parentForm:FormGroup
  errorMsg:boolean = false

  ngOnInit() {
    this.initForm()
  }

  navigateTo()
  {
    this.router.navigate(["authenticate/register"])
  }

  logUser(form:FormGroup)
  {
    if(form.valid)
    {
      let user:loginModels.LogginUser = form.value
      this.authSrv.logUser(user)
    }
    else
    {
      this.errorMsg = true
      setTimeout(()=>{this.errorMsg=false},3000)
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

}

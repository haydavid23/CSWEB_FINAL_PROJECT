import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private authSrv:AuthService) { }

  parentForm:FormGroup

  ngOnInit() {
    this.initForm()
  }

  navigateTo()
  {
    this.router.navigate(["authenticate/login"])
  }

  registerUser(form:FormGroup)
  {
    console.log("clicked")
    this.authSrv.registerUser()
    console.log(form)
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
      email:new FormControl(email, Validators.required),
      password:new FormControl(password, Validators.required)
    })
  }

}

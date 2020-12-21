import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as authModels from "./auth.models"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authSrv:AuthService, private router:Router, private httpClient:HttpClient) { }

  ngOnInit() {
    //redirects user to user profile if token is present in local storage
    let token = JSON.parse(localStorage.getItem("token"))

    if(token)
    {
      this.authSrv.getLoggedUser(token).pipe(catchError((error)=>{
        return of(error)
      }), filter((error)=>{
      
        if(!error["error"])
        {
          return true
        }
        return false
        
      }),tap((userInfo:authModels.loggedUser)=>{
        this.router.navigate([`profile/${userInfo.userId}`])
      })).subscribe()
      
    }
   
  }



}

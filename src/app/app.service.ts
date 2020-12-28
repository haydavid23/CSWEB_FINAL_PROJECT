import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { AppDialogMsgComponent } from './shared_components/error-component/app-dialog-msg/app-dialog-msg.component';
import {AppErrorMsgComponent} from "./shared_components/error-component/app-error-msg/app-error-msg.component"

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient:HttpClient,private dialog:MatDialog) { }


  verifyUserToken(user_id:number):Observable<any>
  {
    let token = JSON.parse(localStorage.getItem('token'))
    if(token != null)
    {
     return  this.httpClient.post("http://127.0.0.1:8000/api/token/verify/",{"token":token, "userId":user_id})
    }
    else
    {
      return of(false)
    }
  }

  openAppErrorMsg(errorMsg:string)
  {
    this.dialog.open(AppErrorMsgComponent,{disableClose:true, data:errorMsg})
  }

  openAppDialogMsg(msg:string)
  {
    this.dialog.open(AppDialogMsgComponent,{data:msg})
  }




}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as registerModels from  "./register_auth/register/register.models"
import * as logginModels from "./login_auth/login/login.models"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  registerUser(user:registerModels.RegisterUser):Observable<any>
  {
    return this.http.post("http://127.0.0.1:8000/register",user)
  }
  
  logUser(user:logginModels.LogginUser):Observable<any>
  {
    return this.http.post("http://127.0.0.1:8000/login",user)
  }

  getLoggedUser(token:string):Observable<any>
{
  const header = new HttpHeaders({
    "Authorization":`Bearer ${token}`
  })
  return this.http.get("http://127.0.0.1:8000/get_logged_user",{headers:header})
}

}

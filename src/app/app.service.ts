import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient:HttpClient) { }


  verifyUserToken():Observable<any>
  {
    let token = localStorage.getItem('token')
    if(token != null)
    {
     return  this.httpClient.post("http://127.0.0.1:8000/api/token/verify/",{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA4NzMxNDYwLCJqdGkiOiI1OWUwMzI1MDNhYWI0YzI0OGNiNTQ1MDA3MDVjZTQyYiIsInVzZXJfaWQiOjJ9.twXW8V4F8irYJKjsmhtEs0l7WVGOmcVpMUOWiGkdBKw"})
    }
    else
    {
      return of(false)
    }
}

}


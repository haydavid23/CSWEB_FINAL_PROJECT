import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient:HttpClient) { }


  verifyUserToken():Observable<any>
  {
    let token = JSON.parse(localStorage.getItem('token'))
    if(token != null)
    {
     return  this.httpClient.post("http://127.0.0.1:8000/api/token/verify/",{"token":token})
    }
    else
    {
      return of(false)
    }
}




}


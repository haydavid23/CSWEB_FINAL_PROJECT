import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = JSON.parse(localStorage.getItem("token"));
    if(token !== null)
    {
    return next.handle(httpRequest.clone({
      headers:httpRequest.headers.set("Authorization","Bearer "+ token)
    }));
  }
  else
  {
    return next.handle(httpRequest.clone())
  }

  }


}

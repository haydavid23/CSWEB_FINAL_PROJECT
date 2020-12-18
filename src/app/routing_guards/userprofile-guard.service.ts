import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { AppService } from '../app.service';

@Injectable()
export class UserProfileGuardService implements CanActivate{

 
  constructor(private appSrv:AppService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.appSrv.verifyUserToken().pipe(catchError((error)=>{console.log(error);return of(error)}),
     map((response)=>{
      if(!response || response["error"])
      {
        this._router.navigate(["authenticate"])
        return false
      }
      else{
      return true
      }
    }))

  }
}

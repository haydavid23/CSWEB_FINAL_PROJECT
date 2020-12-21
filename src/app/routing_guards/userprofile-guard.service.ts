import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { AppService } from '../app.service';
import * as fromApp from "../store/app.reducer"
import * as userProfileActions from "../user-profile/store/user_profile.actions"

@Injectable()
export class UserProfileGuardService implements CanActivate{

 
  constructor(private appSrv:AppService, private _router: Router, private store:Store<fromApp.AppState>) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.appSrv.verifyUserToken().pipe(catchError((error)=>{console.log(error);return of(error)}),
     map((response)=>{
       console.log(response)
      if(!response || response["error"])
      {
        this.store.dispatch(new userProfileActions.DeleteUser())
        this._router.navigate(["authenticate"])
        return false
      }
      else{
      
      return true
      }
    }))

  }
}

import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppService } from '../app.service';
import * as fromApp from "../store/app.reducer"
import * as userProfileActions from "../user-profile/store/user_profile.actions"

@Injectable()
export class UserProfileGuardService implements CanActivate{

 
  constructor(private appSrv:AppService, private _router: Router, private store:Store<fromApp.AppState>) {
  }

  userId:number = null

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
  try
  {
   this.userId = Number(next.paramMap["params"]["userId"])
  }
  catch
  {
    return false
  }

    return this.appSrv.verifyUserToken(this.userId).pipe(catchError((error)=>{return of(error)}),
     map((response)=>{
      if(!response || response["error"])
      {
    
        this.store.dispatch(new userProfileActions.DeleteUser())
        this._router.navigate(["authenticate"])
        return false
      }
      else if(response["userId"] !== this.userId)
      {
        this._router.navigate(["./page_not_found"])
        return false
      }

      else{
      
      return true
      }
    }))

  

  }
}

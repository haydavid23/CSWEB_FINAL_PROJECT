import { Injectable } from "@angular/core"
import { act, Actions, Effect, ofType } from "@ngrx/effects"
import { filter, mergeMap, withLatestFrom, tap, map, catchError } from "rxjs/operators"
import { Store } from '@ngrx/store'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { of,  forkJoin} from 'rxjs'
import { Router } from '@angular/router'
import * as userProfileActions from "../store/user_profile.actions"
import * as fromApp from "../../store/app.reducer"
import * as userProfileModels from "../user_profile.models"
import { AppService } from "src/app/app.service"




declare let alertify;


@Injectable()
export class UserProfileEffects {

  constructor(private actions$: Actions,
    private http:HttpClient,
    private router:Router,
    private store: Store<fromApp.AppState>,
    private appSrv:AppService
  ) { }



  @Effect() getLoggedUser = this.actions$.pipe(ofType<userProfileActions.GetLoggedUser>(userProfileActions.GET_LOGGED_USER), mergeMap((action)=>{
 

    return this.http.get("http://127.0.0.1:8000/get_logged_user")
  }),map((userInfo:userProfileModels.loggedUser)=>{
    console.log(userInfo)
    return new userProfileActions.SaveLoggedUser(userInfo)
  }))


  @Effect() saveUserPins= this.actions$.pipe(ofType<userProfileActions.InitSaveUserPins>(userProfileActions.INIT_SAVE_USER_PIN), mergeMap((action:userProfileActions.InitSaveUserPins)=>{
    let pins = action.payload
    console.log(pins)
    return this.http.post("http://127.0.0.1:8000/save_user_pins",pins).pipe(map((response:{[msg:string]:string})=>{
      if(response["error"])
      {
        return new userProfileActions.SaveUserPinsResponse(response["error"])
      }
      else
      {
        
        this.store.dispatch(new userProfileActions.SaveUserPins(pins))
      }
  
    }))
  }))

  }



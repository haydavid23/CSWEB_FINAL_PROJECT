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
import * as my_map_models from "../my-map/my_map.models"




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


  @Effect() initSaveUserPins= this.actions$.pipe(ofType<userProfileActions.InitSaveUserPins>(userProfileActions.INIT_SAVE_USER_PIN), mergeMap((action:userProfileActions.InitSaveUserPins)=>{
    let pins = action.payload
    return this.http.post("http://127.0.0.1:8000/save_user_pins",pins)
  }),mergeMap((response:{[msg:string]:string})=>{
    if(response["error"])
    {
      return [new userProfileActions.SaveUserPinsResponse(response["error"])]
    }
    else
    {
      
      return [new userProfileActions.GetUserPins(),new userProfileActions.SaveUserPinsResponse("success")]
    }

  }))


  @Effect({dispatch:false}) getUserPins= this.actions$.pipe(ofType<userProfileActions.GetUserPins>(userProfileActions.GET_USER_PINS), mergeMap((action:userProfileActions.GetUserPins)=>{
  
    return this.http.get<my_map_models.pins[] | {[error:string]:string}>("http://127.0.0.1:8000/get_user_pins")
  }),map((response)=>{
      if(response["error"])
      {
        this.appSrv.openAppErrorMsg(response["error"])
        // logic where there is an error getting pins
      }
      else
      {

        this.store.dispatch(new userProfileActions.SaveUserPins(<my_map_models.pins[]>response))
      }
  }))

  }



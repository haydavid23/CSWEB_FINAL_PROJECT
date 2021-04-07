import { Injectable } from "@angular/core"
import {  Actions, Effect, ofType } from "@ngrx/effects"
import { filter, mergeMap, withLatestFrom, tap, map, catchError, switchMap } from "rxjs/operators"
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
    let locationSelected = action.payload
    console.log(locationSelected)
    return this.http.post("http://127.0.0.1:8000/save_user_pin",locationSelected)
  }),mergeMap((response:{[msg:string]:string})=>{
    console.log(response)
    if(response["error"])
    {

      return [new userProfileActions.SavePinResponse(response["error"])]
    }
    else
    {
      
      return [new userProfileActions.GetUserPins(),new userProfileActions.SavePinResponse("success")]
    }

  }))



  @Effect({dispatch:true}) createNewTrip= this.actions$.pipe(ofType<userProfileActions.CreateNewTrip>(userProfileActions.CREATE_NEW_TRIP), 
  switchMap((action:userProfileActions.CreateNewTrip)=>{

    return this.http.post("http://127.0.0.1:8000/createNewTrip",{...action.payload}).pipe(map((response:{[msg:string]:string})=>{
      if(response.msg == "success")
      {
        return new userProfileActions.SaveCurrentTrip(action.payload)
      }
      else
      {
        return new userProfileActions.CreateNewTripFail()
      }
  
    }))
  }))





  @Effect() getUserPins= this.actions$.pipe(ofType<userProfileActions.GetUserPins>(userProfileActions.GET_USER_PINS), mergeMap((action:userProfileActions.GetUserPins)=>{
  
    return this.http.get<my_map_models.pins[] | {[error:string]:string}>("http://127.0.0.1:8000/get_user_pins")
  }),mergeMap((response)=>{

      if(response["error"])
      {
        return [new userProfileActions.DbGetResponse("fail")]

      }
      else
      {
   
        return [new userProfileActions.DbGetResponse("success"),new userProfileActions.SaveUserPins(<my_map_models.pins[]>response)]
        
        
      }
  }))




  @Effect() deletePin= this.actions$.pipe(ofType<userProfileActions.InitDeletedPin>(userProfileActions.INIT_DELETED_PIN), mergeMap((action:userProfileActions.InitDeletedPin)=>{
    
    return this.http.post("http://127.0.0.1:8000/delete_user_pin",action.payload).pipe(mergeMap((response)=>{
      if(response["error"])
      { 
  
        this.appSrv.openAppErrorMsg("Unable to delete pin")
        return []
      }
      else
      { 
        this.appSrv.openAppDialogMsg("Pin(s) Deleted")
        return [new userProfileActions.GetUserPins()]
        
      }

  }))
 
  }))


  @Effect({dispatch:false}) setUserHometown= this.actions$.pipe(ofType<userProfileActions.SetUserHomeTown>(userProfileActions.SET_USER_HOMETOWN), mergeMap((action:userProfileActions.SetUserHomeTown)=>{
      let coord = {"lat":action.payload.lat, "lng" :action.payload.lng}

    return this.http.post("http://127.0.0.1:8000/set_user_hometown",coord).pipe(map((response)=>{
  
      if(response["error"])
      {
          this.appSrv.openAppErrorMsg(response["error"])
      }
      else
      {
        this.store.dispatch(new userProfileActions.GetUserHomeTown())
       
       
      }
  })) 
 
  }))

  @Effect() getUserHometown= this.actions$.pipe(ofType<userProfileActions.GetUserHomeTown>(userProfileActions.GET_USER_HOMETOWN), mergeMap((action:userProfileActions.GetUserHomeTown)=>{
    
  return this.http.get("http://127.0.0.1:8000/get_user_hometown").pipe(mergeMap((response:my_map_models.UserHometown | string)=>{
      console.log(response)

    if(response["error"])
    {
      return [new userProfileActions.SaveDbResUserHomeTown(response["error"])]
    }
    else
    {
      return [new userProfileActions.SaveUserHomeTown(<my_map_models.UserHometown>response)]
    }

}))

}))



@Effect({dispatch:false}) uploadPictures= this.actions$.pipe(ofType<userProfileActions.UploadPictures>(userProfileActions.UPLOAD_PICTURES), mergeMap((action:userProfileActions.UploadPictures)=>{
 
  return this.http.post("http://127.0.0.1:8000/uploadTripPictures",action.payload).pipe(catchError((error)=>{
    this.appSrv.openAppErrorMsg("Server Error. Please Try again")
    return of(error) 
  }), filter((error)=>{
    
    if(error.error){
      this.appSrv.openAppErrorMsg(error.error)
    }
    
    return !error.error;
    
  }), map((res:{lat:number, lng:number}[])=>{
    return forkJoin(res.map((newLocation:{lat:number, lng:number})=>{
      //marks new pins on map
      this.store.dispatch(new userProfileActions.InitSaveUserPins({...newLocation, hometown:false, infoContent:"test"}))
     
    }))
    


  // let arr = Uint8Array.from(atob(res["msg"]), c => c.charCodeAt(0))
  // let blob = new Blob([arr],{type:"image/jpg"});
  // window.open(URL.createObjectURL(blob))
  
  }))
}))

  }



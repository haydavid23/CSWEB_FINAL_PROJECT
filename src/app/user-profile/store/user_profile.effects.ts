import { Injectable } from "@angular/core"
import {  Actions, Effect, ofType } from "@ngrx/effects"
import { filter, mergeMap, withLatestFrom, tap, map, catchError, switchMap } from "rxjs/operators"
import { State, Store } from '@ngrx/store'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { of,  forkJoin, iif} from 'rxjs'
import { ActivatedRoute, Route, Router } from '@angular/router'
import * as userProfileActions from "../store/user_profile.actions"
import * as fromApp from "../../store/app.reducer"
import * as userProfileModels from "../user_profile.models"
import { AppService } from "src/app/app.service"
import * as my_map_models from "../my-map/my_map.models"
import { MatDialog } from "@angular/material"
import { PinPictureDialogComponent } from "src/app/components/pin-picture-dialog/pin-picture-dialog.component"
import { DialogLoadingSpinnerComponent } from "src/app/components/dialog-loading-spinner/dialog-loading-spinner.component"
import { MsgDialogComponent } from "src/app/components/msg-dialog/msg-dialog.component"





declare let alertify;


@Injectable()
export class UserProfileEffects {

  constructor(private actions$: Actions,
    private http:HttpClient,
    private router:Router,
    private store: Store<fromApp.AppState>,
    private appSrv:AppService,
    private route:ActivatedRoute,
    private dialog:MatDialog
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
  }),switchMap((response:{[msg:string]:string})=>{
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

    return this.http.post("http://127.0.0.1:8000/createNewTrip",{...action.payload}).pipe(switchMap((response:{[msg:string]:string})=>{

      if(response.msg == "success")
      {
        return [new userProfileActions.SaveNewTrip(action.payload), new userProfileActions.GetUserTrips()]
      }
      else
      {
        return [new userProfileActions.CreateNewTripFail()]
      }
  
    }))
  }))





  @Effect() getUserPins= this.actions$.pipe(ofType<userProfileActions.GetUserPins>(userProfileActions.GET_USER_PINS), switchMap((action:userProfileActions.GetUserPins)=>{
  
    return this.http.get<my_map_models.pins[] | {[error:string]:string}>("http://127.0.0.1:8000/get_user_pins")
  }),switchMap((response)=>{

      if(response["error"])
      {
        return [new userProfileActions.DbGetResponse("fail")]

      }
      else
      {
   
        // return [new userProfileActions.DbGetResponse("success"),new userProfileActions.SaveUserPins(<my_map_models.pins[]>response)]
        return [new userProfileActions.DbGetResponse("success"),new userProfileActions.SaveResponsePins(<my_map_models.Pin[]>response)]
        
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



@Effect({dispatch:false}) uploadPictures= this.actions$.pipe(ofType<userProfileActions.UploadPictures>(userProfileActions.UPLOAD_PICTURES), switchMap((action:userProfileActions.UploadPictures)=>{
  this.dialog.open(DialogLoadingSpinnerComponent,{data:{}})
  return this.http.post("http://127.0.0.1:8000/uploadTripPictures",action.payload).pipe(catchError((error)=>{
    this.appSrv.openAppErrorMsg("Server Error. Please Try again")
    return of(error) 
  }), filter((error)=>{
    
    if(error.error){
      this.appSrv.openAppErrorMsg(error.error)
    }
    
    return !error.error;
    
  }), tap(()=>{
    this.dialog.closeAll();
    this.router.navigate([".."],{relativeTo:this.route});
  })

  
  )
}))




// @Effect({dispatch:true}) saveTripPin= this.actions$.pipe(ofType<userProfileActions.SaveTripPin>(userProfileActions.SAVE_TRIP_PIN), 
// withLatestFrom(this.store.select("userProfile")),switchMap(([action, state])=>{
  
//   let newPin:my_map_models.pins ={...action.payload, tripName:state.newTrip.tripName}
//   return this.http.post("http://127.0.0.1:8000/saveTripPin",newPin).pipe(switchMap((response:{[msg:string]:string})=>{
//     console.log(response)
//     if(response["error"])
//     {

//       return [new userProfileActions.SavePinResponse(response["error"])]
//     }
//     else
//     {
      
//       // return [new userProfileActions.GetUserPins(),new userProfileActions.SavePinResponse("success"), new userProfileActions.GetUserTrips()]
//       return [new userProfileActions.SavePinResponse("success"), new userProfileActions.GetUserTrips()]
//     }

//   })
//   )


// }))



@Effect({dispatch:true}) saveTripPin= this.actions$.pipe(ofType<userProfileActions.SaveTripPin>(userProfileActions.SAVE_TRIP_PIN), 
withLatestFrom(this.store.select("userProfile")),switchMap(([action, state])=>{
  let newPin:my_map_models.pins ={...action.payload, tripName:state.newTrip?state.newTrip.tripName:state.editedTrip.tripName}
  return iif(()=> state.newTrip !== null,
  
  this.http.post("http://127.0.0.1:8000/saveTripPin",newPin).pipe(switchMap((response:{[msg:string]:string})=>{
      console.log(response)
      if(response["error"])
      {
  
        return [new userProfileActions.SavePinResponse(response["error"])]
      }
      else
      {
        return [new userProfileActions.GetUserPins(),new userProfileActions.SavePinResponse("success"), new userProfileActions.GetUserTrips()]
      }
  
    })
    ),
    this.http.post("http://127.0.0.1:8000/saveTripPin",newPin).pipe(switchMap((response:{[msg:string]:string})=>{
      
      if(response["error"])
      {
  
        return [new userProfileActions.SavePinResponse(response["error"])]
      }
      else
      {
        console.log("edited trip")
        return [new userProfileActions.SavePinResponse("success"), new userProfileActions.GetUserTrips(),new userProfileActions.GetUserPins()]
      }
  
    })
    )
    
  )
  
}))


@Effect({dispatch:true}) getUserTrips= this.actions$.pipe(ofType<userProfileActions.GetUserTrips>(userProfileActions.GET_USER_TRIPS), 
withLatestFrom(this.store.select("userProfile")),switchMap(([action, state])=>{
  console.log("userTrips")

  return this.http.get("http://127.0.0.1:8000/getUserTrips").pipe(map((response:my_map_models.Trip[])=>{
  console.log(response)
  return new userProfileActions.SaveUserTrips(response)
}))


}))





@Effect({dispatch:false}) getPinPicture= this.actions$.pipe(ofType<userProfileActions.GetPinPicture>(userProfileActions.GET_PIN_PICTURE), switchMap((action:userProfileActions.GetPinPicture)=>{
   this.dialog.open(DialogLoadingSpinnerComponent,{data:{}})
  return this.http.post("http://127.0.0.1:8000/getPinPicture",action.payload).pipe(catchError((error)=>{
    return of("Error Getting Picture")
  }))

}), tap((response)=>{

  if(response !== "Error Getting Picture")
  {
    let newArr = Uint8Array.from(atob(response["encodedPic"]), c=>c.charCodeAt(0))
    let blob:Blob = new Blob([newArr],{type:"image/png"})
    // let url = window.open(URL.createObjectURL(blob))
    let url = URL.createObjectURL(blob)
    this.dialog.closeAll()
    this.dialog.open(PinPictureDialogComponent,{data:{picture:url}})
  }
  else
  {
    this.dialog.closeAll()
    this.dialog.open(MsgDialogComponent,{data:response})
  }


 

})
)







  }



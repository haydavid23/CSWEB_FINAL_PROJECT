import { Component, OnDestroy, OnInit } from '@angular/core';
import * as userProfileActions from "../store/user_profile.actions"
import * as fromApp from "../../store/app.reducer"
import {Store } from '@ngrx/store';
import * as models from "./my_map.models"
import {  Actions, ofType } from '@ngrx/effects';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit, OnDestroy {
  map:any

  initLat =  25.761681;
  initLng = -80.191788;
  actionSavePinSub:Subscription;
  storeSub:Subscription
  deleteDBResSub:Subscription
  saveDBResSub:Subscription
  disableMapClick:boolean = false

  dbResponseError = new BehaviorSubject<any>(null)
  dbResponseErrorErrorSub:Subscription;


  pins:Array<models.pins> = []
  newPins:Array<models.pins> = []
  deletedPins:Array<models.DeletedPin> = []

  constructor(private store:Store<fromApp.AppState>, private actions$:Actions, private appSrv:AppService) { }

  ngOnInit() {

    //listens for db delete pin response
    this.deleteDBResSub = this.actions$.pipe(
      ofType<userProfileActions.DeletePinResponse>(userProfileActions.DELETE_PIN_RESPONSE)).subscribe((action) => {
      
          
        if(action.payload == "success")
        {
          this.appSrv.openAppDialogMsg("Pin(s) Deleted")
          this.newPins = []
          this.deletedPins = []
          
        }
        else
        {
          this.appSrv.openAppErrorMsg("Unable to delete pin")
          this.deletedPins = []
          this.store.dispatch(new userProfileActions.GetUserPins())
        }
    });

        //listens for db save pin response
        this.saveDBResSub = this.actions$.pipe(
          ofType<userProfileActions.SavePinResponse>(userProfileActions.SAVE_PIN_RESPONSE)).subscribe((action) => {
            if(action.payload == "unable to save pins")
            {
              this.appSrv.openAppErrorMsg("Unable to save pins")
              this.newPins = []
            }
            else if(action.payload == "Database error. Unable to get pin locations")
            { 
              this.appSrv.openAppErrorMsg("Error loading pins. Please try again.")
              this.newPins = []
              this.dbResponseError.next(true)
              this.disableMapClick = true
              
            }
            else
            {
              this.appSrv.openAppDialogMsg("New pin(s) added!")
              this.newPins = []
              this.dbResponseError.next(false)
            }
           
        });



  
    this.storeSub = this.store.select("userProfile").subscribe((state)=>{
       
        if(state.locationPins != null)
        {
          
          this.pins = state.locationPins
        }
    
    })
  }

  
  locationSelected(event:MouseEvent)
  {
    if(!this.disableMapClick){
    this.pins = [...this.pins,{lat:event['coords'].lat, lng: event['coords'].lng,infoContent:"test",markerDragable:true}]
    this.newPins = [...this.newPins,{lat:event['coords'].lat, lng: event['coords'].lng,infoContent:"test",markerDragable:true}]
    }
    
  }

  pinClicked(pin:models.DeletedPin)
  {
    this.deletePins(pin)


  }

  deletePins(pin)
  { 

    this.pins = this.pins.filter((pinSaved)=>
    { 
      
      return pinSaved.lng !== pin['longitude'] || pinSaved.lat !== pin['latitude']
   
    })

    //checks if deleted pin is saved in db.
    let findEl = this.newPins.filter((new_pin)=>{return pin.latitude == new_pin.lat || pin.longitude == new_pin.lng  })
    if(findEl.length == 0)
    {
      this.deletedPins.push({"latitude":pin.latitude, "longitude":pin.longitude})
    }

    this.newPins = this.newPins.filter((pinSaved)=>
    { 
      return pinSaved.lng !== pin['longitude'] || pinSaved.lat !== pin['latitude']
   
    })

   

  }

  mapReady(event)
  {
    this.map = event
   
   
    this.dbResponseErrorErrorSub =this.dbResponseError.subscribe((msg)=>{
      if(msg)
      {
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('getError'));
      }
    })
      
    
    this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('savePins'));
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('travelInfo'));
 
    
  }

  savePins()
  {
    if(this.newPins.length>0){
    this.store.dispatch(new userProfileActions.InitSaveUserPins(this.newPins))
    }
    if(this.deletedPins.length>0)
    {
      this.store.dispatch(new userProfileActions.DeletedPins(this.deletedPins))
    }
   
    
  }

  ngOnDestroy()
  {
 
    this.storeSub.unsubscribe()
    this.dbResponseErrorErrorSub.unsubscribe()
    this.deleteDBResSub.unsubscribe()
    this.saveDBResSub.unsubscribe()
  }

}

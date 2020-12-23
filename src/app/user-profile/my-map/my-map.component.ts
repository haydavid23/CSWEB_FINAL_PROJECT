import { Component, OnDestroy, OnInit } from '@angular/core';
import * as userProfileActions from "../store/user_profile.actions"
import * as fromApp from "../../store/app.reducer"
import { Store } from '@ngrx/store';
import * as models from "./my_map.models"
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
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
  actionsSub:Subscription;
  storeSub:Subscription

  pins:Array<models.pins> = []
  newPins:Array<models.pins> = []
  deletedPins:Array<models.pins> = []

  constructor(private store:Store<fromApp.AppState>, private actions$:Actions, private appSrv:AppService) { }

  ngOnInit() {

    this.storeSub = this.store.select("userProfile").subscribe((state)=>{
        if(state.locationPins != null)
        {
          this.pins = state.locationPins
        }
        
    })


    // listen for save pin action response
    this.actionsSub = this.actions$.pipe(ofType<userProfileActions.SaveUserPinsResponse>(userProfileActions.SAVE_USER_PIN_RESPONSE)).subscribe(
      (response)=>{
      
        if(response.payload == "unable to save pins")
        {
          this.appSrv.openAppErrorMsg(response.payload)
        }
        else
        {
          this.newPins = []
        }
    })
  }

  

  locationSelected(event:MouseEvent)
  {
    this.pins = [...this.pins,{lat:event['coords'].lat, lng: event['coords'].lng,infoContent:"test",markerDragable:true}]
    this.newPins = [...this.newPins,{lat:event['coords'].lat, lng: event['coords'].lng,infoContent:"test",markerDragable:true}]

    
  }

  pinClicked(event)
  {
    console.log(event)
  }

  mapReady(event)
  {
    this.map = event
    this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('savePins'));
  }

  savePins()
  {
    this.store.dispatch(new userProfileActions.InitSaveUserPins(this.newPins))
   
    
  }

  ngOnDestroy()
  {
    this.actionsSub.unsubscribe()
    this.storeSub.unsubscribe()
  }

}

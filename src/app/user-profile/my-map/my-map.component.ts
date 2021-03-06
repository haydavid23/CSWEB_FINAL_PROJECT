import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as userProfileActions from "../store/user_profile.actions"
import * as fromApp from "../../store/app.reducer"
import {Store } from '@ngrx/store';
import * as models from "./my_map.models"
import {  Actions, ofType } from '@ngrx/effects';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AgmInfoWindow, AgmMarker} from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit, OnDestroy {

  @ViewChild('infoWindow', {static: false}) infowindow:AgmInfoWindow;
  map:google.maps.Map

  actionSavePinSub:Subscription;
  initLat:number = null;
  initLng:number = null;
  storeSub:Subscription;
  saveDBResSub:Subscription;
  getDBResSub:Subscription;
  hometown:models.UserHometown = null;
  canSelectPins:boolean = false

  city:string;
  state:string;
  country:string;
  fullLocationName:string = ""
  
  dbResponseError = new BehaviorSubject<any>(null);
  dbResponseErrorErrorSub:Subscription;

  infoWindowOpened:boolean = false
  previous_info_window = null
  tripState:models.UserTrip

  private geoCoder;
  selectShowAll:boolean =false;
  currentTripSel:number | string = "All";
  addingPins:boolean = false;


  pins:Array<models.pins> = [];
  userTripsPins:models.Pin[];
  

  constructor(private store:Store<fromApp.AppState>, 
    private actions$:Actions,
     private appSrv:AppService, 
     private changeDetector:ChangeDetectorRef,
     private router:Router,
     private route:ActivatedRoute,
      private mapsApiLoader:MapsAPILoader) {
      this.mapsApiLoader.load().then(()=>{
        this. geoCoder = new google.maps.Geocoder
      })

   }

  ngOnInit() {
    
    this.store.dispatch(new userProfileActions.GetUserPins())
    this.store.dispatch(new userProfileActions.GetUserTrips())
        //listens for db save pin response
        this.saveDBResSub = this.actions$.pipe(
          ofType<userProfileActions.SavePinResponse>(userProfileActions.SAVE_PIN_RESPONSE)).subscribe((action) => {
            
            if(action.payload == "unable to save pins")
            {
              this.appSrv.openAppErrorMsg("Unable to save pins")
            }
            else
            {
              this.appSrv.openAppDialogMsg("New pin(s) added!")
              this.dbResponseError.next(false)
            }
           
        });

  
    this.storeSub = this.store.select("userProfile").subscribe((state)=>{
     this.tripState = state.userTrips?state.userTrips:{trips:null, tripPins:[]};
      
     if(this.currentTripSel == "All")
     {
      this.userTripsPins = state.userTrips?state.userTrips.tripPins:[];
     }
     else
     {

         this.userTripsPins = this.tripState.tripPins.filter((pin)=>{
  
          return pin.trip_id == this.currentTripSel
        })


     }

    
      //resets marker opened infowindow
      this.previous_info_window = null
     

      if(state.newTrip == null)
      {
          if(state.editedTrip && this.addingPins)
          {
            this.canSelectPins= true;
          }
          // else
          // {
  
            
          //   this.canSelectPins = false;
          // }

          
      }
      else
      {

        this.map.controls[google.maps.ControlPosition.TOP_CENTER]['Kb'][0].hidden = true
        this.map.controls[google.maps.ControlPosition.TOP_LEFT]['Kb'][0].hidden = true
        let doneBtn:HTMLElement = this.map.controls[google.maps.ControlPosition.TOP_LEFT]['Kb'][1]

        doneBtn.hidden = false;
        doneBtn.style.left = '0px'

        this.canSelectPins = true;
      }
       
        if(state.locationPins != null)
        {
          
          this.pins = state.locationPins
          
        }
          if(state.pinsGetFailed == "fail")
        { 
          this.appSrv.openAppErrorMsg("Error loading pins. Please try again.")
          this.dbResponseError.next(true)
          
        }

        if(state.hometownGetFailed == "Database error. Unable to get pin hometown")
        {
          this.appSrv.openAppErrorMsg("Database error. Unable to get pin hometown")
        }
          
        // adds hometown obj to pins array
          this.hometown = state.hometown
          if(this.hometown){
          this.pins =  this.pins.filter((pin)=>{
            
            return pin.lat !== this.hometown.lat && pin.lng !== this.hometown.lng
          })
          this.pins = [...this.pins,{...this.hometown,hometown:true}]
          this.initLat = this.hometown.lat
          this.initLng = this.hometown.lng
        }
 

         
        
    })
  }

  getLocationName(latitude, longitude) {
    this.fullLocationName = null
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {


      if (status === 'OK') {
        if (results.length > 1) {
       
            for(let i = 0; i<results[0].address_components.length; i++){
                let addressComponent = results[0].address_components[i]
     
                if(addressComponent.types[0] == "establishment")
                { 
                  
                  this.fullLocationName = addressComponent.long_name
                  break
                }

                if(addressComponent.types[0] == "locality")
                {
                  this.city = addressComponent.long_name + ","
                  continue
                }
                else if(addressComponent.types[0] ==  "administrative_area_level_3" && !this.city)
                {
                  this.city = addressComponent.long_name + ","
                  continue
                }
                if(addressComponent.types[0] == "administrative_area_level_1")
                {
                  this.state = addressComponent.long_name + ","
                  continue
                }
                if(addressComponent.types[0] == "country")
                {
                  this.country = addressComponent.long_name
                  continue
                }
                
            }
   
            if(this.fullLocationName == null)
            {
              this.fullLocationName =`${this.city?this.city:""} ${this.state?this.state:""} ${this.country}`
             
            }
   
        } else {
          window.alert('No results found');
        }
      } 
    
    });
  }

  trackByLatLng(index: number, pin: any): number {    
    
      return pin.lat && pin.lng   
    
     }  

  
  locationSelected(event:MouseEvent)
  { 

    if(this.canSelectPins){
  
      if(this.previous_info_window){

        if(!this.previous_info_window.isOpen){
          let location= {lat:event['coords'].lat, lng: event['coords'].lng,infoContent:"test",markerDragable:true}
          // this.store.dispatch(new userProfileActions.InitSaveUserPins(location))
          this.store.dispatch(new userProfileActions.SaveTripPin(location))
          }
        }
        else
        {
          let location= {lat:event['coords'].lat, lng: event['coords'].lng,infoContent:"test",markerDragable:true}
          // this.store.dispatch(new userProfileActions.InitSaveUserPins(location))
          this.store.dispatch(new userProfileActions.SaveTripPin(location))
     
        }

    }
    
    
  

  
    
  }

  pinClicked(pin, infoWindow:AgmMarker)
  {
    
    infoWindow.infoWindow.first.isOpen = true

    if(this.previous_info_window == null){
      this.previous_info_window = infoWindow.infoWindow.first

    }
    else{
    this.previous_info_window.close()
    this.previous_info_window =  infoWindow.infoWindow.first
  
    }


      this.city = null;
      this.state = null;
      this.country = null;
      this.getLocationName(pin["lat"],pin["lng"])
  }




  setHome(lat, lng)
  {
  
      let coords = {lat:lat, lng:lng}
      this.store.dispatch(new userProfileActions.SetUserHomeTown(coords))

      
  }

  deletePin(pin,info)
  { 
  
    this.store.dispatch(new userProfileActions.InitDeletedPin(pin))

  }

  navigateToDetails()
  {
    this.router.navigate(["../details/france"],{relativeTo:this.route})
  }

  tripDone()
  {
    this.canSelectPins = false;
    this.selectShowAll = true;
    this.addingPins = false;
    this.store.dispatch(new userProfileActions.ResetNewTrip())
    this.map.controls[google.maps.ControlPosition.TOP_LEFT]['Kb'][1].hidden = true
    this.map.controls[google.maps.ControlPosition.TOP_LEFT]['Kb'][0].hidden = false
    this.map.controls[google.maps.ControlPosition.TOP_CENTER]['Kb'][0].hidden = false

    
 

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
      
  
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('newTripBtn'));
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('tripDoneBtn'));
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('select-trip'));


    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('addPins'));
    this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][0].hidden = false;
    this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][1].hidden = true;
    this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][2].hidden = true;

   

   
  }

  addPins()
  {
    this.canSelectPins = true;
    this.addingPins = true;
    this.selectShowAll = false;

    this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][2].hidden = true;
    this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][0].hidden = true;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER]["Kb"][0].hidden = true;
 
    this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][1].hidden = false;
    this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][1].style.left="0px"
    

  }


  tripChanged(value:number|string)
  {
    // this.canSelectPins = false
    this.currentTripSel = value
    
    
    if(this.map){


    if(this.currentTripSel == "All")
    {
      this.map.controls[google.maps.ControlPosition.TOP_LEFT]['Kb'][0].hidden = false;
      this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][2].hidden = true;
      this.userTripsPins = this.tripState.tripPins

      
    } 
    else{
      
      this.map.controls[google.maps.ControlPosition.TOP_LEFT]['Kb'][0].hidden = true;
      this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][2].hidden = false;
      this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][2].style.left ="0px"
      // this.map.controls[google.maps.ControlPosition.TOP_LEFT]["Kb"][2].style.bottom = "0px"
     
        let trip= this.tripState.trips.filter((trip)=>{return trip.id == value})[0]

        this.store.dispatch(new userProfileActions.SaveEditedTrip({tripName:trip['trip_name'],tripDescription:null, tripStartDate:null, tripEndDate:null}))
        this.userTripsPins = this.tripState.tripPins.filter((pin)=>{
  
      return pin.trip_id == value
    })

  }
    }

    
  }

  ngOnDestroy()
  {
 
    this.storeSub.unsubscribe()
    this.dbResponseErrorErrorSub.unsubscribe()
    this.saveDBResSub.unsubscribe()
  }

}

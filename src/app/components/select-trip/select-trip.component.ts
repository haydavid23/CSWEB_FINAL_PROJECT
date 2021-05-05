import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import * as mapModels from "../../user-profile/my-map/my_map.models"

@Component({
  selector: 'app-select-trip',
  templateUrl: './select-trip.component.html',
  styleUrls: ['./select-trip.component.css']
})
export class SelectTripComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() userTrips: mapModels.UserTrip[]
  @Input() showAll:boolean
  @Output() trip_selected: EventEmitter<number|string> = new EventEmitter()
 

  selectValue:number |string = "All"

  ngOnInit() {

  }

  ngOnChanges(changes:SimpleChanges)
  {
 
    
    if(changes["showAll"])
    {
      
      if(changes["showAll"].currentValue)
      {
        this.selectValue = "All"
        console.log(this.selectValue)
        this.trip_selected.next("All")
      
      }
      

    }
    
  }

  tripSelected(value:MatSelectChange)
  {
   
    this.trip_selected.next(value.value)
    
  }

}

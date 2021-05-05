import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as userProfileActions from "../../user-profile/store/user_profile.actions"


 @Component({
  selector: 'app-assign-trip-btn',
  templateUrl: './assign-trip-btn.component.html'
})
export class AssignTripDialogBtn {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AssignTripDialogComponent, {data:"test inject"});
  }
}

@Component({
  selector: 'app-assign-trip-dialog',
  templateUrl: './assign-trip-dialog.component.html',
  styleUrls: ['./assign-trip-dialog.component.css']
})
export class AssignTripDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data:string, private store:Store) {}

  newTripForm:FormGroup

  
 
ngOnInit()
{
  this.initForm()
}

initForm()
{
  this.newTripForm = new FormGroup({
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
    tripName: new FormControl(null, Validators.required),
    tripDescription: new FormControl()
  })
}

  createNewTrip()
  {
    
    this.store.dispatch(new userProfileActions.CreateNewTrip(this.newTripForm.value))
  }

}
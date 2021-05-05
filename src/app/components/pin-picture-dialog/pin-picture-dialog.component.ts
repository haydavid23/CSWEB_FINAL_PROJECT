import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromUserProfile from "../../user-profile/store/user_profile.reducer"
import * as userProfileActions from "../../user-profile/store/user_profile.actions"
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'pinPicBtn',
  templateUrl: 'pinPinctureBtn.component.html'
})
export class PinPictureBtnDialog {
  @Input() pinId:number

  constructor(public dialog: MatDialog, private store:Store<fromUserProfile.State>){}


  openPinPictureDialog()
  {

    this.store.dispatch(new userProfileActions.GetPinPicture(this.pinId))
  }

}

@Component({
  selector: 'app-pin-picture-dialog',
  templateUrl: './pin-picture-dialog.component.html',
  styleUrls: ['./pin-picture-dialog.component.css']
})
export class PinPictureDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {picture:any}, private store:Store<fromUserProfile.State>, private domSanitazer:DomSanitizer){}
  // constructor(@Inject(MAT_DIALOG_DATA) public data: {tripName:number, picture:Blob}, private store:Store<fromUserProfile.State>){}

  imageUrl:any
  ngOnInit()
  {
    this.imageUrl = this.domSanitazer.bypassSecurityTrustUrl(this.data.picture)
    
    // this.store.dispatch(new userProfileActions.GetPinPicture(this.data.tripName))
    
  }
}

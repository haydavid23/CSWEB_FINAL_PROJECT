import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../store/app.reducer"
import * as user_profileActions from  "../../../user-profile/store/user_profile.actions"

@Component({
  selector: 'app-app-error-msg',
  templateUrl: './app-error-msg.component.html',
  styleUrls: ['./app-error-msg.component.css']
})
export class AppErrorMsgComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private store:Store<fromApp.AppState>) {}

  ngOnInit() {
    
  }

  closeModal()
  {
    if(this.data == "unable to save pins")
    {
    
      this.store.dispatch(new user_profileActions.GetUserPins())
    }
    if(this.data == "Database error. Unable to get pin locations")
    {
        this.store.dispatch(new user_profileActions.SaveUserPins([]))
    }
  }

  

}





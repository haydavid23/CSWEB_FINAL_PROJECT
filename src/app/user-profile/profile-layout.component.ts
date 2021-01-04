import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as appState from "../store/app.reducer"
import * as userProfileActions from "./store/user_profile.actions"

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit,OnDestroy {

  constructor(private router:Router, private store:Store<appState.AppState> ,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

    this.store.dispatch(new userProfileActions.GetLoggedUser())
    this.store.dispatch(new userProfileActions.GetUserPins())
    this.store.dispatch(new userProfileActions.GetUserHomeTown())
    
  }

  mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;

  logout()
  {
    this.router.navigate(["./"])
    localStorage.removeItem('token')

  }
 

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

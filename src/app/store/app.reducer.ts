import { ActionReducerMap } from '@ngrx/store'
import { AppService } from '../app.service'
import * as fromUserProfile from "../user-profile/store/user_profile.reducer"


export interface AppState{
   userProfile:fromUserProfile.State

}


export const appReducer:ActionReducerMap<AppState> ={
    userProfile:fromUserProfile.userProfileReducer
}
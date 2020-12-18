import * as UserProfileActions from "../store/user_profile.actions"

export interface State
{
    loggedUser:string;


}

const initialState:State = {
    loggedUser:null,


}

export function userProfileReducer(state:State=initialState, action:UserProfileActions.UserProfileUserActions)
{
    switch(action.type)
    {   
        case(UserProfileActions.SAVE_LOGGED_USER):
        return {...state, loggedUser:action.payload}

        default: return state
    }
}
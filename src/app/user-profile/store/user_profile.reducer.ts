import * as UserProfileActions from "../store/user_profile.actions"

export interface State
{
    loggedUserFirstName:string;
    loggedUserId:number


}

const initialState:State = {
    loggedUserFirstName:null,
    loggedUserId:null


}

export function userProfileReducer(state:State=initialState, action:UserProfileActions.UserProfileUserActions)
{
    switch(action.type)
    {   
        case(UserProfileActions.SAVE_LOGGED_USER):
        return {...state, loggedUserFirstName:action.payload.firstName, loggedUserId:action.payload.userId}

        case(UserProfileActions.DELETE_USER):
        return {...state, loggedUserFirstName:null, loggedUserId:null}

        default: return state
    }
}
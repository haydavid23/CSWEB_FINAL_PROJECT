import * as UserProfileActions from "../store/user_profile.actions"
import * as my_map_models from "../my-map/my_map.models"

export interface State
{
    loggedUserFirstName:string;
    loggedUserId:number
    locationPins:Array<my_map_models.pins>
    dbResponseMsg:string
    


}

const initialState:State = {
    loggedUserFirstName:null,
    loggedUserId:null,
    locationPins:null,
    dbResponseMsg:null


}

export function userProfileReducer(state:State=initialState, action:UserProfileActions.UserProfileUserActions)
{
    switch(action.type)
    {   
        case(UserProfileActions.SAVE_LOGGED_USER):
        return {...state, loggedUserFirstName:action.payload.firstName, loggedUserId:action.payload.userId}

        case(UserProfileActions.DELETE_USER):
        return {...state, loggedUserFirstName:null, loggedUserId:null}

        case(UserProfileActions.SAVE_USER_PIN):
        return {...state, locationPins:action.payload}

        // case(UserProfileActions.DB_RESPONSE):
        // return {...state, dbResponseMsg:action.payload}

        default: return state
    }
}
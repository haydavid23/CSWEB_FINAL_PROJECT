import * as UserProfileActions from "../store/user_profile.actions"
import * as my_map_models from "../my-map/my_map.models"
import * as user_profile_models from "../user_profile.models"

export interface State
{
    loggedUserFirstName:string;
    loggedUserId:number;
    locationPins:Array<my_map_models.pins>;
    hometown:my_map_models.UserHometown;
    pinsGetFailed:string;
    hometownGetFailed:string;
    currentTrip:user_profile_models.Trip
    
}

const initialState:State = {
    loggedUserFirstName:null,
    loggedUserId:null,
    locationPins:null,
    hometown:null,
    pinsGetFailed:null,
    hometownGetFailed:null,
    currentTrip:null


}

export function userProfileReducer(state:State=initialState, action:UserProfileActions.UserProfileUserActions)
{
    switch(action.type)
    {   
        case(UserProfileActions.SAVE_LOGGED_USER):
        return {...state, loggedUserFirstName:action.payload.firstName, loggedUserId:action.payload.userId, pinsGetFailed:null}

        case(UserProfileActions.DELETE_USER):
        return {...state, loggedUserFirstName:null, loggedUserId:null, pinsGetFailed:null}

        case(UserProfileActions.SAVE_USER_PIN):
        return {...state, locationPins:action.payload, pinsGetFailed:null}

        case(UserProfileActions.DB_GET_RESPONSE):
        return {...state, pinsGetFailed:action.payload}

        case(UserProfileActions.DB_RES_USER_HOMETOWN):
        return {...state, hometownGetFailed:action.payload}

        case(UserProfileActions.SAVE_CURRENT_TRIP):
        return {...state, currentTrip:action.payload}

        case(UserProfileActions.SAVE_USER_HOMETOWN):
        return {...state, hometown:action.payload}

        default: return state
    }
}
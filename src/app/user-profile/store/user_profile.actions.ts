import {Action} from '@ngrx/store'
import * as user_profileModel from "../user_profile.models"
import * as my_map_models from "../my-map/my_map.models"

export const SAVE_LOGGED_USER= "SAVE_LOGGED_USER";
export const GET_LOGGED_USER= "GET_LOGGED_USER";
export const DELETE_USER= "DELETE_USER";
export const SAVE_USER_PIN= "SAVE_USER_PIN";
export const INIT_SAVE_USER_PIN= "INIT_SAVE_USER_PIN";
export const SAVE_USER_PIN_RESPONSE= "SAVE_USER_PIN_RESPONSE";




export class SaveLoggedUser implements Action{
    readonly type = SAVE_LOGGED_USER;
    constructor(public payload:user_profileModel.loggedUser){}
}


export class GetLoggedUser implements Action{
    readonly type = GET_LOGGED_USER;
}

export class DeleteUser implements Action{
    readonly type = DELETE_USER;
}

export class InitSaveUserPins implements Action{
    readonly type = INIT_SAVE_USER_PIN;
    constructor(public payload:Array<my_map_models.pins>){}
}

export class SaveUserPins implements Action{
    readonly type = SAVE_USER_PIN;
    constructor(public payload:Array<my_map_models.pins>){}
}

export class SaveUserPinsResponse implements Action{
    readonly type = SAVE_USER_PIN_RESPONSE;
    constructor(public payload:string){}
}


export type UserProfileUserActions =  SaveLoggedUser | 
GetLoggedUser | DeleteUser | SaveUserPins |
 InitSaveUserPins | SaveUserPinsResponse
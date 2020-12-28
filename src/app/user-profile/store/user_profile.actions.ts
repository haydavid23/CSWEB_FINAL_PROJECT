import {Action} from '@ngrx/store'
import * as user_profileModel from "../user_profile.models"
import * as my_map_models from "../my-map/my_map.models"

export const SAVE_LOGGED_USER= "SAVE_LOGGED_USER";
export const GET_LOGGED_USER= "GET_LOGGED_USER";
export const DELETE_USER= "DELETE_USER";
export const SAVE_USER_PIN= "SAVE_USER_PIN";
export const INIT_SAVE_USER_PIN= "INIT_SAVE_USER_PIN";
export const DB_RESPONSE= "DB_RESPONSE";
export const GET_USER_PINS= "GET_USER_PINS";
export const DELETED_PINS= "DELETED_PINS";
export const DELETE_PIN_RESPONSE= "DELETE_PIN_RESPONSE";
export const SAVE_PIN_RESPONSE= "SAVE_PIN_RESPONSE";





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
    constructor(public payload:my_map_models.pins[]){}
}

export class SaveUserPins implements Action{
    readonly type = SAVE_USER_PIN;
    constructor(public payload:my_map_models.pins[]){}
}

export class DbResponse implements Action{
    readonly type = DB_RESPONSE;
    constructor(public payload:string){}
}

export class GetUserPins implements Action{
    readonly type = GET_USER_PINS;
   
}

export class DeletedPins implements Action{
    readonly type = DELETED_PINS;
    constructor(public payload:my_map_models.DeletedPin[]){}
   
}

export class DeletePinResponse implements Action{
    readonly type = DELETE_PIN_RESPONSE;
    constructor(public payload:string){}
   
}

export class SavePinResponse implements Action{
    readonly type = SAVE_PIN_RESPONSE;
    constructor(public payload:string){}
   
}


export type UserProfileUserActions =  SaveLoggedUser | 
GetLoggedUser | DeleteUser | SaveUserPins |
 InitSaveUserPins | DbResponse |GetUserPins | DeletedPins | DeletePinResponse | SavePinResponse
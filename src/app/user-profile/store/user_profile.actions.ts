import {Action} from '@ngrx/store'
import * as user_profileModel from "../user_profile.models"
import * as my_map_models from "../my-map/my_map.models"

export const SAVE_LOGGED_USER= "SAVE_LOGGED_USER";
export const GET_LOGGED_USER= "GET_LOGGED_USER";
export const DELETE_USER= "DELETE_USER";
export const SAVE_USER_PIN= "SAVE_USER_PIN";
export const INIT_SAVE_USER_PIN= "INIT_SAVE_USER_PIN";
export const DB_GET_RESPONSE= "DB_GET_RESPONSE";
export const GET_USER_PINS= "GET_USER_PINS";
export const INIT_DELETED_PIN= "INIT_DELETED_PIN";
export const SAVE_PIN_RESPONSE= "SAVE_PIN_RESPONSE";
export const SET_USER_HOMETOWN= "SET_USER_HOMETOWN";
export const GET_USER_HOMETOWN= "GET_USER_HOMETOWN";
export const SAVE_USER_HOMETOWN= "SAVE_USER_HOMETOWN";
export const DB_RES_USER_HOMETOWN= "DB_RES_USER_HOMETOWN";
export const CREATE_NEW_TRIP= "CREATE_NEW_TRIP";
export const UPLOAD_PICTURES= "UPLOAD_PICTURES";
export const SAVE_CURRENT_TRIP= "SAVE_CURRENT_TRIP";
export const CREATE_NEW_TRIP_FAIL= "CREATE_NEW_TRIP_FAIL";




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
    constructor(public payload:my_map_models.pins){}
}


export class SaveUserPins implements Action{
    readonly type = SAVE_USER_PIN;
    constructor(public payload:my_map_models.pins[]){}
}

export class DbGetResponse implements Action{
    readonly type = DB_GET_RESPONSE;
    constructor(public payload:string){}
}

export class GetUserPins implements Action{
    readonly type = GET_USER_PINS;
   
}

export class CreateNewTrip implements Action{
    readonly type = CREATE_NEW_TRIP
    constructor(public payload:user_profileModel.Trip){}
   
}

export class CreateNewTripFail implements Action{
    readonly type = CREATE_NEW_TRIP_FAIL
 
}

export class SaveCurrentTrip implements Action{
    readonly type = SAVE_CURRENT_TRIP
    constructor(public payload:user_profileModel.Trip){}
   
}

// export class DeletedPins implements Action{
//     readonly type = DELETED_PINS;
//     constructor(public payload:my_map_models.DeletedPin[]){}
   
// }

export class InitDeletedPin implements Action{
    readonly type = INIT_DELETED_PIN;
    constructor(public payload:my_map_models.DeletedPin){}
   
}


export class SavePinResponse implements Action{
    readonly type = SAVE_PIN_RESPONSE;
    constructor(public payload:string){}
   
}

export class SetUserHomeTown implements Action{
    readonly type = SET_USER_HOMETOWN;
    constructor(public payload:{lat:number, lng:number}){}
   
}

export class GetUserHomeTown implements Action{
    readonly type = GET_USER_HOMETOWN;

}

export class SaveUserHomeTown implements Action{
    readonly type = SAVE_USER_HOMETOWN;
    constructor(public payload:{lat:number, lng:number}){}
}

export class SaveDbResUserHomeTown implements Action{
    readonly type = DB_RES_USER_HOMETOWN;
    constructor(public payload:string){}
}

export class UploadPictures implements Action{
    readonly type = UPLOAD_PICTURES;
    constructor(public payload:FormData){}
}


export type UserProfileUserActions =  SaveLoggedUser | 
GetLoggedUser | DeleteUser | SaveUserPins | SetUserHomeTown| GetUserHomeTown | SaveUserHomeTown | SaveDbResUserHomeTown|
 InitSaveUserPins | DbGetResponse |GetUserPins | InitDeletedPin | SavePinResponse | UploadPictures | CreateNewTrip | SaveCurrentTrip | CreateNewTripFail
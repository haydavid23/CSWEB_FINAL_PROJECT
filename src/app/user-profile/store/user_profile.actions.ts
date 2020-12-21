import {Action} from '@ngrx/store'
import * as user_profileModel from "../user_profile.models"

export const SAVE_LOGGED_USER= "SAVE_LOGGED_USER";
export const GET_LOGGED_USER= "GET_LOGGED_USER";
export const DELETE_USER= "DELETE_USER";




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


export type UserProfileUserActions =  SaveLoggedUser | GetLoggedUser | DeleteUser
import {Action} from '@ngrx/store'

export const SAVE_LOGGED_USER= "SAVE_LOGGED_USER";
export const GET_LOGGED_USER= "GET_LOGGED_USER";

export class SaveLoggedUser implements Action{
    readonly type = SAVE_LOGGED_USER;
    constructor(public payload:string){}
}

export class GetLoggedUser implements Action{
    readonly type = GET_LOGGED_USER;
}


export type UserProfileUserActions =  SaveLoggedUser | GetLoggedUser
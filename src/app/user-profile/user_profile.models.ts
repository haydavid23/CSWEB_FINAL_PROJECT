
import * as mapModels from "../user-profile/my-map/my_map.models"

export interface loggedUser
{
    firstName:string;
    userId:number;
}

export interface Trip
{
    tripName:string;
    tripDescription:string;
    tripStartDate:Date;
    tripEndDate:Date;
}


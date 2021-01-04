export interface pins
{
    lat:number;
    lng:number;
    hometown?:boolean;
    markerDragable?:boolean;
    infoContent?:string;
}

export interface DeletedPin
{
    latitude:number;
    longitude:number;

}

export interface dbGetPinsSuccess
{
    locations:pins[];
    hometown:{lat:number,lng:number}
}

export interface UserHometown
{
    lat:number;
    lng:number;
}


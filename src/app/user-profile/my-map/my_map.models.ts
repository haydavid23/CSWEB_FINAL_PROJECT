export interface pins
{
    lat:number;
    lng:number;
    hometown?:boolean;
    markerDragable?:boolean;
    infoContent?:string;
    tripName?:string;
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


//testing

export interface Trip
{
    id:number;
    tripName:string;
    tripDescription:string;
    tripStartDate:Date;
    tripEndDate:Date;
}

export interface Pin
{
    datePinned: Date;
    id: number;
    infoContent: string;
    lat: number;
    lng: number;
    markerDragable: boolean;
    trip_id: number;
    user_id_id: number;
}


export interface UserTrip
{
    tripPins: Pin[]
    trips:Trip[]

}


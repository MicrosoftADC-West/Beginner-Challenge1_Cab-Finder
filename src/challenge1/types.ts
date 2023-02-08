type Routes = {
    location_id: number,
    location_description: string;
    start_coord_long: string | number;
    start_coord_lat: string | number;
    destination_coord_long: string | number;
    destination_coord_lat: string | number;
}

type RideService = {
    rideservice_id: number
    rideservice_name: string
    priceperkm: string;
}

type Ride = {
    ride_id: number,
    location_id: number;
    rideservice_id: number;
    estimated_arrival_time: string;
}

type RidePrice = {
    ride_id: number,
    location_id: number;
    rideservice_id: number;
    estimated_arrival_time: string;
    price: number;
}

export {
    Ride,
    RidePrice,
    RideService,
    Routes
}
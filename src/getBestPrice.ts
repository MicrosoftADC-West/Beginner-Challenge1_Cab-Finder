import { haversine_distance } from "./helpers";
import { Routes, RideService, Ride } from "./types";

/**
 * @description Returns the best price for each route.
 * @param {Routes[]} routes 
 * @param {RideService[]} rideService 
 * @param {Ride[]} bookedRide 
 * @returns {RidePrice[][]}
 */

export function getBestRideForEachRoute(routes: Routes[], rideService: RideService[], bookedRide: Ride[]){
    const temp :any[] = []
    
    return bookedRide.map((bookedRide: Ride) => {
        let bestPrice: {serviceName: string, price?: number }={price: undefined, serviceName: "" };
        
        const locationId = bookedRide.location_id;
        const route = routes.find((route: Routes) => route.location_id === locationId) as Routes;
        

        let { start_coord_lat, start_coord_long, destination_coord_lat, destination_coord_long } = route;

        start_coord_lat = parseFloat(start_coord_lat as string);
        start_coord_long = parseFloat(start_coord_long as string);
        destination_coord_lat = parseFloat(destination_coord_lat as string);
        destination_coord_long = parseFloat(destination_coord_long as string);

        const distanceInKm = haversine_distance(start_coord_lat, start_coord_long, destination_coord_lat, destination_coord_long);

        rideService.forEach((rideServ: RideService) => {
            
            const rideServiceRate = parseInt(rideServ?.priceperkm as string);
    
            const priceForRide =  rideServiceRate * distanceInKm;

            if(priceForRide < bestPrice?.price!){
                bestPrice={
                    serviceName: rideServ.rideservice_name,
                    price: priceForRide,
                }
            }
     
        });

        return {...bestPrice, ride:bookedRide.ride_id}
 
    });

}
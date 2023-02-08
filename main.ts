import { 
    getPriceForEachRide,
    getBestRideForEachRoute, 
    RidePrice, 
    convertLocations, 
    convertRideServices, 
    convertRides 
} from "./src";



async function main() {
    const rides = convertRides();
    const ridesServices = convertRideServices();
    const locations = convertLocations();
    const priceForEachRide: RidePrice[][] = getPriceForEachRide(locations,ridesServices,rides);
    const bestRideForEachRoute = getBestRideForEachRoute(locations,ridesServices,rides)
    
    return {
        task1: priceForEachRide,
        task2: bestRideForEachRoute,
    }
}

main().then(console.log);
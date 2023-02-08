import { 
    getPriceForEachRide,
    getBestRideForEachRoute, 
    RidePrice, 
    getLocations, 
    getRideServices, 
    getRides 
} from "./src";



async function main() {
    const rides = getRides();
    const ridesServices = getRideServices();
    const locations = getLocations();
    const priceForEachRide: RidePrice[][] = getPriceForEachRide(locations,ridesServices,rides);
    const bestRideForEachRoute = getBestRideForEachRoute(locations,ridesServices,rides)
    
    return {
        task1: priceForEachRide,
        task2: bestRideForEachRoute,
    }
}

main().then(console.log);
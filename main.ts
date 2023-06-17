import { 
    getPriceForEachRide,
    getBestRideForEachRoute, 
    RidePrice, 
    getLocations, 
    getRideServices, 
    getRides 
} from "./src";



async function main() {
    // Challenge 1
    const rides = getRides();
    const ridesServices = getRideServices();
    const locations = getLocations();
    const priceForEachRide: RidePrice[][] = getPriceForEachRide(locations,ridesServices,rides);
    const bestRideForEachRoute = getBestRideForEachRoute(locations,ridesServices,rides)
    
    const challenge1 = {
        task1: priceForEachRide,
        task2: bestRideForEachRoute,
    }

    // challenge 2


    return { challenge1 }
}

main().then(console.log);
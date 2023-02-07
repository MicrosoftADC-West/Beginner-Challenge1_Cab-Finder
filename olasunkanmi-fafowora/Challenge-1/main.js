// Task 1
// Consuming json files with async await function
async function getData(url) {
    const response = await fetch(url);

    return response.json();
}

// Obtains data for each JSON file
const locationData = await getData("../../Data/JSON/locations.json");
const ridesData = await getData("../../Data/JSON/rides.json");
const rideServicesData = await getData("../../Data/JSON/rideServices.json");

// Array to store result of Challenge 1 - Task 1
const rideWithPrices = [];

/**
 * Function to calculate the cost of each ride
 * @param {Object} routeLists - parameter for all location data from locations.json
 * @param {Object} rideServices - parameter for all ride services data from rideServices.json
 * 
 * @returns rideWithPrices object that contains
 * the details of each ride and their corresponding prices
 */
function CalculateRidePrice(routeLists, rideServices) {
    const rideInKmWithLocations = [];

    let ind = 0;
    for (const element of routeLists) {
        ind++;
        rideInKmWithLocations.push({
            location: ind,
            distance_in_km: GetDistanceFromLatLonInKM(element.start_coord_lat, element.start_coord_long, element.destination_coord_lat, element.destination_coord_long).toFixed(3)
        })
    }

    ind = 0;
    for (const element of ridesData) {
        ind++;
        rideWithPrices.push({
            ride_id: ind,
            price_for_ride: parseFloat(CalculatePricePerKM(element, rideInKmWithLocations, rideServices))
        })
    }

    return rideWithPrices;
}

/**
 * Calculates price per kilometer
 * @param {Object} element 
 * @param {Object} rideInKmWithLocations 
 * @param {Object} rideServices 
 * @returns price per kilometer in precison 3 fixed float point
 */
function CalculatePricePerKM(element, rideInKmWithLocations, rideServices) {
    let resultForRideInKm = rideInKmWithLocations.find(item => item.location === element.location_id);
    let resultForRideServices = rideServices.find(item => item.rideservice_id === element.rideservice_id);
    return (resultForRideInKm.distance_in_km * resultForRideServices.priceperkm).toFixed(3);
}

// longnitude and latitude data function
function GetDistanceFromLatLonInKM(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = Deg2Rad(lat2 - lat1); // Deg2Rad below
    var dLon = Deg2Rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(Deg2Rad(lat1)) * Math.cos(Deg2Rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}
/**
 * Convert degree to radians
 * @param {float} deg 
 * @returns degree in radians
 */
function Deg2Rad(deg) {
    return deg * (Math.PI / 180);
}

// output ride with prices - answer for challenge 1 - Task 1
console.log("Answer for Challenge 1, Task 1:");
console.table(CalculateRidePrice(locationData, rideServicesData));

// Task 2
// check if array object is present
function ArrayAlreadyHasArray(arr, subarr) {
    for (var i = 0; i < arr.length; i++) {
        let checker = false;
        for (var j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === subarr[j]) {
                checker = true;
            } else {
                checker = false;
                break;
            }
        }
        if (checker) {
            return true;
        }
    }
    return false;
}

// for calculating location values for task 2
function GetLocationValues(locationId, ridesData) {
    let allObjWithSameLocations = [];
    for (let element of ridesData) {
        if (element.location_id == locationId) {
            allObjWithSameLocations.push(element);
        }
    }
    return allObjWithSameLocations;
}
 
/**
 * Calculates the best price for each location 
 * outputing the service company, best price, and other details
 * @param {Object} locationData 
 * @param {Object} ridesData 
 * @param {Object} rideServicesData 
 * @param {Object} rideWithPrices
 * @return bestPricesForEachLocation object that contains the
 * service company offering the best price, best price, and other details
 */
function CalculateBestPrice(locationData, ridesData, rideServicesData, rideWithPrices) {
    let allSameLocationsArr = [];

    let ind = 0;
    for (let element of ridesData) {
        ind++;
        let rideLocation = element.location_id;
        let allObjsWithSameLocations = GetLocationValues(rideLocation, ridesData);


        if (!ArrayAlreadyHasArray(allSameLocationsArr, allObjsWithSameLocations)) {
            allSameLocationsArr.push(allObjsWithSameLocations);
        }
    }

    // best prices calculation
    let allPricesWithLocationAndService = [];
    for (let i = 0; i < allSameLocationsArr.length; i++) {
        let priceForServicePerLocation = [];
        for (let innerElement of allSameLocationsArr[i]) {
            let priceForService = rideWithPrices.find(item => item.ride_id === innerElement.ride_id);

            let serviceCompany = rideServicesData.find(item => item.rideservice_id === innerElement.rideservice_id);
            let locationDescription = locationData.find(item => item.location_id === innerElement.location_id);

            priceForServicePerLocation.push({
                ride_id: priceForService.ride_id,
                price: parseFloat(priceForService.price_for_ride),
                service_company: serviceCompany.rideservice_name,
                location_description: locationDescription.location_description,
                location_id: locationDescription.location_id
            })
        }
        allPricesWithLocationAndService.push(priceForServicePerLocation);
    }

    // sort array of objects
    for (let i = 0; i < allPricesWithLocationAndService.length; i++) {
        allPricesWithLocationAndService[i].sort((a, b) => (a.price > b.price) ? 1 : -1);
    }

    // console.log(allPricesWithLocationAndService)

    let bestPricesForEachLocation = [];
    for (let i = 0; i < allPricesWithLocationAndService.length; i++) {
        let allPriceObject = allPricesWithLocationAndService[i][0];
        bestPricesForEachLocation.push({
            service_company: allPriceObject.service_company,
            price: allPriceObject.price,
            location_id: allPriceObject.location_id,
            location_description: allPriceObject.location_description
        })
    }

    // sort best prices based on location
    bestPricesForEachLocation.sort((a, b) => (a.location_id > b.location_id) ? 1 : -1)

    return bestPricesForEachLocation;
}

// Outputs answer for Challenge 1 - Task 2
console.log("Answer for Challenge 1, Task 2:");
console.table(CalculateBestPrice(locationData, ridesData, rideServicesData, rideWithPrices));

// @ts-ignore
import csv from "convert-csv-to-json";


export const getRides = () => {
    return csv.fieldDelimiter(',').getJsonFromCsv('./Data/CSV/rides.csv');
}


export const getLocations = () => {
    return csv.fieldDelimiter(',').getJsonFromCsv('./Data/CSV/locations.csv');
}

export const getRideServices = () => {
    return csv.fieldDelimiter(',').getJsonFromCsv('./Data/CSV/rideservices.csv');
}

export const  haversine_distance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const earth_radius = 6371.0; // in kilometers
    const dlat = (lat2 - lat1) * (Math.PI / 180);
    const dlon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dlat/2) * Math.sin(dlat/2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dlon/2) * Math.sin(dlon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earth_radius * c;
}

export const getDistanceInKm = () => {

}
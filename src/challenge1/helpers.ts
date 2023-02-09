// @ts-ignore
import csv from "convert-csv-to-json";

export const getRides = () => {
  return csv.fieldDelimiter(",").getJsonFromCsv("./Data/CSV/rides.csv");
};

export const getLocations = () => {
  return csv.fieldDelimiter(",").getJsonFromCsv("./Data/CSV/locations.csv");
};

export const getRideServices = () => {
  return csv.fieldDelimiter(",").getJsonFromCsv("./Data/CSV/rideservices.csv");
};

export const haversine_distance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const earth_radius = 6371.0; // in kilometers
  const dlat = (lat2 - lat1) * (Math.PI / 180);
  const dlon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dlon / 2) *
      Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earth_radius * c;
};
const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

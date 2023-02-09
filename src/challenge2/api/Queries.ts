export const GET_ALL_RIDES_QUERIES: string = `select * from Ride join locations ON locations.location_id = Ride.location_id join rideservice on rideservice.rideservice_id = Ride.rideservice_id
  where locations.start_coord_long=? and 
  locations.start_coord_lat=? and 
  locations.destination_coord_long=? and 
  destination_coord_lat=?`;
export const CREATE_RIDE_QUERY_1: string = `select * from locations where locations.start_coord_long=? and 
  locations.start_coord_lat=? and 
  locations.destination_coord_long=? and 
  destination_coord_lat=?`;
export const GET_RIDE_BY_ID_QUERY: string = `select * from Ride join locations ON locations.location_id = Ride.location_id where Ride.ride_id = ?`;
export const CREATE_RIDE_QUERY_2: string = `select * from rideservice where rideservice_name = ? `;
export const CREATE_RIDE_QUERY_3: string = `INSERT INTO Ride (location_id,rideservice_id, estimated_arrival_time) VALUES (?,?,?) `;
export const GET_ALL_RIDE_SERVICES: string = `SELECT * FROM rideservice`;
export const GET_ALL_RIDES: string = `select * from Ride join locations ON locations.location_id = Ride.location_id join rideservice on rideservice.rideservice_id = Ride.rideservice_id ORDER BY Ride.ride_id;`;
export const GET_ALL_LOCATIONS: string = `SELECT * FROM locations`;
export const CREATE_NEW_LOCATION: string =
  "INSERT INTO locations (location_description, start_coord_long,start_coord_lat,destination_coord_long,destination_coord_lat) VALUES (?,?,?,?,?)";

export const CREATE_NEW_RIDE_SERVICE: string =
  "INSERT INTO rideservice (rideservice_name, priceperkm) VALUES (?,?)";

export const UPDATE_RIDE: string = `UPDATE Ride SET location_id=?,rideservice_id=?,estimated_arrival_time=? where ride_id = ? `;

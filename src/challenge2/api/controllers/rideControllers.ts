import { db } from "../db";
import { Request, Response } from "express";
import {
  CREATE_RIDE_QUERY_1,
  CREATE_RIDE_QUERY_2,
  CREATE_RIDE_QUERY_3,
  GET_ALL_RIDES_QUERIES,
  GET_RIDE_BY_ID_QUERY,
  UPDATE_RIDE,
} from "../Queries";
import { RowDataPacket } from "mysql2";
import {
  getDistanceFromLatLonInKm,
  haversine_distance,
} from "../../../challenge1/helpers";

// Get All Rides
export const getRides = (req: Request, res: Response) => {
  const { start_location, end_location } = req.query as any;

  if (!start_location || !end_location) {
    return res.status(400).json("Fill all detsails");
  }
  // extract the cordinate from the query
  const start_coord_long = start_location.long.trim();
  const start_coord_lat = start_location.lat.trim();

  const destination_coord_long = end_location.long.trim();
  const destination_coord_lat = end_location.lat.trim();

  const dbQueryParams = [
    parseFloat(start_coord_long),
    parseFloat(start_coord_lat),
    parseFloat(destination_coord_long),
    parseFloat(destination_coord_lat),
  ];
  db.query(
    `SELECT * FROM locations   
    where locations.start_coord_long=? and 
  locations.start_coord_lat=? and 
  locations.destination_coord_long=? and 
  destination_coord_lat=?`,
    dbQueryParams,
    (error, result: RowDataPacket[]) => {
      if (error) return res.json(error);
      if (!result[0]) {
        return res
          .status(400)
          .json("A Location with this coordinates does not exist");
      }
      const routeDistance: any = haversine_distance(
        result[0].start_coord_lat,
        result[0].start_coord_long,
        result[0].destination_coord_lat,
        result[0].destination_coord_long
      );
      db.query(
        "SELECT * FROM Ride JOIN rideservice on Ride.rideservice_id = rideservice.rideservice_id where location_id = ?",
        [result[0]?.location_id],
        (rideError, rideResult: any) => {
          if (rideError) return res.json(rideError);
          console.log(rideResult);
          const detailedRides = rideResult.map((ride: any) => {
            const ridePrice = ride.priceperkm * routeDistance;
            return {
              ...ride,
              price: ridePrice,
              ...result[0],
            };
          });
          console.log(detailedRides);
          return res.status(200).json(detailedRides);
        }
      );
    }
  );
};

// const routeDistance = getDistanceFromLatLonInKm(
//   route[0].start_coord_lat,
//   route[0].start_coord_long,
//   route[0].destination_coord_lat,
//   route[0].destination_coord_long
// );
// Get a Single Ride
export const getRideById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(404).json("No Id");

  db.query(GET_RIDE_BY_ID_QUERY, [id], (error, result: RowDataPacket[]) => {
    if (error) return res.json(error);
    if (!result.length) {
      return res.status(404).json("Ride with given id does not exist");
    } else {
      return res.status(200).json(result);
    }
  });
};

export const createRide = (req: Request, res: Response) => {
  const { start_location, end_location, ride_service, arrival_time } = req.body;
  if (!start_location || !end_location || !ride_service || !arrival_time) {
    return res.status(404).json("Fill all details");
  }
  // Get the Location id for the selected Ride
  db.query(
    CREATE_RIDE_QUERY_1,
    [
      parseFloat(start_location.long),
      parseFloat(start_location.lat),
      parseFloat(end_location.long),
      parseFloat(end_location.lat),
    ],
    (error, locationResult: RowDataPacket[]) => {
      if (error) return res.json(error);
      if (locationResult) {
        db.query(
          CREATE_RIDE_QUERY_3,
          [locationResult[0]?.location_id, ride_service, arrival_time],
          (createRideError, createRideResult: any) => {
            if (createRideError) return res.status(404).json(createRideError);
            return res.status(201).json(createRideResult?.insertId);
          }
        );
      }
    }
  );
};

export const putRide = (req: Request, res: Response) => {
  const id = req.params.id;
  const { start_location, end_location, ride_service, arrival_time } = req.body;
  // Get the Location id for the selected Ride
  db.query(
    CREATE_RIDE_QUERY_1,
    [
      parseFloat(start_location.long),
      parseFloat(start_location.lat),
      parseFloat(end_location.long),
      parseFloat(end_location.lat),
    ],
    (error, locationResult: RowDataPacket[]) => {
      if (error) return res.json(error);
      if (locationResult) {
        db.query(
          UPDATE_RIDE,
          [locationResult[0]?.location_id, ride_service, arrival_time, id],
          (updateRideError, updateRideResult: any) => {
            if (updateRideError) return res.status(404).json(updateRideError);
            return res.status(200).json(updateRideResult);
          }
        );
      }
    }
  );
};
export const deleteRide = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(404).json("No Id");
  const query = `DELETE FROM Ride WHERE ride_id = ?`;
  db.query(query, [id], (error, result) => {
    if (error) return res.status(404).json(error);

    return res.status(204).json("");
  });
};

import { db } from "../db";
import { Request, Response } from "express";

import {
  GET_ALL_LOCATIONS,
  GET_ALL_RIDES,
  GET_ALL_RIDE_SERVICES,
  CREATE_NEW_LOCATION,
  CREATE_NEW_RIDE_SERVICE,
} from "../Queries";
import { haversine_distance } from "../../../challenge1/helpers";

export const getAllRideServices = (req: Request, res: Response) => {
  db.query(GET_ALL_RIDE_SERVICES, (error, result) => {
    if (error) return res.json(error);
    return res.status(200).json(result);
  });
};
export const getAllLocations = (req: Request, res: Response) => {
  db.query(GET_ALL_LOCATIONS, (error, result) => {
    if (error) return res.json(error);
    return res.status(200).json(result);
  });
};
export const getAllRides = (req: Request, res: Response) => {
  db.query(
    `select * from Ride join locations ON locations.location_id = Ride.location_id join rideservice on rideservice.rideservice_id = Ride.rideservice_id`,
    (error, result: any) => {
      if (error) return res.json(error);
      const allValues = result.map((ride: any) => {
        const routeDistance: any = haversine_distance(
          ride.start_coord_lat,
          ride.start_coord_long,
          ride.destination_coord_lat,
          ride.destination_coord_long
        );
        const ridePrice = ride.priceperkm * routeDistance;
        return {
          ...ride,
          price: ridePrice,
        };
      });
      return res.status(200).json(allValues);
    }
  );
};
export const createNewRideService = (req: Request, res: Response) => {
  const { rideservice_name, priceperkm } = req.body;
  db.query(
    CREATE_NEW_RIDE_SERVICE,
    [rideservice_name, priceperkm],
    (error, result: any) => {
      if (error) return res.json(error);
      return res.status(201).json(result.insertId);
    }
  );
};
export const createNewLocation = (req: Request, res: Response) => {
  const {
    description,
    start_longtitude,
    start_latitude,
    destination_longtitude,
    destination_latitude,
  } = req.body;
  db.query(
    CREATE_NEW_LOCATION,
    [
      description,
      start_longtitude,
      start_latitude,
      destination_longtitude,
      destination_latitude,
    ],
    (error, result: any) => {
      if (error) return res.json(error);
      return res.status(201).json(result.insertId);
    }
  );
};

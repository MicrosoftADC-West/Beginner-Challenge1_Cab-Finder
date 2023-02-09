import { db } from "../db";
import { Request, Response } from "express";

import {
  GET_ALL_LOCATIONS,
  GET_ALL_RIDES,
  GET_ALL_RIDE_SERVICES,
  CREATE_NEW_LOCATION,
  CREATE_NEW_RIDE_SERVICE,
} from "../Queries";

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
  db.query(GET_ALL_RIDES, (error, result) => {
    if (error) return res.json(error);
    return res.status(200).json(result);
  });
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

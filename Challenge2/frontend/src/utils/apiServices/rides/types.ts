export type GetRidesParameters = {
  start_location: string;
  end_location: string;
};

export type AddRideParameters = {
  start_location: string;
  end_location: string;
  ride_service: string;
  estimated_arrival_time: string;
};

export type EditRideParameters = {
  id: number;
  start_location: string;
  end_location: string;
  ride_service: string;
  estimated_arrival_time: string;
};

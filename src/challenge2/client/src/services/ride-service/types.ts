// types
export type CreateRideRequestDataType = {
  start_location: {
    lat: string;
    long: string;
  };
  end_location: {
    lat: string;
    long: string;
  };
  arrival_time: string;
  ride_service: string;
};

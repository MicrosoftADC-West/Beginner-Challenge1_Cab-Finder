export type RideType = {
  ride_id: number;
  location_id: number;
  rideservice_id: number;
  estimated_arrival_time: string;
  rideservice_name: string;
  priceperkm: number;
  price: number;
};

export type RidesType = {
  rides: RideType[];
  ridesLoading: boolean;
};

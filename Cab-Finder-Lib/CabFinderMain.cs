using Cab_Finder_Lib.Models;
using CsvHelper;
using CsvHelper.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Cab_Finder_Lib
{
    public static class CabFinderMain
    {
        public static List<T> ReadFromJSON<T>(string path) where T : class
        {
            return JsonConvert.DeserializeObject<List<T>>(File.ReadAllText(path));
        }


        public static List<GetRideDetail> GetRideDetails(List<Location> locations, List<RideService> rideServices, List<Ride> rides)
        {
            var rideDetailsToReturn = new List<GetRideDetail>();
            foreach (var ride in rides)
            {
                var location = locations.FirstOrDefault(c => c.location_Id == ride.location_id);
                var rideService = rideServices.FirstOrDefault(c => c.rideservice_id == ride.rideservice_id);

                var distanceInKm = ComputeDistanceUsingHaversine(location.destination_coord_lat, location.start_coord_lat,
                    location.destination_coord_long, location.start_coord_long);

                var totalPrice = (decimal)distanceInKm * rideService.priceperkm;

                rideDetailsToReturn.Add(new GetRideDetail()
                {
                    Price = totalPrice,
                    Distance = distanceInKm,
                    Ride = ride,
                    RideServiceName = rideService.rideservice_name
                });
            }

            return rideDetailsToReturn;
        }

        public static double ComputeDistanceUsingHaversine(double lat1, double lat2, double lon1, double lon2)
        {
            const double r = 6371e3; // meters
            var dlat = (lat2 - lat1) / 2;
            var dlon = (lon2 - lon1) / 2;

            var q = Math.Pow(Math.Sin(dlat), 2) + Math.Cos(lat1) * Math.Cos(lat2) * Math.Pow(Math.Sin(dlon), 2);
            var c = 2 * Math.Atan2(Math.Sqrt(q), Math.Sqrt(1 - q));

            var d = r * c;
            return d / 1000;
        }


        public static BestPrice ComputeBestPrice(List<Location> locations, List<RideService> rideServices, List<Ride> rides)
        {
            var rideDetails = GetRideDetails(locations, rideServices, rides);

            var currentBest = rideDetails[0];
            var currentBestPrice = currentBest.Price / (decimal)currentBest.Distance;

            foreach(var rideDetail in rideDetails)
            {
                var newCurrentBest = rideDetail.Price / (decimal)rideDetail.Distance;

                if(newCurrentBest < currentBestPrice)
                {
                    currentBest = rideDetail;
                    currentBestPrice = newCurrentBest;
                }
            }

            return new BestPrice()
            {
                Price = currentBest.Price,
                RideServiceName = currentBest.RideServiceName
            };
        }

    }
}

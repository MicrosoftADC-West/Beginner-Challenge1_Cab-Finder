using CabFinder.DTOs;
using CabFinder.Entities;
using CsvHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Formats.Asn1;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace CabFinder
{
    public static class HelperFunction
    {
        /// <summary>
        /// Harversine function to return distance from coordinates
        /// </summary>
        /// <param name="lat1"><see cref="double"/> Latitude 1</param>
        /// <param name="lon1"><see cref="double"/> Longitude 1</param>
        /// <param name="lat2"><see cref="double"/> Latitude 2</param>
        /// <param name="lon2"><see cref="double"/> Longitude 2</param>
        /// <returns><see cref="double"/> Distance </returns>
        public static double Haversine(double lat1, double lon1, double lat2, double lon2)
        {
            const double p = Math.PI;
            const double Radius = 6371;

            var a = 0.5 - Math.Cos((lat2 - lat1) * p) / 2 +
                Math.Cos(lat1 * p) * Math.Cos(lat2 * p) *
                (1 - Math.Cos((lon2 - lon1) * p)) / 2;

            return 2 * Radius * Math.Asin(Math.Sqrt(a));
        }

        /// <summary>
        /// This Gets the ride details from a list of inputs
        /// </summary>
        /// <param name="rides"><see cref="List{Ride}"/> rides</param>
        /// <param name="rideServices"><see cref="List{RideService}"/> ride services</param>
        /// <param name="locations"><see cref="List{Location}"/> locatios</param>
        /// <returns><see cref="List{GetRideDetail}"/> Ride Detail</returns>
        public static List<GetRideDetail> GetRideDetails(List<Ride> rides, List<RideService> rideServices, List<Location> locations) {

            var rideDetailList = new List<GetRideDetail>();

            rides.ForEach(c =>
            {
                var _rideService = rideServices.FirstOrDefault(cl => cl.rideservice_id == c.rideservice_id);
                var _location = locations.FirstOrDefault(cl => cl.location_id == c.location_id);
                if (_rideService is not null && _location is not null)
                {
                    var distance = Haversine(_location.start_coord_lat, _location.start_coord_long, _location.destination_coord_lat, _location.destination_coord_long);
                    rideDetailList.Add(new GetRideDetail()
                    {
                        RideId = c.ride_id,
                        Distance = distance,
                        Description = _location.location_description,
                        Price = distance * _rideService.priceperkm,
                        RideService = _rideService.rideservice_name
                    });
                }
            });

            return rideDetailList;
        }

        /// <summary>
        /// Get Best Ride Function using the sort/order method
        /// </summary>
        /// <param name="rides"><see cref="List{Ride}"/> rides</param>
        /// <param name="rideServices"><see cref="List{RideService}"/> ride services</param>
        /// <param name="locations"><see cref="List{Location}"/> locatios</param>
        /// <returns><see cref="BestRideDto"/>Best ride</returns>
        public static BestRideDto GetBestPrice(List<Location> locations, List<Ride> rides, List<RideService> rideServices)
        {
            var rideDetailList = GetRideDetails(rides, rideServices, locations);

            var dbb = new List<KeyValuePair<SubRide, double>>();

            rideDetailList.ForEach(c =>
            {
                dbb.Add(new KeyValuePair<SubRide, double>(new SubRide(c.RideService, c.Distance), c.Price));
            });

            var ef = dbb.OrderByDescending(c => c.Key.Distance)
                .OrderBy(c => c.Value)
                .Select(c => new { c.Key.RideService, c.Key.Distance, c.Value }).MaxBy(c => c.Distance);

            return new BestRideDto() { Price = ef.Value, RideService = ef.RideService, Distance = ef.Distance };
        }

        /// <summary>
        /// Get Best Ride Function using the optimal avg price per distance of the rides
        /// </summary>
        /// <param name="rides"><see cref="List{Ride}"/> rides</param>
        /// <param name="rideServices"><see cref="List{RideService}"/> ride services</param>
        /// <param name="locations"><see cref="List{Location}"/> locatios</param>
        /// <returns><see cref="BestRideDto"/>Best ride</returns>
        public static BestRideDto GetBestPrice2(List<Location> locations, List<Ride> rides, List<RideService> rideServices)
        {
            var rideDetailList = GetRideDetails(rides, rideServices, locations);

            var dbbNew = new List<(string, double, double, double)>();

            rideDetailList.ForEach(c =>
            {
                var perDis = c.Price / c.Distance;
                dbbNew.Add(new (c.RideService, c.Price, c.Distance, perDis));
            });

            var ef = dbbNew.OrderBy(c => c.Item4).FirstOrDefault();

            return new BestRideDto() { Price = ef.Item2, RideService = ef.Item1, Distance = ef.Item3 };
        }

        /// <summary>
        /// Converts data from csv file to object
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="path">Path to file</param>
        /// <returns><see cref="List{T}"/>Class List</returns>
        public static List<T> CSVToObj<T>(string path)  where T : class
        {
            using (var reader = new StreamReader(path))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records = csv.GetRecords<T>().ToList();
                return records;
            }
        }

        /// <summary>
        /// Converts data from json file to object
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="path">Path to file</param>
        /// <returns><see cref="List{T}"/>Class List</returns
        public static List<T> JSONConvert<T>(string path) where T : class
        {
            return JsonConvert.DeserializeObject<List<T>>(File.ReadAllText(path));
        }
    }
}

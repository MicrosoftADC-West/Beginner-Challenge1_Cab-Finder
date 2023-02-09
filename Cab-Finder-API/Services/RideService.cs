using Cab_Finder_API.Data;
using Cab_Finder_API.Services.Interfaces;
using Cab_Finder_Lib;
using Cab_Finder_Lib.DTOs;
using Cab_Finder_Lib.Models;
using Cab_Finder_Lib.Models.DatabaseModels;
using Microsoft.EntityFrameworkCore;

namespace Cab_Finder_API.Services
{

    public class RideServiceImplementation : IRideService
    {
        private readonly AppDbContext AppDbContext;

        public RideServiceImplementation(AppDbContext appDbContext)
        {
            AppDbContext = appDbContext;
        }

        public async Task<(bool IsSuccess, string Message, int? RideId)> AddRide(AddRideDto model)
        {
            if(await AppDbContext.Locations
                .AnyAsync(c => c.location_Id == model.LocationId) is false)
            {
                return (false, "Location does not exist", null);
            }
            
            if(await AppDbContext.RideServices.AnyAsync(c => c.rideservice_id == model.RideServiceId) is false)
            {
                return (false, "Ride service not found", null);
            }

            var lastId = await AppDbContext.Rides
                .OrderByDescending(c => c.ride_id)
                .Select(c => c.ride_id)
                .FirstOrDefaultAsync();

            var rideToCreate = new RideDb()
            {
                rideservice_id = model.RideServiceId,
                location_id = model.LocationId,
                estimated_arrival_time = model.EstimatedArrivalTime.ToUniversalTime(),
                ride_id = lastId +1
            };

            var result = await AppDbContext.AddAsync(rideToCreate);
            await AppDbContext.SaveChangesAsync();

            return (true, "Ride created successfully", rideToCreate.ride_id);
        }

        public async Task<(bool IsSuccess, string Message)> DeleteRide(int rideId)
        {
            var existingRide = await AppDbContext.Rides
                .FirstOrDefaultAsync(c => c.ride_id == rideId);

            if(existingRide is null)
            {
                return (false, "Ride not found");
            }
            else
            {
                var deleteResult = AppDbContext.Remove<RideDb>(existingRide);
                await AppDbContext.SaveChangesAsync();

                return (true, "Success");
            }
        }

        public async Task<(bool IsSuccess, string Message, GetRideDto? Ride)> GetRide(int rideId)
        {
            var existingRide = await AppDbContext.Rides
                .Include(c => c.location)
                .Include(c => c.rideservice)
                .FirstOrDefaultAsync(c => c.ride_id == rideId);


            if (existingRide is null)
            {
                return (false, "Ride not found", null);
            }
            else
            {
                var rideToReturn = new GetRideDto()
                {
                    EstimatedArrivalTime = existingRide.estimated_arrival_time,
                    Price = CabFinderMain.ComputeDistanceUsingHaversine(existingRide.location.destination_coord_lat, existingRide.location.start_coord_lat
                    , existingRide.location.destination_coord_long, existingRide.location.start_coord_long) * Convert.ToDouble(existingRide.rideservice.priceperkm),
                    RideId = existingRide.ride_id,
                    RideService = new GetRideServiceDto()
                    {
                        RideServiceId = existingRide.rideservice_id,
                        RideServiceName = existingRide.rideservice.rideservice_name
                    }
                };

                return (true, "success", rideToReturn);
            }
        }

        public async Task<(bool IsSuccess, string Message, List<GetRideDto> result)> GetRides(string startLocation, string endLocation)
        {
            if(startLocation.Contains(',') == false || endLocation.Contains(',') == false)
            {
                return (false, "string must contain a ,", new List<GetRideDto>());
            }


            var startCordinates = new SortLocation()
            {
                StartLocation = Convert.ToDouble(startLocation.Split(',')[0]),
                EndLocation = Convert.ToDouble(startLocation.Split(',')[1])
            };


            var endCordinates = new SortLocation()
            {
                EndLocation = Convert.ToDouble(endLocation.Split(',')[1]),
                StartLocation = Convert.ToDouble(endLocation.Split(',')[0])
            };


            var rides = await AppDbContext.Rides
                .Include(c => c.location)
                .Include(c => c.rideservice)
                .Where(c => c.location.start_coord_lat == startCordinates.StartLocation
                && c.location.start_coord_long == startCordinates.EndLocation
                && c.location.destination_coord_lat == endCordinates.StartLocation
                && c.location.destination_coord_long == endCordinates.EndLocation)
                .ToListAsync();

            var rideDetailsToReturn = new List<GetRideDto>();
            foreach(var ride in rides)
            {
                rideDetailsToReturn.Add(new GetRideDto()
                {
                    EstimatedArrivalTime = ride.estimated_arrival_time,
                    Price = CabFinderMain.ComputeDistanceUsingHaversine(ride.location.destination_coord_lat, ride.location.start_coord_lat
                    , ride.location.destination_coord_long, ride.location.start_coord_long) * Convert.ToDouble(ride.rideservice.priceperkm),
                    RideId = ride.ride_id,
                    RideService = new GetRideServiceDto()
                    {
                        RideServiceId = ride.rideservice_id,
                        RideServiceName = ride.rideservice.rideservice_name
                    }
                });
            }

            return (true, "success", rideDetailsToReturn);
        }

        public async Task<(bool IsSuccess, string Message, GetRideDto? Ride)> UpdateRide(int rideId, UpdateRideDto model)
        {
            var existingRide = await AppDbContext.Rides
            .Include(c => c.location)
            .Include(c => c.rideservice)
            .FirstOrDefaultAsync(c => c.ride_id == rideId);


            if (existingRide is null)
            {
                return (false, "Ride not found", null);
            }

            var location = await AppDbContext.Locations.FirstOrDefaultAsync(c => c.location_Id == model.LocationId);

            if (location is null)
            {
                return (false, "Location does not exist", null);
            }

            var rideService = await AppDbContext.RideServices.FirstOrDefaultAsync(c => c.rideservice_id == model.RideServiceId);

            if (rideService is null)
            {
                return (false, "Ride service not found", null);
            }

            existingRide.rideservice_id = model.RideServiceId;
            existingRide.location_id = model.LocationId;
            existingRide.estimated_arrival_time = model.EstimatedArrivalTime.ToUniversalTime();

            AppDbContext.Update(existingRide);
            await AppDbContext.SaveChangesAsync();


            var rideToReturn = new GetRideDto()
            {
                EstimatedArrivalTime = existingRide.estimated_arrival_time,
                Price = CabFinderMain.ComputeDistanceUsingHaversine(location.destination_coord_lat, location.start_coord_lat
                    , location.destination_coord_long, location.start_coord_long) * Convert.ToDouble(rideService.priceperkm),
                RideId = existingRide.ride_id,
                RideService = new GetRideServiceDto()
                {
                    RideServiceId = rideService.rideservice_id,
                    RideServiceName = rideService.rideservice_name
                }
            };
            return (true, "Success", rideToReturn);
        }
    }
}

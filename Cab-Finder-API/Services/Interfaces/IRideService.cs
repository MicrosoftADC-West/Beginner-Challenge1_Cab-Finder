using Cab_Finder_Lib.DTOs;

namespace Cab_Finder_API.Services.Interfaces
{
    public interface IRideService
    {
        Task<(bool IsSuccess, string Message, List<GetRideDto> result)> GetRides(string startLocation, string endLocation);

        Task<(bool IsSuccess, string Message, GetRideDto? Ride)> GetRide(int rideId);
        Task<(bool IsSuccess, string Message)> DeleteRide(int rideId);

        Task<(bool IsSuccess, string Message, int? RideId)> AddRide(AddRideDto model);
        Task<(bool IsSuccess, string Message, GetRideDto? Ride)> UpdateRide(int id, UpdateRideDto model);
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace CabFinder.DTOs
{
    public class GetRideDetail
    {
        public int RideId { get; set; }
        public double Distance { get; set; }
        public string Description { get; set; }
        public string RideService { get; set; }
        public double Price { get; set; }
    }
    public class GetModeRideDetail : GetRideDetail
    {
        public DateTime EstArrivalTime { get; set; }
    }

    public class SubRide
    {
        public string RideService { get; set; }
        public double Distance { get; set; }

        public SubRide(string rideService, double distance)
        {
            RideService = rideService;
            Distance = distance;
        }
    }
}

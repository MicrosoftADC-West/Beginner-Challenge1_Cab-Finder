using CabFinder.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CabFinder.DTOs
{
    public class CreateRideDto
    {
        [Required]
        public StartLocationDto start_location { get; set; }
        [Required]
        public DestinationLocationDto end_location { get; set; }
        [Required]
        public int rideservice_id { get; set; }
        [Required]
        public DateTime estimated_arrival_time { get; set; }
    }

    public class UpdateRideDto
    {
        public StartLocationDto start_location { get; set; }
        public DestinationLocationDto end_location { get; set; }
        public int rideservice_id { get; set; }
        public DateTime estimated_arrival_time { get; set; }
    }

    public class GetRideDto : Ride
    {
        public double price { get; set; }
    }
}

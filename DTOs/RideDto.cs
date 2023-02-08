using CabFinder.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CabFinder.DTOs
{
    public class CreateRideDto
    {
        [Required]
        public LocationDto start_location { get; set; }
        [Required]
        public LocationDto end_location { get; set; }
        [Required]
        public int rideservice_id { get; set; }
        [Required]
        public DateTime estimated_arrival_time { get; set; }
    }

    public class UpdateRideDto
    {
        public LocationDto start_location { get; set; }
        public LocationDto end_location { get; set; }
        public int rideservice_id { get; set; }
        public DateTime estimated_arrival_time { get; set; }
    }
}

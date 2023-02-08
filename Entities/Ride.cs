using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CabFinder.Entities
{
    public class Ride
    {
        [Key]
        public int ride_id { get; set; }

        [ForeignKey("location")]
        public int location_id { get; set; }
        public Location location { get; set; }

        [ForeignKey("rideservice")]
        public int rideservice_id { get; set; }
        public RideService rideservice { get; set; }

        public DateTime estimated_arrival_time { get; set; }
    }
}

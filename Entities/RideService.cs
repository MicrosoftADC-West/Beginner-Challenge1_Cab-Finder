using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CabFinder.Entities
{
    public class RideService 
    {
        [Key]
        public int rideservice_id { get; set; }

        [ForeignKey("fk_rideservice_name")]
        public string rideservice_name { get; set; }

        public double priceperkm { get; set; }
    }
}

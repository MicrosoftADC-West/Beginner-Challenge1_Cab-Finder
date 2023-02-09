using CsvHelper.Configuration.Attributes;

namespace Cab_Finder_Lib.Models
{
    public class Ride
    {
        public int ride_id { get; set; }

        public int location_id { get; set; }

        public int rideservice_id { get; set; }

        public DateTime estimated_arrival_time { get; set; }
    }
}

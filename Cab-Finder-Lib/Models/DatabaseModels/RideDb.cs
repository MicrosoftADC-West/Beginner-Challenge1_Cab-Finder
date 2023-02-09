using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cab_Finder_Lib.Models.DatabaseModels
{
    public class RideDb
    {
        [Key]
        public int ride_id { get; set; }

        [ForeignKey("location")]
        public int location_id { get; set; }
        public LocationDb location { get; set; }


        [ForeignKey("rideservice")]
        public int rideservice_id { get; set; }
        public RideServiceDb rideservice { get; set; }

        public DateTime estimated_arrival_time { get; set; }
    }
}

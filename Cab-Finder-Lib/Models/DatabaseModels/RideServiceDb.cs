using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cab_Finder_Lib.Models.DatabaseModels
{
    public class RideServiceDb
    {
        [Key]
        public int rideservice_id { get; set; }
        public string rideservice_name { get; set; }
        public decimal priceperkm { get; set; }
    }
}

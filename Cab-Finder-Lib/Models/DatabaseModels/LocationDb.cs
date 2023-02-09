using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cab_Finder_Lib.Models.DatabaseModels
{
    public class LocationDb
    {
        [Key]
        public int location_Id { get; set; }

        public string location_description { get; set; }

        public double start_coord_long { get; set; }

        public double start_coord_lat { get; set; }

        public double destination_coord_long { get; set; }

        public double destination_coord_lat { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CabFinder.Entities
{
    public class Location
    {

        [Key]
        public int location_id { get; set; }

        public string location_description { get; set; }

        public double start_coord_long { get; set; }

        public double start_coord_lat { get; set; }

        public double destination_coord_long { get; set; }

        public double destination_coord_lat { get; set; }

    }
}

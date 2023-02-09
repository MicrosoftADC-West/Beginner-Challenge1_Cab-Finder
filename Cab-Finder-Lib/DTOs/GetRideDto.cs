using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cab_Finder_Lib.DTOs
{
    public class GetRideDto
    {
        public int RideId { get; set; }
        public DateTime EstimatedArrivalTime { get; set; }
        public double Price { get; set; }
        public GetRideServiceDto RideService { get; set; }
    }

    public class GetRideServiceDto
    {
        public int RideServiceId { get; set; }
        public string RideServiceName { get; set; }
    }

    public class GetLocationDto
    {
        public int location_Id { get; set; }

        public string location_description { get; set; }

        public double start_coord_long { get; set; }

        public double start_coord_lat { get; set; }

        public double destination_coord_long { get; set; }

        public double destination_coord_lat { get; set; }
    }

    public class SortLocation
    {
        public double StartLocation { get; set; }
        public double EndLocation { get; set; }
    }

    public class LocationCoordinates
    {
        [Required]
        public string start_location { get; set; }

        [Required]
        public string end_location { get; set; }
    }

    public class AddRideDto
    {
        public int LocationId { get; set; }
        public int RideServiceId { get; set; }
        public DateTime EstimatedArrivalTime { get; set; }
    }

    public class UpdateRideDto
    {
        public int LocationId { get; set; }
        public int RideServiceId { get; set; }
        public DateTime EstimatedArrivalTime { get; set; }
    }
}

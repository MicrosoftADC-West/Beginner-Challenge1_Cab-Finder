namespace Cab_Finder_Lib.Models
{
    public class GetRideDetail
    {
        public Ride Ride { get; set; }
        public decimal Price { get; set; }
        public double Distance { get; set; }
        public string RideServiceName { get; set; }
    }
}

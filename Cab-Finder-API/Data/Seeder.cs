using Cab_Finder_Lib.Models;
using Cab_Finder_Lib;
using Cab_Finder_Lib.Models.DatabaseModels;

namespace Cab_Finder_API.Data
{
    public class Seeder
    {
        private AppDbContext AppDbContext;

        public Seeder(AppDbContext appDbContext)
        {
            AppDbContext = appDbContext;
        }

        public void SeedData()
        {
            var locationPath = "C:\\ADC-Test\\Src\\TestSpace\\JSON\\locations.json";
            var ridesPath = "C:\\ADC-Test\\Src\\TestSpace\\JSON\\rides.json";
            var ridesServicePath = "C:\\ADC-Test\\Src\\TestSpace\\JSON\\rideservices.json";

            var locations = CabFinderMain.ReadFromJSON<LocationDb>(locationPath);
            var rides = CabFinderMain.ReadFromJSON<RideDb>(ridesPath);
            var rideService = CabFinderMain.ReadFromJSON<RideServiceDb>(ridesServicePath);

            foreach(var location in locations)
            {

            }
        }
    }
}

using CabFinder.Data;
using CabFinder.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Data.Common;

namespace MedicalSystem.Data
{
    public class Seeder
    {
        private readonly AppDbContext _ctx;
        private readonly IConfiguration _config;

        public Seeder(AppDbContext ctx,
            IConfiguration config)
        {
            _ctx = ctx;
            _config = config;
        }


        public async Task SeedIt()
        {
            //_ctx.Database.EnsureCreated();
            if (_ctx.Database.GetPendingMigrations().Any())
            {
                _ctx.Database.Migrate();
            }

            try
            {
                var rides = File.ReadAllText(_config.GetSection("SeedDataPaths:Rides").Value);
                var locations = File.ReadAllText(_config.GetSection("SeedDataPaths:Locations").Value);
                var rideServices = File.ReadAllText(_config.GetSection("SeedDataPaths:RideServices").Value);

                // Deserialize seed data
                var ridessToSeed = JsonConvert.DeserializeObject<List<Ride>>(rides);
                var LocationsToSeed = JsonConvert.DeserializeObject<List<Location>>(rides);
                var rideServicesToSeed = JsonConvert.DeserializeObject<List<RideService>>(rides);

                //oya migrate here

            }
            catch (InvalidOperationException)
            {
                // log err
            }
            catch (DbException)
            {
                //log err
            }

        }
    }

}
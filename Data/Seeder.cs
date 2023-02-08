using CabFinder.Data;
using CabFinder.Entities;
using CabFinder.Services;
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
                await CommitSeedToDb<Location>(_config.GetSection("SeedDataPaths:Locations").Value);
                await CommitSeedToDb<CabFinder.Entities.RideService>(_config.GetSection("SeedDataPaths:RideServices").Value);
                await CommitSeedToDb<Ride>(_config.GetSection("SeedDataPaths:Rides").Value);
            }
            catch (InvalidOperationException e)
            {
                // log err
                Console.Write(e.Message);
            }
            catch (DbException e)
            {
                //log err
                Console.Write(e.Message);
            }

        }

        /// <summary>
        /// Checks if record is empty and then seeds from file
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="path"></param>
        /// <returns></returns>
        private async Task CommitSeedToDb<T>(string path) where T : class
        {

            if (!await _ctx.Set<T>().AnyAsync())
            {
                // read seeds from dedicated paths
                var data = File.ReadAllText(path);

                // Deserialize seed data
                var seeds = JsonConvert.DeserializeObject<List<T>>(data);

                foreach (var seed in seeds)
                {
                    await _ctx.AddAsync(seed);
                }
                await _ctx.SaveChangesAsync();
            }
        }
    }

}
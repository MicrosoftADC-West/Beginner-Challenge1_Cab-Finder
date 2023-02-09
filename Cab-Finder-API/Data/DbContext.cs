using Cab_Finder_Lib.Models;
using Cab_Finder_Lib.Models.DatabaseModels;
using Microsoft.EntityFrameworkCore;

namespace Cab_Finder_API.Data
{
    public class AppDbContext : DbContext  
    {
        public DbSet<LocationDb> Locations { get; set; }
        public DbSet<RideDb> Rides { get; set; }
        public DbSet<RideServiceDb> RideServices { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}

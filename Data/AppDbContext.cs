using CabFinder.Entities;
using Microsoft.EntityFrameworkCore;

namespace CabFinder.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Ride> Rides { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<RideService> RideServices { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}

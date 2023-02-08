using CabFinder.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

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
            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                     v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Local));

            builder.Entity<Ride>().Property(c => c.estimated_arrival_time).HasConversion(dateTimeConverter);
            builder.Entity<Ride>().Property(c => c.ride_id).ValueGeneratedOnAdd();
            builder.Entity<Location>().Property(c => c.location_id).ValueGeneratedOnAdd();
            builder.Entity<RideService>().Property(c => c.rideservice_id).ValueGeneratedOnAdd();

            base.OnModelCreating(builder);
        }
    }
}

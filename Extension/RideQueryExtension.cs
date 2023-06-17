using CabFinder.DTOs;
using CabFinder.Entities;

namespace CabFinder.Extension
{
    public static class RideQueryExtension
    {
        public static IQueryable<T> FilterByLocation<T>(this IQueryable<T> entity, StartLocationDto starting, DestinationLocationDto ending) where T : Ride
        {
            return entity.Where(c => c.location.start_coord_lat >= starting.start_latitude 
            && c.location.start_coord_long >= starting.start_longitude
            && c.location.destination_coord_lat <= ending.destination_latitude
            && c.location.destination_coord_long <= ending.destiation_longitude);
        }
    }
}

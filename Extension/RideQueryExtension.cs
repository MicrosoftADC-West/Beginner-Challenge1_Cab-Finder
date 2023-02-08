using CabFinder.DTOs;
using CabFinder.Entities;

namespace CabFinder.Extension
{
    public static class RideQueryExtension
    {
        public static IQueryable<T> FilterByLocation<T>(this IQueryable<T> entity, LocationDto starting, LocationDto ending) where T : Ride
        {
            if(starting is null || ending is null)
            {
                return entity;
            }

            return entity.Where(c => c.location.start_coord_lat >= starting.Latitude 
            && c.location.start_coord_long >= starting.Longitude
            && c.location.destination_coord_lat <= ending.Latitude
            && c.location.destination_coord_long <= ending.Longitude);
        }
    }
}

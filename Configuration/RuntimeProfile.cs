using AutoMapper;
using CabFinder;
using CabFinder.DTOs;
using CabFinder.Entities;

namespace Connect_Backend_API.Configurations
{
    public  class RuntimeProfile : Profile
    {
        public RuntimeProfile()
        {
            CreateMap<CreateRideDto, Ride>();
            CreateMap<UpdateRideDto, Ride>();
            CreateMap<Ride, GetRideDto>()
                .ForMember(dest => dest.price, option => option
                .MapFrom<RidePriceResolver>());
        }
    }
    public class RidePriceResolver : IValueResolver<Ride, GetRideDto, double>
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public RidePriceResolver(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public double Resolve(Ride source, GetRideDto destination, double destMember, ResolutionContext context)
        {
            return source.rideservice.priceperkm * HelperFunction.Haversine(source.location.start_coord_lat, source.location.start_coord_long, source.location.destination_coord_lat, source.location.destination_coord_long);
        }
    }
}

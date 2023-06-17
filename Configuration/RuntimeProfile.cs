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
            
            CreateMap<CreateRideDto, Location>()
                .ForMember(dest => dest.location_description, option => option
                .MapFrom(src => "Location Description"))
                .ForMember(dest => dest.destination_coord_lat, option => option
                .MapFrom(src => src.end_location.destination_latitude))
                .ForMember(dest => dest.destination_coord_long, option => option
                .MapFrom(src => src.end_location.destiation_longitude))
                .ForMember(dest => dest.start_coord_lat, option => option
                .MapFrom(src => src.start_location.start_latitude))
                .ForMember(dest => dest.start_coord_long, option => option
                .MapFrom(src => src.start_location.start_longitude));

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

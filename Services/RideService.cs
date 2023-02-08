using CabFinder.DTOs.Enums;
using CabFinder.DTOs.ServiceDtos;
using CabFinder.Entities;
using Microsoft.EntityFrameworkCore;

namespace CabFinder.Services
{
    public interface IRideService
    {
        Task<CustomResponse<Ride>> Create(Ride ride, CancellationToken token);
        Task<CustomResponse<Ride>> Update(Ride ride, CancellationToken token);
        Task<CustomResponse<Ride>> GetById(int rideId, CancellationToken token);
        IQueryable<Ride> ListAll();
        Task<CustomResponse<bool>> Delete(Ride ride, CancellationToken token);
    }
    public class RideService : IRideService
    {
        private readonly IRepository repository;

        public RideService(IRepository repository)
        {
            this.repository = repository;
        }

        private async Task<Ride> ById(int Id, CancellationToken token)
        {
            return await ListAll()
                .Include(c => c.rideservice)
                .Include(c => c.location)
                .FirstOrDefaultAsync(c => c.ride_id == Id, token);
        }

        public async Task<CustomResponse<Ride>> Create(Ride ride, CancellationToken token)
        {
            if(ride is null)
            {
                return new CustomResponse<Ride>(ServiceResponses.BadRequest, "Ride cannot be null");
            }

            var result = await repository.AddAsync(ride, token);
            if (result)
            {
                return await GetById(ride.ride_id, token);
            }

            return new CustomResponse<Ride>(ServiceResponses.Failed, "Failed to create");
        }

        public async Task<CustomResponse<bool>> Delete(Ride ride, CancellationToken token)
        {
            if (ride is null)
            {
                return new CustomResponse<bool>(ServiceResponses.BadRequest, "Ride cannot be null");
            }

            var result = await repository.DeleteAsync(ride, token);
            if (result)
            {
                return new CustomResponse<bool>(ServiceResponses.Success, true);
            }

            return new CustomResponse<bool>(ServiceResponses.Failed, "Failed to delete");
        }

        public async Task<CustomResponse<Ride>> GetById(int rideId, CancellationToken token)
        {
            var result = await ById(rideId, token);
            if (result is null)
            {
                return new CustomResponse<Ride>(ServiceResponses.NotFound, "Ride not found");
            }
            else
            {
                return new CustomResponse<Ride>(ServiceResponses.Success, result);
            }
        }

        public IQueryable<Ride> ListAll()
        {
            return repository.ListAll<Ride>();
        }

        public async Task<CustomResponse<Ride>> Update(Ride ride, CancellationToken token)
        {
            if (ride is null)
            {
                return new CustomResponse<Ride>(ServiceResponses.BadRequest, "Ride cannot be null");
            }

            var result = await repository.ModifyAsync(ride, token);
            if (result)
            {
                return await GetById(ride.ride_id, token);
            }

            return new CustomResponse<Ride>(ServiceResponses.Failed, "Failed to update");
        }
    }
}

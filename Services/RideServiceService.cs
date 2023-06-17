using CabFinder.DTOs.Enums;
using CabFinder.DTOs.ServiceDtos;
using CabFinder.Entities;
using Microsoft.EntityFrameworkCore;

namespace CabFinder.Services
{
    public interface IRideServiceService
    {
        Task<CustomResponse<Entities.RideService>> Create(Entities.RideService rideService, CancellationToken token);
        Task<bool> Create(List<Entities.RideService> rideService, CancellationToken token);
        Task<CustomResponse<Entities.RideService>> Update(Entities.RideService rideService, CancellationToken token);
        Task<CustomResponse<Entities.RideService>> GetById(int rideServiceId, CancellationToken token);
        IQueryable<Entities.RideService> ListAll();
        Task<CustomResponse<bool>> Delete(Entities.RideService rideService, CancellationToken token);
    }
    public class RideServiceService : IRideServiceService
    {
        private readonly IRepository repository;

        public RideServiceService(IRepository repository)
        {
            this.repository = repository;
        }

        private async Task<Entities.RideService> ById(int Id, CancellationToken token)
        {
            return await ListAll()
                .FirstOrDefaultAsync(c => c.rideservice_id == Id, token);
        }

        public async Task<CustomResponse<Entities.RideService>> Create(Entities.RideService rideService, CancellationToken token)
        {
            if (rideService is null)
            {
                return new CustomResponse<Entities.RideService>(ServiceResponses.BadRequest, "Ride Service cannot be null");
            }

            var result = await repository.AddAsync(rideService, token);
            if (result)
            {
                return await GetById(rideService.rideservice_id, token);
            }

            return new CustomResponse<Entities.RideService>(ServiceResponses.ServerError, "Failed to create");
        }

        public async Task<CustomResponse<bool>> Delete(Entities.RideService rideService, CancellationToken token)
        {
            if (rideService is null)
            {
                return new CustomResponse<bool>(ServiceResponses.BadRequest, "Ride cannot be null");
            }

            var result = await repository.DeleteAsync(rideService, token);
            if (result)
            {
                return new CustomResponse<bool>(ServiceResponses.DeleteSuccess, true);
            }

            return new CustomResponse<bool>(ServiceResponses.ServerError, "Failed to delete");
        }

        public async Task<CustomResponse<Entities.RideService>> GetById(int rideServiceId, CancellationToken token)
        {
            var result = await ById(rideServiceId, token);
            if (result is null)
            {
                return new CustomResponse<Entities.RideService>(ServiceResponses.NotFound, "Ride not found");
            }
            else
            {
                return new CustomResponse<Entities.RideService>(ServiceResponses.Success, result);
            }
        }

        public IQueryable<Entities.RideService> ListAll()
        {
            return repository.ListAll<Entities.RideService>();
        }

        public async Task<CustomResponse<Entities.RideService>> Update(Entities.RideService rideService, CancellationToken token)
        {
            if (rideService is null)
            {
                return new CustomResponse<Entities.RideService>(ServiceResponses.BadRequest, "Ride Service cannot be null");
            }

            var result = await repository.ModifyAsync(rideService, token);
            if (result)
            {
                return await GetById(rideService.rideservice_id, token);
            }

            return new CustomResponse<Entities.RideService>(ServiceResponses.ServerError, "Failed to update");
        }

        public async Task<bool> Create(List<Entities.RideService> rideService, CancellationToken token)
        {
            if (rideService is null)
                return false;

            return await repository.AddRangeAsync(rideService, token);
        }
    }
}

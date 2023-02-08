using CabFinder.DTOs.Enums;
using CabFinder.DTOs.ServiceDtos;
using CabFinder.Entities;
using Microsoft.EntityFrameworkCore;

namespace CabFinder.Services
{
    public interface ILocationService
    {
        Task<CustomResponse<Location>> Create(Location location, CancellationToken token);
        Task<bool> Create(List<Location> location, CancellationToken token);
        Task<CustomResponse<Location>> Update(Location location, CancellationToken token);
        Task<CustomResponse<Location>> GetById(int locationId, CancellationToken token);
        IQueryable<Location> ListAll();
        Task<CustomResponse<bool>> Delete(Location location, CancellationToken token);
    }
    public class LocationService : ILocationService
    {
        private readonly IRepository repository;

        public LocationService(IRepository repository)
        {
            this.repository = repository;
        }

        private async Task<Location> ById(int Id, CancellationToken token)
        {
            return await ListAll()
                .FirstOrDefaultAsync(c => c.location_id == Id, token);
        }

        public async Task<CustomResponse<Location>> Create(Location location, CancellationToken token)
        {
            if (location is null)
            {
                return new CustomResponse<Location>(ServiceResponses.BadRequest, "Location cannot be null");
            }

            var result = await repository.AddAsync(location, token);
            if (result)
            {
                return await GetById(location.location_id, token);
            }

            return new CustomResponse<Location>(ServiceResponses.ServerError, "Failed to create");
        }

        public async Task<CustomResponse<bool>> Delete(Location location, CancellationToken token)
        {
            if (location is null)
            {
                return new CustomResponse<bool>(ServiceResponses.BadRequest, "Location cannot be null");
            }

            var result = await repository.DeleteAsync(location, token);
            if (result)
            {
                return new CustomResponse<bool>(ServiceResponses.DeleteSuccess, true);
            }

            return new CustomResponse<bool>(ServiceResponses.ServerError, "Failed to delete");
        }

        public async Task<CustomResponse<Location>> GetById(int locationId, CancellationToken token)
        {
            var result = await ById(locationId, token);
            if (result is null)
            {
                return new CustomResponse<Location>(ServiceResponses.NotFound, "Location not found");
            }
            else
            {
                return new CustomResponse<Location>(ServiceResponses.Success, result);
            }
        }

        public IQueryable<Location> ListAll()
        {
            return repository.ListAll<Location>();
        }

        public async Task<CustomResponse<Location>> Update(Location location, CancellationToken token)
        {
            if (location is null)
            {
                return new CustomResponse<Location>(ServiceResponses.BadRequest, "Location cannot be null");
            }

            var result = await repository.ModifyAsync(location, token);
            if (result)
            {
                return await GetById(location.location_id, token);
            }

            return new CustomResponse<Location>(ServiceResponses.ServerError, "Failed to update");
        }

        public async Task<bool> Create(List<Location> location, CancellationToken token)
        {
            if (location is null)
                return false;

            return await repository.AddRangeAsync(location, token);
        }
    }
}

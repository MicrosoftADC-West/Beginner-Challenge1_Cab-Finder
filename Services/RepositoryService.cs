using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using CabFinder.Data;

namespace CabFinder.Services
{
    public interface IRepository
    {
        ValueTask<bool> AddAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class;
        ValueTask<bool> AddRangeAsync<T>(List<T> entity, CancellationToken cancellationToken = default) where T : class;
        IQueryable<T> ListAll<T>() where T : class;
        ValueTask<T> FindAsync<T>(string Id) where T : class;
        ValueTask<bool> AnyAsync<T>(string Id) where T : class;
        ValueTask<bool> ModifyAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class;
        ValueTask<bool> DeleteAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class;
        ValueTask<bool> DeleteRangeAsync<T>(List<T> entity, CancellationToken cancellationToken = default) where T : class;
    }

    public class Repository : IRepository
    {
        public HttpContext HttpContext { get; }

        public IMapper Mapper { get; }

        public AppDbContext DbContext { get; }

        public Repository(AppDbContext dbContext, IHttpContextAccessor contextAccessor, IMapper mapper)
        {
            DbContext = dbContext;
            HttpContext = contextAccessor.HttpContext;
            Mapper = mapper;
        }

        public IQueryable<T> ListAll<T>() where T : class
        {
            return DbContext.Set<T>();
        }

        public async ValueTask<T> FindAsync<T>(string Id) where T : class
        {
            if (string.IsNullOrWhiteSpace(Id))
                return null;

            return await DbContext.FindAsync<T>(Id);
        }


        public async ValueTask<bool> AddAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class
        {
            await DbContext.AddAsync(entity, cancellationToken);
            return await DbContext.SaveChangesAsync(cancellationToken) > 0;
        }


        public async ValueTask<bool> AddRangeAsync<T>(List<T> entity, CancellationToken cancellationToken = default) where T : class
        {
            await DbContext.AddRangeAsync(entity, cancellationToken);
            return await DbContext.SaveChangesAsync(cancellationToken) > 0;
        }

        public async ValueTask<bool> ModifyAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class
        {
            DbContext.Update<T>(entity);
            return await DbContext.SaveChangesAsync(cancellationToken) > 0;
        }

        public async ValueTask<bool> DeleteAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class
        {
            DbContext.Remove<T>(entity);
            return await DbContext.SaveChangesAsync(cancellationToken) > 0;
        }

        public async ValueTask<bool> AnyAsync<T>(string Id) where T : class
        {
            var result = await ListAll<T>().AnyAsync<T>();
            return result;
        }

        public async ValueTask<bool> DeleteRangeAsync<T>(List<T> entity, CancellationToken cancellationToken = default) where T : class
        {
            DbContext.RemoveRange(entity);
            return await DbContext.SaveChangesAsync(cancellationToken) > 0;
        }
        public async ValueTask<IDbContextTransaction> BeginTransactionAsync()
        {
            return await DbContext.Database.BeginTransactionAsync();
        }
    }
}

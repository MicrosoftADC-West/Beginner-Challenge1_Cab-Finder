using CabFinder.Services;
using MedicalSystem.Data;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace CabFinder.Configurations
{
    public static class ScopedServices
    {
        public static IServiceCollection AddScopedServices(this IServiceCollection services) => services
            .AddScoped<IRepository, Repository>()
            .AddScoped<IRideService, RideService>()
            .AddTransient<Seeder>();
    }
}

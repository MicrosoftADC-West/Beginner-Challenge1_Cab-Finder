namespace CabFinder.Configurations
{
    public static class Automapper
    {
        public static IServiceCollection ConfigureAutoMapper(this IServiceCollection services) => services.AddAutoMapper(typeof(Program));
    }
}

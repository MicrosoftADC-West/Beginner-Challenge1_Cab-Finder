using CabFinder.Configurations;
using MedicalSystem.Data;
using Microsoft.Extensions.DependencyInjection.Extensions;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("ConnectionString");
builder.Services.ConfigureDatabase(connectionString);

// Add services to the container.
builder.Services.AddScopedServices();
builder.Services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.ConfigureAutoMapper();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

await SeedDatabaseAsync();

app.UseAuthorization();

app.MapControllers();

app.Run();

async Task SeedDatabaseAsync()
{
    using (var scope = app.Services.CreateScope())
    {
        var dbInitializer = scope.ServiceProvider.GetRequiredService<Seeder>();
        await dbInitializer.SeedIt();
    }
}
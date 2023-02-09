using Cab_Finder_API.Data;
using Cab_Finder_API.Services;
using Cab_Finder_API.Services.Interfaces;
using Cab_Finder_Lib.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("ConnectionString");
// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString));

builder.Services.AddScoped<IRideService, RideServiceImplementation>();

var app = builder.Build();


#region Seeder
//var serviceProvider = builder.Services.BuildServiceProvider();

//var dbContext = serviceProvider.GetRequiredService<AppDbContext>();
//var seederClass = new Seeder(dbContext);

//seederClass.SeedData();
#endregion

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

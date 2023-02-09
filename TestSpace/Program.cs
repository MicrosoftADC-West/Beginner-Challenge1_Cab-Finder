using Cab_Finder_Lib;
using Cab_Finder_Lib.Models;
using System.Text.Json;

Console.WriteLine("Hello, World!");

var locationPath = "C:\\ADC-Test\\Src\\TestSpace\\JSON\\locations.json";
var ridesPath = "C:\\ADC-Test\\Src\\TestSpace\\JSON\\rides.json";
var ridesServicePath = "C:\\ADC-Test\\Src\\TestSpace\\JSON\\rideservices.json";

var locations = CabFinderMain.ReadFromJSON<Location>(locationPath);
var rides = CabFinderMain.ReadFromJSON<Ride>(ridesPath);
var rideService = CabFinderMain.ReadFromJSON<RideService>(ridesServicePath);


Console.WriteLine("Price details are:");
var priceDetails = CabFinderMain.GetRideDetails(locations, rideService, rides);
foreach(var priceDetail in priceDetails)
{
    Console.WriteLine($"Ride Service name: {priceDetail.RideServiceName}");
    Console.WriteLine($"Price: {priceDetail.Price}");
    Console.WriteLine($"Ride Id: {priceDetail.Ride.ride_id}");
    Console.WriteLine($"Location Id: {priceDetail.Ride.location_id}");
    Console.WriteLine($"Ride Service Id: {priceDetail.Ride.rideservice_id}");
    Console.WriteLine($"Estimated Arrival Time:, {priceDetail.Ride.estimated_arrival_time}");
}


Console.WriteLine();
Console.WriteLine("Best Price of all rides is given as:");
var result = CabFinderMain.ComputeBestPrice(locations, rideService, rides);
Console.WriteLine(result.RideServiceName);
Console.WriteLine(result.Price);

Console.ReadLine();
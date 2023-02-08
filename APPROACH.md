# Challenge Your Skills Learnathon
# **Contoso Cheap Cab Finder**

**Mishael Abiola Solution**

**Challenge 1:**

You are given a dataset containing a list of route/locations data, booked rides with corresponding ride service and a list of ride services with the amount they charge per kilometer. These datasets are available in different formats hence for this challenge you will be using the csv data provided.

Pre-requisites:

Write a helper method that takes each of the csv data provided and parses them into the respective data structures that will help you solve the problem.

### Solution 
        
        public static List<T> CSVToObj<T>(string path)  where T : class
        {
            using (var reader = new StreamReader(path))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records = csv.GetRecords<T>().ToList();
                return records;
            }
        }
        
        public static List<T> JSONConvert<T>(string path) where T : class
        {
            return JsonConvert.DeserializeObject<List<T>>(File.ReadAllText(path));
        }

**Above are two generic helper functions capable of taking either a csv or json file path and returns the data**  

Task 1:

Write a method that takes in a list of routes, ride services and booked rides then calculate the cost of each ride(price) based on the distance covered and return a list containing the details of each ride and their corresponding prices.

Hint: _Use Haversine formular to calculate the distance between the start coordinates and the destination coordinates._

### Solution
            /// <summary>
            /// This Gets the ride details from a list of inputs
            /// </summary>
            /// <param name="rides"><see cref="List{Ride}"/> rides</param>
            /// <param name="rideServices"><see cref="List{RideService}"/> ride services</param>
            /// <param name="locations"><see cref="List{Location}"/> locatios</param>
            /// <returns><see cref="List{GetRideDetail}"/> Ride Detail</returns>
            public static List<GetRideDetail> GetRideDetails(List<Ride> rides, List<RideService> rideServices, List<Location> locations) {

            var rideDetailList = new List<GetRideDetail>();

            rides.ForEach(c =>
            {
                var _rideService = rideServices.FirstOrDefault(cl => cl.rideservice_id == c.rideservice_id);
                var _location = locations.FirstOrDefault(cl => cl.location_id == c.location_id);
                if (_rideService is not null && _location is not null)
                {
                    var distance = Haversine(_location.start_coord_lat, _location.start_coord_long, _location.destination_coord_lat, _location.destination_coord_long);
                    rideDetailList.Add(new GetRideDetail()
                    {
                        RideId = c.ride_id,
                        Distance = distance,
                        Description = _location.location_description,
                        Price = distance * _rideService.priceperkm,
                        RideService = _rideService.rideservice_name
                    });
                }
            });

            return rideDetailList;
        }
        
        ///Get Ride Detail Class
        public class GetRideDetail
        {
            public int RideId { get; set; }
            public double Distance { get; set; }
            public string Description { get; set; }
            public string RideService { get; set; }
            public double Price { get; set; }
        }
        
        /// <summary>
        /// Harversine function to return distance from coordinates
        /// </summary>
        /// <param name="lat1"><see cref="double"/> Latitude 1</param>
        /// <param name="lon1"><see cref="double"/> Longitude 1</param>
        /// <param name="lat2"><see cref="double"/> Latitude 2</param>
        /// <param name="lon2"><see cref="double"/> Longitude 2</param>
        /// <returns><see cref="double"/> Distance </returns>
        public static double Haversine(double lat1, double lon1, double lat2, double lon2)
        {
            const double p = Math.PI;
            const double Radius = 6371;

            var a = 0.5 - Math.Cos((lat2 - lat1) * p) / 2 +
                Math.Cos(lat1 * p) * Math.Cos(lat2 * p) *
                (1 - Math.Cos((lon2 - lon1) * p)) / 2;

            return 2 * Radius * Math.Asin(Math.Sqrt(a));
        }
        
        ///Print Extension
        public static void Print(this List<GetRideDetail> res)
        {
            foreach (var rr in res)
            {
                Console.WriteLine($"RideId: {rr.RideId}, RideService: {rr.RideService}, Price: {rr.Price}, Distance: {rr.Distance}");
            }
        }
        
        ///Implementation
        
        string path = "C:\\Users\\Ilife\\source\\repos\\CabFinder\\Data\\JSON\\locations.json";
        string path2 = "C:\\Users\\Ilife\\source\\repos\\CabFinder\\Data\\JSON\\rides.json";
        string path3 = "C:\\Users\\Ilife\\source\\repos\\CabFinder\\Data\\JSON\\rideservices.json";
        
        //Fetch Objects
        var locations = HelperFunction.JSONConvert<Location>(path);
        var rides = HelperFunction.JSONConvert<Ride>(path2);
        var rideServices = HelperFunction.JSONConvert<RideService>(path3);
        
        
        //Task 1
        Console.WriteLine("------------Task 1-----------");
        HelperFunction.GetRideDetails(rides, rideServices, locations).Print();
        
        
### Sample Result  

------------Task 1-----------  
RideId: 1, RideService: EasyTaxi, Price: 52521.374552778536, Distance: 1250.5089179232984  
RideId: 2, RideService: Gokada, Price: 49183.09073611443, Distance: 1639.4363578704808  
RideId: 3, RideService: Lagride, Price: 57371.4135952435, Distance: 1043.1166108226091  
RideId: 4, RideService: Uber, Price: 38364.52066483134, Distance: 767.2904132966268  
RideId: 199, RideService: Uber, Price: 74089.39721647734, Distance: 1481.787944329547  
RideId: 200, RideService: Bolt, Price: 6801.925273285281, Distance: 151.15389496189513

Task 2:

Leveraging your approach in Task 1, Write a method that takes in a list of routes, ride services, booked rides and computes the best price, the method should return an object containing the name of the ride service and the best price.

### Solution
Leveraging the GetRideDetails method, I prepared two algorithms to present soluions to the problem

        /// <summary>
        /// Get Best Ride Function using the sort/order method
        /// </summary>
        /// <param name="rides"><see cref="List{Ride}"/> rides</param>
        /// <param name="rideServices"><see cref="List{RideService}"/> ride services</param>
        /// <param name="locations"><see cref="List{Location}"/> locatios</param>
        /// <returns><see cref="BestRideDto"/>Best ride</returns>
        public static BestRideDto GetBestPrice(List<Location> locations, List<Ride> rides, List<RideService> rideServices)
        {
            var rideDetailList = GetRideDetails(rides, rideServices, locations);

            var dbb = new List<KeyValuePair<SubRide, double>>();

            rideDetailList.ForEach(c =>
            {
                dbb.Add(new KeyValuePair<SubRide, double>(new SubRide(c.RideService, c.Distance), c.Price));
            });

            var ef = dbb.OrderByDescending(c => c.Key.Distance)
                .OrderBy(c => c.Value)
                .Select(c => new { c.Key.RideService, c.Key.Distance, c.Value }).MaxBy(c => c.Distance);

            return new BestRideDto() { Price = ef.Value, RideService = ef.RideService, Distance = ef.Distance };
        }

        /// <summary>
        /// Get Best Ride Function using the optimal avg price per distance of the rides
        /// </summary>
        /// <param name="rides"><see cref="List{Ride}"/> rides</param>
        /// <param name="rideServices"><see cref="List{RideService}"/> ride services</param>
        /// <param name="locations"><see cref="List{Location}"/> locatios</param>
        /// <returns><see cref="BestRideDto"/>Best ride</returns>
        public static BestRideDto GetBestPrice2(List<Location> locations, List<Ride> rides, List<RideService> rideServices)
        {
            var rideDetailList = GetRideDetails(rides, rideServices, locations);

            var dbbNew = new List<(string, double, double, double)>();

            rideDetailList.ForEach(c =>
            {
                var perDis = c.Price / c.Distance;
                dbbNew.Add(new (c.RideService, c.Price, c.Distance, perDis));
            });

            var ef = dbbNew.OrderBy(c => c.Item4).FirstOrDefault();

            return new BestRideDto() { Price = ef.Item2, RideService = ef.Item1, Distance = ef.Item3 };
        }
        
        ///Best Ride Dto class
        public class BestRideDto
        {
            public string RideService { get; set; }
            public double Distance { get; set; }
            public double Price { get; set; }
        }
        
        ///Print Extension
        public static void Print2(this BestRideDto res)
        {
            Console.WriteLine($"RideService: {res.RideService}, Price: {res.Price} Distance: {res.Distance}");
        }
        
        
        //Implementation
        Console.WriteLine("----------------Task 2--------------");
        HelperFunction.GetBestPrice(locations, rides, rideServices).Print2();
        Console.WriteLine("----------------Task 2 {Algo 2}--------------");
        HelperFunction.GetBestPrice2(locations, rides, rideServices).Print2();

### Sample Result
----------------Task 2--------------  
RideService: ORide, Price: 90120.41934309612 Distance: 2574.8691240884605  
----------------Task 2 {Algo 2}--------------  
RideService: Gokada, Price: 37515.26753769895 Distance: 1250.5089179232984


**Challenge 2:**

You are given a dataset containing a list of route/locations data, booked rides with corresponding ride service and a list of ride services with the amount they charge per kilometer. These datasets are available in different formats hence for this challenge you will be using the data format that best aligns with the database server you are most comfortable with.

Pre-requisites:

Using your preferred database server, migrate the provided data into your database.

### Solution
I used a seeder service method

    public async Task SeedIt()
            {
                //_ctx.Database.EnsureCreated();
                if (_ctx.Database.GetPendingMigrations().Any())
                {
                    _ctx.Database.Migrate();
                }

            try
            {
                await CommitSeedToDb<Location>(_config.GetSection("SeedDataPaths:Locations").Value);
                await CommitSeedToDb<CabFinder.Entities.RideService>(_config.GetSection("SeedDataPaths:RideServices").Value);
                await CommitSeedToDb<Ride>(_config.GetSection("SeedDataPaths:Rides").Value);
            }
            catch (InvalidOperationException e)
            {
                // log err
                Console.Write(e.Message);
            }
            catch (DbException e)
            {
                //log err
                Console.Write(e.Message);
            }

        }

        /// <summary>
        /// Checks if record is empty and then seeds from file
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="path"></param>
        /// <returns></returns>
        private async Task CommitSeedToDb<T>(string path) where T : class
        {

            if (!await _ctx.Set<T>().AnyAsync())
            {
                // read seeds from dedicated paths
                var data = File.ReadAllText(path);

                // Deserialize seed data
                var seeds = JsonConvert.DeserializeObject<List<T>>(data);

                foreach (var seed in seeds)
                {
                    await _ctx.AddAsync(seed);
                }
                await _ctx.SaveChangesAsync();
            }
        }

Task 1:

Create a web user interface to implement application functionalities as stated above using your preferred tech stack.

Task 2:

Create a restful API with the below API contracts

The API contracts for the Ride Price Aggregator service would include the following endpoints:

1. GET /rides - Retrieve a list of all available rides including prices between a given starting coordinates (long, lat) and destination coordinate (long, lat).

Query Parameters:

- start\_location (required): The starting coordinates for the ride.
- end\_location (required): The destination coordinates for the ride.

Response:

- 200 OK: Returns a list of rides, including the price, ride service, and estimated arrival time for each ride.
- 400 Bad Request: If the required query parameters are not provided.
- 500 Internal Server Error: If there is an error fetching the data from the database or external API.

1. GET /rides/:id - Retrieve details for a specific ride.

Path Parameters:

- id (required): The ID of the ride to retrieve.

Response:

- 200 OK: Returns the details for the specified ride, including the price, ride service, and estimated arrival time.
- 404 Not Found: If the specified ride ID does not exist.
- 500 Internal Server Error: If there is an error fetching the data from the database.

1. POST /rides - Add a new ride to the database.

Request Body:

- start\_location (required): The starting location for the ride.
- end\_location (required): The destination location for the ride.
- ride\_service (required): The ride service (e.g., Uber, Lyft, Taxi) for the ride.
- estimated\_arrival\_time (required): The estimated arrival time for the ride.

Response:

- 201 Created: Returns the ID of the newly created ride.
- 400 Bad Request: If any of the required fields are missing from the request body.
- 500 Internal Server Error: If there is an error adding the ride to the database.

1. PUT /rides/:id - Update an existing ride in the database.

Path Parameters:

id (required): The ID of the ride to update.

Request Body:

- start\_location: The starting location for the ride.
- end\_location: The destination location for the ride.
- ride\_service: The ride service (e.g., Uber, Lyft, Taxi) for the ride.
- estimated\_arrival\_time: The estimated arrival time for the ride.

Response:

- 200 OK: Returns the updated ride details
- 400 Bad Request: If any of the required fields are missing from the request body.
- 404 Not Found: If the specified ride ID does not exist.
- 500 Internal Server Error: If there is an error updating the ride in the database.

1. DELETE /rides/:id - Delete an existing ride from the database.

Path Parameters:

- id (required): The ID of the ride to be deleted.

Response:

- 204 No Content: If the ride is successfully deleted.
- 404 Not Found: If the specified ride ID does not exist.
- 500 Internal Server Error: If there is an error deleting the ride from the database.


### Solution
Swagger View  
![swagger view](https://i.ibb.co/n0NGpvb/photo-2023-02-08-19-41-56.jpg)

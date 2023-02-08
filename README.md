# Challenge Your Skills Learnathon
# **Contoso Cheap Cab Finder**

**Duration** : 120 mins

**Difficulty level** : Beginner

**Prerequisite** : Knowledge of an IDE with the web development workload.

**Prerequisite Knowledge** : Any Programming Language, Any Web Framework API, Endpoint UI

**Thematic Area** : Problem Solving and Web Development

**Objective** :

Develop a web application that allows users to compare the best prices for rides between two locations using multiple ride services.

**Functionalities:**

The user should be able to enter a starting and destination location, and the app should display the prices for different ride services (e.g., Uber, InDrive, Taxi, Bolt) for that route.

The prices per ride should be calculated based on the data given, and the app should display the current best price at the top.

The user should be able to sort the prices by ride service, price, and estimated arrival time.

**Assumptions** :

- There is a finite amount of available routes/location with indicated start coordinates and destination coordinates which is unique. For example, a user cannot book a ride in routes not represented in the locations table/document.
- Ride services only provides their price per kilometer, so to calculate the price
- The distance in kilometer (KM) between two coordinates (long and lat) is assumed to be based on [Haversine formula - Wikipedia,](https://en.wikipedia.org/wiki/Haversine_formula)you are expected to write a helper function that calculates this distance. See [algorithm - Calculate distance between two latitude-longitude points? (Haversine formula) - Stack Overflow.](https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula)

**Data** :

- The data should be stored in a database for fast retrieval and caching.
- The database schemas are [normalized](http://en.wikipedia.org/wiki/Database_normalization) so feel free to de-normalize your schema in case you are using a NoSQL database.

**Database schema** :

A "Rides" table with the following fields:

- ride\_id (primary key)
- Location\_id (foreign key)
- rideservice\_id
- estimated\_arrival\_time

A "Locations" table with the following fields:

- location\_id (primary key)
- location\_description
- start\_coord\_long
- start\_coord\_lat
- destination\_coord\_long
- destination\_coord\_lat

A "Ride Services" table with the following fields:

- rideservice\_id (primary key)
- rideservice\_name (foreign key) (e.g., Uber, InDrive, Taxi, Bolt)
- priceperkm

**Challenge 1:**

You are given a dataset containing a list of route/locations data, booked rides with corresponding ride service and a list of ride services with the amount they charge per kilometer. These datasets are available in different formats hence for this challenge you will be using the csv data provided.

Pre-requisites:

Write a helper method that takes each of the csv data provided and parses them into the respective data structures that will help you solve the problem.

Task 1:

Write a method that takes in a list of routes, ride services and booked rides then calculate the cost of each ride(price) based on the distance covered and return a list containing the details of each ride and their corresponding prices.

Hint: _Use Haversine formular to calculate the distance between the start coordinates and the destination coordinates._

Task 2:

Leveraging your approach in Task 1, Write a method that takes in a list of routes, ride services, booked rides and computes the best price, the method should return an object containing the name of the ride service and the best price.

**Challenge 2:**

You are given a dataset containing a list of route/locations data, booked rides with corresponding ride service and a list of ride services with the amount they charge per kilometer. These datasets are available in different formats hence for this challenge you will be using the data format that best aligns with the database server you are most comfortable with.

Pre-requisites:

Using your preferred database server, migrate the provided data into your database.

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

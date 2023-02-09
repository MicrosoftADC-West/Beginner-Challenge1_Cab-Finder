const location = require("./Data/JSON/locations.json");
const ride = require("./Data/JSON/rides.json");
const rideservices = require("./Data/JSON/rideservices.json");

const haversineDistance = ([lat1, lon1], [lat2, lon2]) => {
  const toRadian = (angle) => (Math.PI / 180) * angle;
  const distance = (a, b) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  lat1 = toRadian(lat1);
  lat2 = toRadian(lat2);

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));

  let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

  return finalDistance;
};

const totalDistance = [];
location.map((item, i) => {
  totalDistance.push(
    haversineDistance(
      [item.start_coord_lat, item.start_coord_long],
      [item.destination_coord_lat, item.destination_coord_long]
    )
  );
});

const pricePerRide = (priceperkm, distance) => {
  let price = priceperkm * distance;

  return price;
};

const getFare = (location_) => {
  const customerLocation = location.find(
    (locations) =>
      locations.location_description === location_.location_description
  );

  const totalDistance = haversineDistance(
    [customerLocation.start_coord_lat, customerLocation.start_coord_long],
    [
      customerLocation.destination_coord_lat,
      customerLocation.destination_coord_long,
    ]
  );

  const totalPrice = [];

  rideservices.map((item) => {
    totalPrice.push({
      cab_service: item.rideservice_name,
      price: pricePerRide(item.priceperkm, totalDistance),
      total_distance: totalDistance,
      location: customerLocation.location_description,
    });
  });

  return totalPrice;
};

const allFares = [];

location.map((item) => {
  allFares.push(getFare(item));
});

const bestPrice = [];

allFares.map((item) => {
  const minPrice = item.reduce((a, b) => {
    // console.log(a, b)
    // Math.min(a.price, b.price)
  });

  //   console.log(minPrice);

  bestPrice.push(minPrice);
});

// console.log(bestPrice);

console.log(allFares);

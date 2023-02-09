const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
//   const offset = helper.getOffset(page, config.listPerPage);
  const locations = await db.query(
    `SELECT
    location_id,	
    location_description,	
    start_coord_long,	
    start_coord_lat,	
    destination_coord_long,	
    destination_coord_lat,
    FROM locations`
  );
  const rides = await db.query(
    `SELECT
    ride_id,
    location_id,	
    start_coord_long,	
    start_coord_lat,	
    destination_coord_long,	
    destination_coord_lat,
    estimated_arrival_time,
    FROM Ride`
  );
  const rideServices = await db.query(
    `SELECT
    rideservice_id,	
    rideservice_name,	
    priceperkm,
    FROM rideservice`
  );

  const locationData = helper.emptyOrRows(locations);
  const ridesData = helper.emptyOrRows(rides);
  const rideServicesData = helper.emptyOrRows(rideServices);

  const meta = {page};
  
  return {
    locationData,
    ridesData,
    rideServicesData,
    meta
  }
}

// create method service
async function create(location){
  const result = await db.query(
    `INSERT INTO location
    (start_locatiion, end_location, ride_servce, estimated_arrival_time) 
    VALUES 
    (${location.start_location}, ${location.end_location}, ${location.ride_service}, ${location.estimated_arrival_time})`
  );

  let message = 'Error in creating location values';

  if (result.affectedRows) {
    message = 'All location values created successfully';
  }

  return {message};
}

// update method service
async function update(id, rideInfo){
  const result = await db.query(
    `UPDATE programming_languages 
    SET name="${rideInfo.name}", released_year=${rideInfo.released_year}, githut_rank=${rideInfo.githut_rank}, 
    pypl_rank=${rideInfo.pypl_rank}, tiobe_rank=${rideInfo.tiobe_rank} 
    WHERE id=${id}` 
  );

  let message = 'Error in updating programming language';

  if (result.affectedRows) {
    message = 'Programming language updated successfully';
  }

  return {message};
}

// delete
async function remove(id){
  const result = await db.query(
    `DELETE FROM programming_languages WHERE id=${id}`
  );

  let message = 'Error in deleting programming language';

  if (result.affectedRows) {
    message = 'Programming language deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
}
const db = require('../configs/databaseConn');

class Ride {
  static findAll() {
    return db.execute(
      'SELECT * FROM ride \
      LEFT OUTER JOIN locations ON \
      ride.location_id = locations.location_id'
    );
  }

  static findById(id) {
    return db.execute(
      'SELECT * FROM ride LEFT OUTER JOIN \
            locations ON ride.location_id = locations.location_id \
            LEFT OUTER JOIN rideservice ON \
            rideservice.rideservice_id = ride.rideservice_id \
            WHERE ride_id = ? LIMIT 1',
      [id]
    );
  }

  static create(obj) {
    return db.execute(
      'INSERT INTO ride (location_id, rideservice_id, estimated_arrival_time)\
             VALUES (?,?,?)',
      [obj.location_id, obj.rideservice_id, obj.estimated_arrival_time]
    );
  }

  static findByIdandDelete(id) {
    return db.execute('DELETE FROM ride WHERE ride_id = ?', [id]);
  }

  static findByIdAndUpdate(id, stmts, values) {
    return db.execute(
      `UPDATE ride SET ${stmts.join(', ')} WHERE ride_id = ?`,
      values,
      [id]
    );
  }
}

class Location {
  static findByCoord(obj) {
    return db.execute(
      'SELECT * FROM location AS l WHERE \
            l.start_coord_long = ? AND l.start_coord_lat = ? AND \
            l.destination_coord_long = ? AND l.destination_coord_lat = ?  LIMIT 1',
      [
        obj.start_coord_long,
        obj.start_coord_lat,
        obj.destination_coord_long,
        obj.destination_coord_lat,
      ]
    );
  }
}

class RideService {
  static findByName(name) {
    return db.execute(
      'SELECT * FROM rideservice \
            WHERE rideservice_name = ? LIMIT 1',
      [name]
    );
  }
}

module.exports = {
  Ride,
  Location,
  RideService,
};

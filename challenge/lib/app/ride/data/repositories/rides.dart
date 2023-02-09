import '../../../../globals/app_values.dart';
import '../../../../test_cases/locations.dart';
import '../../../../test_cases/rides.dart';
import '../../../../test_cases/rideservices.dart';
import '../../../../util/log.util.dart';
import '../../routes/models/route.dart';
import '../endpoint.dart';
import '../models/latlong.dart';
import '../models/ride.dart';

class RidesRepository {
  static ChallengeEndpoint get _getRides => ChallengeEndpoint("GET", "/rides");

  static Future<List<Ride>?> getRides({
    required LatLong startLocation,
    required LatLong endLocation,
    Function(String)? onError,
  }) async {
    // ! ----------------REMOVE THIS-----------------------------------
    await Future.delayed(const Duration(seconds: 2));
    try {
      final route = Route.fromMap(tLocations.firstWhere((element) =>
          element["start_coord_long"] == startLocation.longitude &&
          element["start_coord_lat"] == startLocation.latitude &&
          element["destination_coord_long"] == endLocation.longitude &&
          element["destination_coord_lat"] == endLocation.latitude));

      LogUtil.devLog("GET /rides", message: route.toString());

      return tRides
          .where((e) => e["location_id"] == route.locationId)
          .map((e) => Ride.fromMap({}
            ..addAll(Map<String, dynamic>.from(e))
            ..addAll({
              "route": route.toMap(),
              "rideService": tRideServices.firstWhere(
                  (f) => f["rideservice_id"] == e["rideservice_id"]),
            })))
          // .toSet()
          .toList();
    } catch (e) {
      onError?.call("Route not found");
      LogUtil.logError("Rides Repository", message: e.toString());
      return null;
    }
    // ! ----------------REMOVE THIS-----------------------------------

    // TODO: Integrate with backend
    return await _getRides.hit<List<Ride>>(
      AppValues.xApiToken,
      queryParameters: {
        "start_location": startLocation.toString(),
        "end_location": endLocation.toString(),
      },
      map: (responseBody) =>
          List.from(responseBody["data"]).map((e) => Ride.fromJson(e)).toList(),
      onError: onError,
    );
  }

  static ChallengeEndpoint _getRide({required String id}) =>
      ChallengeEndpoint("GET", "/rides/$id");

  static Future<Ride?> getRide({
    required String rideId,
    Function(String)? onError,
  }) async {
    // ! ----------------REMOVE THIS-----------------------------------
    try {
      final rideMap = tRides.firstWhere((e) => e["ride_id"] == rideId);

      final ride = Ride.fromMap({}
        ..addAll(rideMap)
        ..addAll({
          "route": tLocations
              .firstWhere((f) => f["location_id"] == rideMap["location_id"]),
          "rideService": tRideServices.firstWhere(
              (f) => f["rideservice_id"] == rideMap["rideservice_id"]),
        }));

      return ride;
    } catch (e) {
      onError?.call("Ride not found");
      LogUtil.logError("Rides Repository", message: "Ride not found");
      return null;
    }
    // ! ----------------REMOVE THIS-----------------------------------

    // TODO: Integrate with backend
    return await _getRide(id: rideId).hit<Ride>(
      AppValues.xApiToken,
      map: (responseBody) => Ride.fromJson(responseBody["data"]),
      onError: onError,
    );
  }
}

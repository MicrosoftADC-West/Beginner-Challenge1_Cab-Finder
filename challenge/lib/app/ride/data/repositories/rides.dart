import '../../../../globals/app_values.dart';
import '../../../../test_cases/locations.dart';
import '../../../../test_cases/rides.dart';
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
      final route = Route.fromJson(tLocations.firstWhere((element) =>
          element["start_coord_long"] == startLocation.longitude &&
          element["start_coord_lat"] == startLocation.latitude &&
          element["destination_coord_long"] == endLocation.longitude &&
          element["destination_coord_lat"] == endLocation.latitude));

      return tRides
          .map((e) => Ride.fromJson(e))
          .where((e) => e.locationId == route.locationId)
          // .toSet()
          .toList();
    } catch (e) {
      onError?.call("Route not found");
      LogUtil.logError("Rides Repository", message: "Route not found");
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
      final ride =
          Ride.fromJson(tRides.firstWhere((e) => e["ride_id"] == rideId));

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

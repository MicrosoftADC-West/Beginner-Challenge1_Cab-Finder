// To parse this JSON data, do
//
//     final route = routeFromJson(jsonString);

import 'dart:convert';

class Route {
  Route({
    required this.locationId,
    required this.locationDescription,
    required this.startCoordLong,
    required this.startCoordLat,
    required this.destinationCoordLong,
    required this.destinationCoordLat,
  });

  factory Route.fromJson(Map<dynamic, dynamic> json) => Route(
        locationId: json["location_id"],
        locationDescription: json["location_description"],
        startCoordLong: json["start_coord_long"]?.toDouble(),
        startCoordLat: json["start_coord_lat"]?.toDouble(),
        destinationCoordLong: json["destination_coord_long"]?.toDouble(),
        destinationCoordLat: json["destination_coord_lat"]?.toDouble(),
      );

  factory Route.fromRawJson(String str) => Route.fromJson(json.decode(str));

  final double destinationCoordLat;
  final double destinationCoordLong;
  final String locationDescription;
  final int locationId;
  final double startCoordLat;
  final double startCoordLong;

  String toRawJson() => json.encode(toJson());

  Map<String, dynamic> toJson() => {
        "location_id": locationId,
        "location_description": locationDescription,
        "start_coord_long": startCoordLong,
        "start_coord_lat": startCoordLat,
        "destination_coord_long": destinationCoordLong,
        "destination_coord_lat": destinationCoordLat,
      };
}

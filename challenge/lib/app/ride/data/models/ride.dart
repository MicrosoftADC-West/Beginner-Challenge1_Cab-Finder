// To parse this JSON data, do
//
//     final ride = rideFromJson(jsonString);

import 'dart:convert';

class Ride {
  Ride({
    required this.rideId,
    required this.locationId,
    required this.rideserviceId,
    required this.estimatedArrivalTime,
  });

  factory Ride.fromJson(Map<dynamic, dynamic> json) => Ride(
        rideId: json["ride_id"],
        locationId: json["location_id"],
        rideserviceId: json["rideservice_id"],
        estimatedArrivalTime: json["estimated_arrival_time"],
      );

  factory Ride.fromRawJson(String str) => Ride.fromJson(json.decode(str));

  final String estimatedArrivalTime;
  final int locationId;
  final int rideId;
  final int rideserviceId;

  String toRawJson() => json.encode(toJson());

  Map<String, dynamic> toJson() => {
        "ride_id": rideId,
        "location_id": locationId,
        "rideservice_id": rideserviceId,
        "estimated_arrival_time": estimatedArrivalTime,
      };

  @override
  bool operator ==(Object? other) =>
      other.runtimeType == runtimeType &&
      (other as Ride).locationId == locationId &&
      (other).rideId == rideId &&
      (other).rideserviceId == rideserviceId;
}

// To parse this JSON data, do
//
//     final ride = rideFromJson(jsonString);

import 'dart:convert';

import 'package:challenge/app/ride/routes/models/route.dart';
import 'package:challenge/app/ride/services/models/rideservice.dart';
import 'package:equatable/equatable.dart';

class Ride extends Equatable {
  const Ride({
    required this.estimatedArrivalTime,
    required this.locationId,
    required this.rideId,
    required this.rideService,
    required this.rideserviceId,
    required this.route,
  });

  factory Ride.fromJson(String source) => Ride.fromMap(json.decode(source));

  factory Ride.fromMap(Map<dynamic, dynamic> map) {
    return Ride(
      estimatedArrivalTime: map['estimated_arrival_time'] ?? '',
      locationId: map['location_id']?.toInt() ?? 0,
      rideId: map['ride_id']?.toInt() ?? 0,
      rideService: RideService.fromMap(map['rideService']),
      rideserviceId: map['rideservice_id']?.toInt() ?? 0,
      route: Route.fromMap(map['route']),
    );
  }

  final String estimatedArrivalTime;
  final int locationId;
  final int rideId;
  final RideService rideService;
  final int rideserviceId;
  final Route route;

  @override
  bool operator ==(Object? other) =>
      other.runtimeType == runtimeType &&
      (other as Ride).locationId == locationId &&
      (other).rideId == rideId &&
      (other).rideserviceId == rideserviceId;

  @override
  List<Object> get props {
    return [
      estimatedArrivalTime,
      locationId,
      rideId,
      rideService,
      rideserviceId,
      route,
    ];
  }

  @override
  String toString() {
    return 'Ride(estimatedArrivalTime: $estimatedArrivalTime, locationId: $locationId, rideId: $rideId, rideService: $rideService, rideserviceId: $rideserviceId, route: $route)';
  }

  Ride copyWith({
    String? estimatedArrivalTime,
    int? locationId,
    int? rideId,
    RideService? rideService,
    int? rideserviceId,
    Route? route,
  }) {
    return Ride(
      estimatedArrivalTime: estimatedArrivalTime ?? this.estimatedArrivalTime,
      locationId: locationId ?? this.locationId,
      rideId: rideId ?? this.rideId,
      rideService: rideService ?? this.rideService,
      rideserviceId: rideserviceId ?? this.rideserviceId,
      route: route ?? this.route,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'estimated_arrival_time': estimatedArrivalTime,
      'location_id': locationId,
      'ride_id': rideId,
      'rideService': rideService.toMap(),
      'rideservice_id': rideserviceId,
      'route': route.toMap(),
    };
  }

  String toJson() => json.encode(toMap());
}

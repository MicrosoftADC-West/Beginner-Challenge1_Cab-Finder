// To parse this JSON data, do
//
//     final route = routeFromJson(jsonString);

import 'dart:convert';

import 'package:equatable/equatable.dart';

class Route extends Equatable {
  const Route({
    required this.destinationCoordLat,
    required this.destinationCoordLong,
    required this.locationDescription,
    required this.locationId,
    required this.startCoordLat,
    required this.startCoordLong,
  });

  factory Route.fromJson(String source) => Route.fromMap(json.decode(source));

  factory Route.fromMap(Map<dynamic, dynamic> map) {
    return Route(
      destinationCoordLat: map["destination_coord_lat"]?.toDouble() ?? 0.0,
      destinationCoordLong: map['destination_coord_long']?.toDouble() ?? 0.0,
      locationDescription: map['location_description'] ?? '',
      locationId: map['location_id']?.toInt() ?? 0,
      startCoordLat: map['start_coord_lat']?.toDouble() ?? 0.0,
      startCoordLong: map['start_coord_long']?.toDouble() ?? 0.0,
    );
  }

  final double destinationCoordLat;
  final double destinationCoordLong;
  final String locationDescription;
  final int locationId;
  final double startCoordLat;
  final double startCoordLong;

  @override
  List<Object> get props {
    return [
      destinationCoordLat,
      destinationCoordLong,
      locationDescription,
      locationId,
      startCoordLat,
      startCoordLong,
    ];
  }

  @override
  String toString() {
    return 'Route(destinationCoordLat: $destinationCoordLat, destinationCoordLong: $destinationCoordLong, locationDescription: $locationDescription, locationId: $locationId, startCoordLat: $startCoordLat, startCoordLong: $startCoordLong)';
  }

  Route copyWith({
    double? destinationCoordLat,
    double? destinationCoordLong,
    String? locationDescription,
    int? locationId,
    double? startCoordLat,
    double? startCoordLong,
  }) {
    return Route(
      destinationCoordLat: destinationCoordLat ?? this.destinationCoordLat,
      destinationCoordLong: destinationCoordLong ?? this.destinationCoordLong,
      locationDescription: locationDescription ?? this.locationDescription,
      locationId: locationId ?? this.locationId,
      startCoordLat: startCoordLat ?? this.startCoordLat,
      startCoordLong: startCoordLong ?? this.startCoordLong,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'destination_coord_lat': destinationCoordLat,
      'destination_coord_long': destinationCoordLong,
      'location_description': locationDescription,
      'location_id': locationId,
      'start_coord_lat': startCoordLat,
      'start_coord_long': startCoordLong,
    };
  }

  String toJson() => json.encode(toMap());
}

// To parse this JSON data, do
//
//     final rideService = rideServiceFromJson(jsonString);

import 'dart:convert';

import 'package:equatable/equatable.dart';

class RideService extends Equatable {
  const RideService({
    required this.priceperkm,
    required this.rideserviceId,
    required this.rideserviceName,
  });

  factory RideService.fromJson(String source) =>
      RideService.fromMap(json.decode(source));

  factory RideService.fromMap(Map<String, dynamic> map) {
    return RideService(
      priceperkm: map['priceperkm']?.toInt() ?? 0,
      rideserviceId: map['rideservice_id']?.toInt() ?? 0,
      rideserviceName: map['rideservice_name'] ?? '',
    );
  }

  final int priceperkm;
  final int rideserviceId;
  final String rideserviceName;

  @override
  List<Object> get props => [priceperkm, rideserviceId, rideserviceName];

  @override
  String toString() =>
      'RideService(priceperkm: $priceperkm, rideserviceId: $rideserviceId, rideserviceName: $rideserviceName)';

  RideService copyWith({
    int? priceperkm,
    int? rideserviceId,
    String? rideserviceName,
  }) {
    return RideService(
      priceperkm: priceperkm ?? this.priceperkm,
      rideserviceId: rideserviceId ?? this.rideserviceId,
      rideserviceName: rideserviceName ?? this.rideserviceName,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'priceperkm': priceperkm,
      'rideservice_id': rideserviceId,
      'rideservice_name': rideserviceName,
    };
  }

  String toJson() => json.encode(toMap());
}

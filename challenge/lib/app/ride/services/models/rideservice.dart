// To parse this JSON data, do
//
//     final rideService = rideServiceFromJson(jsonString);

import 'dart:convert';

class RideService {
  RideService({
    required this.rideserviceId,
    required this.rideserviceName,
    required this.priceperkm,
  });

  factory RideService.fromJson(Map<String, dynamic> json) => RideService(
        rideserviceId: json["rideservice_id"],
        rideserviceName: json["rideservice_name"],
        priceperkm: json["priceperkm"],
      );

  factory RideService.fromRawJson(String str) =>
      RideService.fromJson(json.decode(str));

  final int priceperkm;
  final int rideserviceId;
  final String rideserviceName;

  String toRawJson() => json.encode(toJson());

  Map<String, dynamic> toJson() => {
        "rideservice_id": rideserviceId,
        "rideservice_name": rideserviceName,
        "priceperkm": priceperkm,
      };
}

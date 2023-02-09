import 'dart:math';

import 'package:vector_math/vector_math.dart';

import '../app/ride/data/models/latlong.dart';

class Havernsine {
  static double distance(LatLong coord1, LatLong coord2) {
    const earthRadius = 6371.0; // in kilometers
    final dlat = (coord2.latitude - coord1.latitude);
    final dlon = radians(coord2.longitude - coord1.longitude);
    final a = pow(sin(dlat / 2), 2) +
        cos(radians(coord1.latitude)) *
            cos(radians(coord2.latitude)) *
            pow(sin(dlon / 2), 2);
    final c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return earthRadius * c;
  }
}

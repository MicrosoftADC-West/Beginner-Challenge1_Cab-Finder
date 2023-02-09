import 'dart:math';

import 'package:vector_math/vector_math.dart';

class Havernsine {
  static double distance(double lat1, double lon1, double lat2, double lon2) {
    const earthRadius = 6371.0; // in kilometers
    final dlat = (lat2 - lat1);
    final dlon = radians(lon2 - lon1);
    final a = pow(sin(dlat / 2), 2) +
        cos(radians(lat1)) * cos(radians(lat2)) * pow(sin(dlon / 2), 2);
    final c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return earthRadius * c;
  }
}

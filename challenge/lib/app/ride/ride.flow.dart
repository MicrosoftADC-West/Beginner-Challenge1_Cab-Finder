import 'dart:async';

import 'package:flutter/cupertino.dart';

import '../../util/alert.util.dart';
import '../../util/log.util.dart';
import 'data/models/latlong.dart';
import 'data/models/ride.dart';
import 'data/repositories/rides.dart';
import 'services/services.dart';

RegExp coordsExp = RegExp(
    r"[0-9]([0-9])*(\.|)[0-9]([0-9])*,( *)[0-9]([0-9])*(\.|)[0-9]([0-9])*");

class RideFlow {
  late double eLat;
  late double eLong;
  final TextEditingController endCoordsController = TextEditingController();
  final StreamController<bool> loadingStream =
      StreamController<bool>.broadcast();

  late double sLat;
  late double sLong;
  final TextEditingController startCoordsController = TextEditingController();

  late List<Ride> rides;

  void nextFromCoords(BuildContext context) {
    if (!coordsExp.hasMatch(startCoords) || !coordsExp.hasMatch(endCoords)) {
      AlertUtil.showError("Invalid coordinates");
      LogUtil.logError("Ride Flow", message: "Regex mismatch");
      return;
    }

    loadingStream.add(true);

    RidesRepository.getRides(
      startLocation: LatLong.parse(startCoords),
      endLocation: LatLong.parse(endCoords),
      onError: (error) {
        AlertUtil.showError(error);
      },
    ).then((value) {
      loadingStream.add(false);

      if (value == null) return;

      rides = value;
      _goToRideServices(context);
    });
  }

  String get startCoords => startCoordsController.text.trim();

  String get endCoords => endCoordsController.text.trim();

  void _goToRideServices(BuildContext context) {
    Navigator.of(context).push(CupertinoPageRoute(
      builder: (context) => ServiceSelectionPage(flow: this),
    ));
  }
}

import 'package:challenge/app/ride/services/services.dart';
import 'package:flutter/cupertino.dart';

RegExp coordsExp = RegExp(
    r"[0-9]([0-9])*(\.|)[0-9]([0-9])*,( *)[0-9]([0-9])*(\.|)[0-9]([0-9])*");

class RideFlow {
  late double eLat;
  late double eLong;
  final TextEditingController endCoordsController = TextEditingController();
  late double sLat;
  late double sLong;
  final TextEditingController startCoordsController = TextEditingController();

  void nextFromCoords(BuildContext context) {
    if (!coordsExp.hasMatch(startCoords) || !coordsExp.hasMatch(endCoords)) {
      return;
    }

    final List<double> startCoordsFloat = startCoords
        .split(",")
        .map((e) => e.trim())
        .map((e) => double.parse(e))
        .toList();
    sLat = startCoordsFloat[0];
    sLong = startCoordsFloat[1];

    final List<double> endCoordsFloat = endCoords
        .split(",")
        .map((e) => e.trim())
        .map((e) => double.parse(e))
        .toList();
    eLat = endCoordsFloat[0];
    eLong = endCoordsFloat[1];

    _goToRideServices(context);
  }

  String get startCoords => startCoordsController.text.trim();

  String get endCoords => endCoordsController.text.trim();

  void _goToRideServices(BuildContext context) {
    Navigator.of(context).push(CupertinoPageRoute(
      builder: (context) => ServiceSelectionPage(flow: this),
    ));
  }
}

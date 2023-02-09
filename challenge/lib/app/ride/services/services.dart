import 'package:flutter/material.dart';

import '../../../util/hervensine.util.dart';
import '../../components/app_bar.dart';
import '../data/models/latlong.dart';
import '../ride.flow.dart';

class ServiceSelectionPage extends StatelessWidget {
  const ServiceSelectionPage({super.key, required this.flow});

  final RideFlow flow;

  @override
  Widget build(BuildContext context) {
    final distance = Havernsine.distance(
        LatLong.parse(flow.startCoords), LatLong.parse(flow.endCoords));
    final leastPrice = flow.rides
      ..sort(
        (a, b) => a.rideService.priceperkm.compareTo(b.rideService.priceperkm),
      );
    final leastTime = flow.rides
      ..sort(
        (a, b) => int.parse(a.estimatedArrivalTime.split(" ")[1].splitMapJoin(
                  ":",
                  onMatch: (p0) => "",
                  onNonMatch: (p0) => p0,
                ))
            .compareTo(
                int.parse(b.estimatedArrivalTime.split(" ")[1].splitMapJoin(
                      ":",
                      onMatch: (p0) => "",
                      onNonMatch: (p0) => p0,
                    ))),
      );
    final mostUsed = flow.rides
      ..sort((a, b) => flow.rides
          .where((element) => element.rideserviceId == a.rideserviceId)
          .length
          .compareTo(flow.rides
              .where((element) => element.rideserviceId == b.rideserviceId)
              .length));

    flow.rides.sort(
        (a, b) => a.rideService.priceperkm.compareTo(b.rideService.priceperkm));

    return Scaffold(
      appBar: AppAppBar(),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: Column(
              children: [
                const SizedBox(height: 24 + 24),
                Text(
                  "Your ride is ${distance.round()} kilometers long.",
                  style: const TextStyle(
                    color: Colors.purple,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 24),
                Table(
                  children: flow.rides
                      .map((e) => TableRow(
                            children: [
                              Text(e.rideService.rideserviceName),
                              Text(e.rideserviceId ==
                                      leastPrice.first.rideserviceId
                                  ? "Best Price ✨"
                                  : e.estimatedArrivalTime ==
                                          leastTime.first.estimatedArrivalTime
                                      ? "Fastest ⚡"
                                      : e.rideserviceId ==
                                              mostUsed.last.rideserviceId
                                          ? "Hot 🔥"
                                          : ""),
                              Text(
                                (distance * e.rideService.priceperkm)
                                    .round()
                                    .toString(),
                              ),
                              Text(e.estimatedArrivalTime),
                            ],
                          ))
                      .toList(),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

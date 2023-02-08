import 'package:flutter/material.dart';

import '../../components/app_bar.dart';
import '../ride.flow.dart';

class ServiceSelectionPage extends StatelessWidget {
  const ServiceSelectionPage({super.key, required this.flow});

  final RideFlow flow;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppAppBar(),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: const Placeholder(),
          ),
        ),
      ),
    );
  }
}

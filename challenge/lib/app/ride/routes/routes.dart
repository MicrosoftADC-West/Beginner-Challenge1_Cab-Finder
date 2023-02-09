import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../components/app_bar.dart';
import '../ride.flow.dart';
import 'components/coordinate_input.dart';

class RouteSelection extends StatelessWidget {
  const RouteSelection({super.key, required this.flow});

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
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                CoordinateInputForm(flow: flow),
                const SizedBox(height: 24 + 24),
                StreamBuilder<bool>(
                  stream: flow.loadingStream.stream,
                  builder: (context, snapshot) {
                    final loading = snapshot.data ?? false;
                    return ElevatedButton(
                      onPressed: () => flow.nextFromCoords(context),
                      child: loading
                          ? const CupertinoActivityIndicator(
                              color: Colors.white,
                            )
                          : const Text("Next"),
                    );
                  },
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () => flow.automate(context),
                  child: const Text("Automate Test"),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

import '../../../components/app_bar.dart';
import '../flow.dart';

class CoordinatesInputForm extends StatefulWidget {
  const CoordinatesInputForm({super.key, required this.flow});

  final RideInputFlow flow;

  @override
  State<CoordinatesInputForm> createState() => _CoordinatesInputFormState();
}

class _CoordinatesInputFormState extends State<CoordinatesInputForm> {
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
                const Text(
                  "Enter your ride details.",
                  style: TextStyle(fontSize: 24),
                ),
                const SizedBox(
                  height: 36,
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: const [
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            label: Text("Origin Latitude"),
                          ),
                        ),
                      ),
                      SizedBox(
                        width: 16,
                      ),
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            label: Text("Origin Longitude"),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: const [
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            label: Text("Destination Latitude"),
                          ),
                        ),
                      ),
                      SizedBox(
                        width: 16,
                      ),
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            label: Text("Destination Longitude"),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
                const SizedBox(
                  height: 36,
                ),
                ElevatedButton(
                  onPressed: () {},
                  child: const Text("Next"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

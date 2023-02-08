import 'package:flutter/material.dart';

import 'app/ride/input/coords/coords.dart';
import 'app/ride/input/flow.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Microsoft ADC Challenge',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.purple,
      ),
      home: CoordinatesInputForm(flow: RideInputFlow()),
    );
  }
}

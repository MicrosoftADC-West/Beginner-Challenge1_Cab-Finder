import 'package:dotted_border/dotted_border.dart';
import 'package:flutter/material.dart';

import '../../ride.flow.dart';

class CoordinateInputForm extends StatelessWidget {
  const CoordinateInputForm({
    super.key,
    required this.flow,
  });

  final RideFlow flow;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 64 + 35 + 37 + 24,
      width: 500,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 27.0, vertical: 60),
              child: DottedBorder(
                padding: EdgeInsets.zero,
                borderType: BorderType.Rect,
                strokeWidth: 4,
                dashPattern: const [4, 8],
                color: Colors.purpleAccent,
                child: const SizedBox(
                  height: 100,
                  width: 0,
                ),
              ),
            ),
          ),
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const SizedBox(width: 9),
                  const Icon(
                    Icons.location_pin,
                    color: Colors.purple,
                    size: 36,
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: TextField(
                      controller: flow.startCoordsController,
                      textAlign: TextAlign.center,
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(100),
                        ),
                        hintText:
                            "Enter your start coordinates. Eg. 123.08, 234.09",
                      ),
                    ),
                  ),
                  const SizedBox(width: 60),
                ],
              ),
              const SizedBox(height: 24 + 24),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const SizedBox(width: 9),
                  const Icon(
                    Icons.my_location_rounded,
                    color: Colors.purple,
                    size: 36,
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: TextField(
                      controller: flow.endCoordsController,
                      textAlign: TextAlign.center,
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(100),
                        ),
                        hintText:
                            "Enter your destination coordinates. Eg. 13.08, 23.0",
                      ),
                    ),
                  ),
                  const SizedBox(width: 60),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}

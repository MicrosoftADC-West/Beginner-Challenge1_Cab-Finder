import 'dart:ui';

import 'package:flutter/material.dart';

class InAppNotificationWidget extends StatelessWidget {
  const InAppNotificationWidget({
    Key? key,
    required this.child,
  }) : super(key: key);

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Container(
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color: const Color(0xffEAF2F6).withOpacity(.6),
          borderRadius: BorderRadius.circular(8),
        ),
        foregroundDecoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: const Color(0xff083652).withOpacity(.1),
            width: 1,
          ),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 4, sigmaY: 4),
          child: child,
        ),
      ),
    );
  }
}

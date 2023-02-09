import 'package:flutter/material.dart';

import 'components/alert_view.dart';

class AlertWrapper extends StatelessWidget {
  const AlertWrapper({Key? key, required this.app}) : super(key: key);

  final Widget app;

  @override
  Widget build(BuildContext context) {
    final windowPadding = WidgetsBinding.instance.window.viewInsets;
    final devicePixelRatio = WidgetsBinding.instance.window.devicePixelRatio;
    final physicalSize = WidgetsBinding.instance.window.physicalSize;
    final viewPadding = WidgetsBinding.instance.window.viewPadding;

    return MediaQuery(
      data: MediaQueryData(
        devicePixelRatio: devicePixelRatio,
        size: physicalSize,
        textScaleFactor: WidgetsBinding.instance.window.textScaleFactor,
        viewInsets: EdgeInsets.fromWindowPadding(
          windowPadding,
          devicePixelRatio,
        ),
        padding: EdgeInsets.fromWindowPadding(
          viewPadding,
          devicePixelRatio,
        ),
        viewPadding: EdgeInsets.fromWindowPadding(
          viewPadding,
          devicePixelRatio,
        ),
      ),
      child: Material(
        child: Directionality(
          textDirection: TextDirection.ltr,
          child: Stack(
            children: [
              app,
              Align(
                alignment: Alignment.topRight,
                child: Padding(
                  padding: EdgeInsets.only(top: AppBar().preferredSize.height),
                  child: const StateFulAlertView(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

import '../app/alert/models/inapp_alert.dart';
import '../app/alert/components/alert.dart';

class AlertUtil {
  static List<Alert> alertList = [];
  static GlobalKey<AnimatedListState> alertListKey =
      GlobalKey<AnimatedListState>();

  static showSuccess(String text, [Duration? duration]) => _addAlert(
        text: text,
        type: AlertType.success,
        duration: duration,
      );

  static showWarning(String text, [Duration? duration]) => _addAlert(
        text: text,
        type: AlertType.warning,
        duration: duration,
      );

  static showError(String text, [Duration? duration]) => _addAlert(
        text: text,
        type: AlertType.error,
        duration: duration,
      );

  // static showNotification(
  //   InAppNotification notification,
  //   BuildContext context,
  // ) {
  //   alertList.insert(
  //     0,
  //     Alert(
  //       alertWidget: InAppNotificationWidget(
  //         child: notification.buildWidget(context),
  //       ),
  //       action: () => notification.action(context),
  //       duration: InAppAlert.kDialogueDuration,
  //     ),
  //   );
  //   alertListKey.currentState?.insertItem(0);
  // }

  static removeAlert(int index, Widget item) {
    alertList.removeAt(index);
    alertListKey.currentState?.removeItem(
      index, (context, animation) => const SizedBox.shrink(),
      // (context, animation) => SlideTransition(
      //   position: animation.drive(Tween(
      //     begin: const Offset(0.0, 0.0),
      //     end: const Offset(2.0, 0.0),
      //   ).chain(CurveTween(curve: Curves.linear))),
      //   child: item,
      // ),
    );
  }

  // static init(BuildContext context) {
  //   NotificationService.notificationStream
  //       .listen((event) => showNotification(event, context));
  // }

  static _addAlert({
    required String text,
    required AlertType type,
    Duration? duration,
  }) async {
    alertList.insert(
      0,
      Alert(
        alertWidget: InAppAlertWidget(
          text: text,
          alertType: type,
        ),
        action: () {},
        duration: duration ?? InAppAlert.kDialogueDuration,
      ),
    );
    alertListKey.currentState?.insertItem(0);
  }
}

class Alert {
  Alert({
    required this.alertWidget,
    required this.action,
    required this.duration,
  });

  final VoidCallback action;
  final Widget alertWidget;
  final Duration duration;
}

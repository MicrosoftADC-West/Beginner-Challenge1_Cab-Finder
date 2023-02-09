import 'package:flutter/material.dart';

class InAppAlert {
  // static String iconUrl(AlertType alertType) => alertType == AlertType.success
  //     ? 'assets/svg/checkmark-circle.svg'
  //     : alertType == AlertType.warning
  //         ? 'assets/svg/alert-triangle.svg'
  //         : 'assets/svg/close-circle.svg';

  static Color backgroundColor(AlertType alertType) =>
      alertType == AlertType.success
          ? const Color(0xffE6FFE8)
          : alertType == AlertType.warning
              ? const Color(0xffFFFAE2)
              : const Color(0xffFFF4EE);

  static double get kBarHeight => 64;

  static Duration get kDialogueDuration => const Duration(seconds: 5);

  static Color get kCloseIconColor => const Color(0xff0D1C2E);

  static TextStyle get kTextStyle => const TextStyle(
        color: Color(0xff2c2929),
        fontWeight: FontWeight.w500,
        fontSize: 14,
        height: 22 / 14,
      );
}

enum AlertType {
  success,
  warning,
  error,
}

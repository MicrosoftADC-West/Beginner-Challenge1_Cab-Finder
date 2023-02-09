import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';

class ScreenUtil {
  static Size screenSize(BuildContext context) => MediaQuery.of(context).size;

  static double screenHeight(BuildContext context) =>
      screenSize(context).height;

  static double screenWidth(BuildContext context) => screenSize(context).width;

  static EdgeInsets screenViewPadding(BuildContext context) =>
      MediaQuery.of(context).viewPadding;

  static void showLoadingView(BuildContext context, String message) {
    showDialog(
        context: context,
        barrierDismissible: true,
        builder: (context) {
          return AlertDialog(
            title: Text(message, textAlign: TextAlign.center),
            content: const SizedBox(
                height: 80,
                child: Center(
                    child: SizedBox(
                  height: 30,
                  width: 30,
                  child: CircularProgressIndicator(),
                ))),
          );
        });
  }

  static void hideLoadingView(BuildContext context) {
    Navigator.pop(context);
  }

  static void showComingSoonToast() {
    showToast("Coming soon");
  }

  static void showToast(String message) {
    Fluttertoast.showToast(
        msg: message,
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.black87,
        textColor: Colors.white,
        fontSize: 16.0);
  }

  static void showSuccessDialog(
      BuildContext context, String message, VoidCallback buttonClicked) {
    HapticFeedback.mediumImpact();
    showDialog(
        context: context,
        barrierDismissible: false,
        builder: (context) {
          return AlertDialog(
            title:
                const Text("Request Successful", textAlign: TextAlign.center),
            content: SizedBox(
              height: 150,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    height: 100,
                    child:
                        Center(child: Text(message, textAlign: TextAlign.left)),
                  ),
                  TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                        buttonClicked();
                      },
                      child: const Text("Dismiss"))
                ],
              ),
            ),
          );
        });
  }

  static void showErrorDialog(
    BuildContext context,
    String message, {
    VoidCallback? buttonClicked,
  }) {
    HapticFeedback.mediumImpact();
    showDialog(
        context: context,
        barrierDismissible: true,
        builder: (context) {
          return AlertDialog(
            title: const Text("Request Failed", textAlign: TextAlign.center),
            content: SizedBox(
              height: 150,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    height: 100,
                    child: Center(
                        child: Text(
                      message,
                      textAlign: TextAlign.left,
                      style: const TextStyle(fontSize: 14),
                    )),
                  ),
                  TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text("Dismiss"))
                ],
              ),
            ),
          );
        });
  }
}

import 'dart:convert';
import 'dart:developer' as developer;

import 'package:flutter/foundation.dart' as Foundation;
import 'package:flutter/foundation.dart';
import 'package:logging/logging.dart';

class LogUtil {
  static log(
    String tag, {
    required String message,
    Object? content,
  }) {
    if (!Foundation.kReleaseMode) {
      String jsonEncodedContent;
      try {
        jsonEncodedContent = jsonEncode(content);
      } catch (error) {
        jsonEncodedContent = jsonEncode(content?.toString());
      }

      final log = Logger(tag);
      log.info(message, jsonEncodedContent);
    }
  }

  static devLog(
    String tag, {
    required String message,
    Object? content,
  }) {
    if (!Foundation.kReleaseMode) {
      // String jsonEncodedContent;
      // try {
      //   jsonEncodedContent = jsonEncode(content);
      // } catch (error) {
      //   jsonEncodedContent = jsonEncode(content?.toString());
      // }

      developer.log(
        (message.isEmpty ? tag : message),
        name: tag,
        error: content,
      );
    }
  }

  static logWarning(
    String tag, {
    required String message,
    Object? content,
  }) {
    if (!Foundation.kReleaseMode) {
      String jsonEncodedContent;
      try {
        jsonEncodedContent = jsonEncode(content);
      } catch (error) {
        jsonEncodedContent = jsonEncode(content?.toString());
      }

      final log = Logger(tag);
      log.warning(message, jsonEncodedContent);
    }
  }

  static logError(
    String tag, {
    required String message,
    Object? content,
  }) {
    if (!Foundation.kReleaseMode) {
      String jsonEncodedContent;
      try {
        jsonEncodedContent = jsonEncode(content);
      } catch (error) {
        jsonEncodedContent = jsonEncode(content?.toString());
      }

      final log = Logger(tag);
      log.severe(message, jsonEncodedContent);
    }
  }

  static init() {
    if (kReleaseMode) {
      // Don't log anything below warnings in production.
      Logger.root.level = Level.WARNING;
    }
    Logger.root.onRecord.listen((record) {
      // final logFileName =
      //     'logs/${record.time.hour}-${record.time.minute}-${record.time.day}-${record.time.month}-${record.time.year}.log';
      final logString = '${record.level.name.padRight(7)} : ${record.time} : '
          '${record.loggerName} : '
          '${record.message}';
      debugPrint(logString);
      // File(logFileName).writeAsStringSync(logString, mode: FileMode.append);
    });
  }
}

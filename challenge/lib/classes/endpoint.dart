import 'dart:async';

import 'package:dio/dio.dart';

import '../../util/log.util.dart';

abstract class Endpoint {
  Endpoint(this.method, String url, [this.validStatusCode]) : _url = url;

  static BaseOptions options = BaseOptions(
    connectTimeout: 30000,
    contentType: 'application/json; charset=utf-8',
  );

  final Dio dio = Dio(options);
  final String method;
  final int? validStatusCode;

  final String _url;

  String get url => domainUrl + _url;

  String get domainUrl;

  FutureOr<T?> hit<T>(
    String token, {
    Map<String, dynamic>? queryParameters,
    FormData? data,
    Map<String, dynamic>? headers,
    T Function(dynamic responseBody)? map,
    Function(String)? onError,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
    bool isMultipart = false,
  }) async {
    LogUtil.devLog("$method $_url", message: '➡️ $method $url');

    T? result;

    if (!await _checkConnection()) {
      LogUtil.devLog("$method $_url",
          message: 'Unable to connect to the internet');
      LogUtil.devLog("$method $_url",
          message:
              '⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️');
      onError?.call('Please check your connection and try again!');
      return null;
    }

    final dataMap = <String, dynamic>{}..addEntries(data?.fields ?? []);
    final filesMap = <String, MultipartFile>{}..addEntries(data?.files ?? []);

    LogUtil.devLog("$method $_url", message: 'TOKEN: $token');
    LogUtil.devLog("$method $_url", message: 'HEADERS: $headers');
    LogUtil.devLog("$method $_url",
        message: 'QUERY PARAMETERS: $queryParameters');
    LogUtil.devLog("$method $_url", message: 'DATA: $dataMap');
    LogUtil.devLog(
      "$method $_url",
      message:
          'Files: ${filesMap.map((key, value) => MapEntry(key, value.filename))}',
    );

    try {
      final Response response = await dio.request(
        url,
        data: isMultipart ? data : dataMap,
        queryParameters: queryParameters,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
        options: Options(
          method: method,
          receiveTimeout: 30000,
          followRedirects: false,
          responseType: ResponseType.json,
          headers: {
            "Authorization": 'Bearer $token',
            "content-type": 'application/json; charset=utf-8'
          }..addAll(headers ?? {}),
          validateStatus: (status) {
            return (status ?? 999) == (validStatusCode ?? 200);
          },
        ),
      );
      LogUtil.devLog("$method $_url", message: 'SUCCESS: $method $url');
      try {
        result = map?.call(response.data);
        LogUtil.devLog("$method $_url",
            message: 'RAW DATA: \n${response.data}');
        LogUtil.devLog("$method $_url", message: 'MAPPED DATA: \n$result');
        LogUtil.devLog("$method $_url",
            message:
                '✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️');
      } catch (e) {
        LogUtil.devLog("$method $_url", message: "EXCEPTION: $e");
        LogUtil.devLog(
          "$method $_url",
          message: 'RESPONSE DATA: \n${response.data}',
        );
        throw MappingException();
      }
    } on DioError catch (e) {
      _logError(e);
      try {
        final errorMessage =
            e.response?.data['message'] ?? 'An unknown error occoured';
        onError?.call(errorMessage);
      } catch (er) {
        onError?.call('An unknown error occoured');
      }
      LogUtil.devLog("$method $_url",
          message: '❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌');
    } on MappingException {
      LogUtil.devLog("$method $_url",
          message: 'An error occoured while mapping response to $T');
      onError?.call('An error occoured while mapping response to $T');
      LogUtil.devLog("$method $_url",
          message: '❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌');
    } catch (e) {
      LogUtil.devLog("$method $_url", message: e.toString());
      onError?.call(e.toString());
      LogUtil.devLog("$method $_url",
          message: '❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌');
    }
    return result;
  }

  void _logError(DioError e) {
    if (e.response != null) {
      LogUtil.devLog("$method $_url",
          message: '⚠️ ${e.requestOptions.method} ${e.requestOptions.path}');
      LogUtil.devLog("$method $_url",
          message:
              'REQUEST QUERY PARAMETERS: \n${e.requestOptions.queryParameters}');
      LogUtil.devLog("$method $_url",
          message: 'REQUEST DATA: \n${e.requestOptions.data}');
      LogUtil.devLog("$method $_url",
          message: 'REQUEST HEADERS: \n${e.requestOptions.headers}');
      LogUtil.devLog("$method $_url",
          message: 'RESPONSE STATUS: \n${e.response?.statusCode}');
      LogUtil.devLog("$method $_url",
          message: 'RESOPNSE DATA: \n${e.response?.data}');
      LogUtil.devLog("$method $_url",
          message: 'RESPONSE HEADERS: \n${e.response?.headers}');
    } else {
      LogUtil.devLog("$method $_url", message: 'Error sending request!');
      LogUtil.devLog("$method $_url", message: e.message, content: e);
    }
  }

  Future<bool> _checkConnection() async {
    final Dio dio = Dio();
    const endpoint =
        'https://sandbox.api.service.nhs.uk/hello-world/hello/world';
    try {
      Response response = await dio.get(endpoint);
      return response.statusCode == 200;
    } on Exception {
      return false;
    }
  }
}

class MappingException implements Exception {}

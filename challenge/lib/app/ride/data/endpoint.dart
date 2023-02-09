import '../../../classes/endpoint.dart';
import '../../../globals/app_values.dart';

class ChallengeEndpoint extends Endpoint {
  ChallengeEndpoint(super.method, super.url, [super.validStatusCode]);

  @override
  String get domainUrl => AppValues.serverUrl;
}

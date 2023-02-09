class LatLong {
  LatLong(this.latitude, this.longitude);

  final double latitude;
  final double longitude;

  factory LatLong.parse(String coordinates) {
    final c = coordinates
        .split(RegExp(r",( *)"))
        .map((e) => double.tryParse(e.trim()) ?? 0)
        .toList();

    return LatLong(c[0], c[1]);
  }

  @override
  String toString() {
    return "$latitude, $longitude";
  }
}

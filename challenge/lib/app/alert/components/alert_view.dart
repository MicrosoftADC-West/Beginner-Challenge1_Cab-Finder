import 'package:flutter/material.dart';

import '../../../util/alert.util.dart';
import '../../../util/screen.util.dart';

class StateFulAlertView extends StatelessWidget {
  const StateFulAlertView({Key? key}) : super(key: key);

  Widget _buildListItem(Alert item, int listIndex) {
    return Dismissible(
      key: ObjectKey(item.hashCode),
      direction: DismissDirection.startToEnd,
      child: GestureDetector(
        onTap: item.action,
        child: item.alertWidget,
      ),
      onDismissed: (direction) {
        _onDeleteList(item, listIndex);
      },
    );
  }

  void _onDeleteList(Alert item, int listIndex) {
    if (AlertUtil.alertList.contains(item)) {
      AlertUtil.removeAlert(
        AlertUtil.alertList.indexOf(item),
        item.alertWidget,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 500),
      child: AnimatedList(
        shrinkWrap: true,
        physics: const BouncingScrollPhysics(),
        key: AlertUtil.alertListKey,
        padding: EdgeInsets.only(
          left: 16,
          right: 16,
          top: ScreenUtil.screenViewPadding(context).top + 16,
        ),
        itemBuilder: (_, index, animation) {
          final Alert item = AlertUtil.alertList[index];
          Future.delayed(item.duration, () {
            if (AlertUtil.alertList.contains(item)) {
              AlertUtil.removeAlert(
                AlertUtil.alertList.indexOf(item),
                item.alertWidget,
              );
            }
          });
          return SlideTransition(
            position: animation.drive(Tween(
              begin: const Offset(2, 0.0),
              end: const Offset(0.0, 0.0),
            ).chain(CurveTween(curve: Curves.linear))),
            child: _buildListItem(AlertUtil.alertList[index], index),
          );
        },
      ),
    );
  }
}

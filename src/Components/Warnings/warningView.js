import {observer} from 'mobx-react';
import {Text, View} from 'react-native';
import React from 'react';

import {style} from '../../styles/warningViewStyle'
import {ERROR_TEMPLATE} from '../../ModuleRepositories/constants';
import NotificationStore from '../../ModuleRepositories/local/store/notificationStore';

export const Warning = observer(() => {
  const notification = NotificationStore.getNotification;
  return notification != null ? 
  (
    <View
      style={[
        style.errorContainer,
        notification.isError ? style.errorColor : style.notificationColor,
      ]}>
      <Text style={ style.errorTitle }>
        {notification.isError ? 'ОШИБКА' : 'УСПЕШНО'}
      </Text>
      <Text style={ style.errorText }>
        {notification.isError ? ERROR_TEMPLATE : 'Через пару секунд вы будете перенаправлены'}
      </Text>
      <Text style={ style.errorText }> {notification.text.toString()} </Text>
    </View>
  ) : null;
});



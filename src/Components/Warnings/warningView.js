import {observer} from 'mobx-react';
import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

import {ERROR_TEMPLATE} from '../../constants';
import NotificationStore from './notificationStore';

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
        {notification.isError ? ERROR_TEMPLATE : 'Сейчас вас перенаправит на другую страницу'}
      </Text>
      <Text style={ style.errorText }> {notification.text.toString()} </Text>
    </View>
  ) : null;
});

const style = StyleSheet.create({
  errorContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    height: 'auto',
    width: '100%',
  },
  errorColor: {
    backgroundColor: '#ffcece',
  },
  notificationColor: {
    backgroundColor: '#ecffda',
  },
  errorTitle: {
    color: '#212121',
    fontSize: 18,
  },
  errorText: {
    color: '#212121',
    fontSize: 15,
    textAlign: 'center',
  },
});

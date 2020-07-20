import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
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
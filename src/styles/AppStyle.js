import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    Title: {
      paddingTop: Platform.OS === 'android' ? 20 : 50,
      backgroundColor: '#f8eddc',
      flexDirection: 'row',
      flex: 0.08,
    },
    textTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 25,
      height: 'auto',
      flex: 1,
    },
  });
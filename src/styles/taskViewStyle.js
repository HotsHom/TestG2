import {StyleSheet} from 'react-native';
import React from 'react';

export const style = StyleSheet.create({
    container: {
      width: '80%',
      height: '100%',
      padding: 10,
      flex: 1,
      alignSelf: 'center',
      borderRadius: 10,
    },
    title: {
      fontSize: 16,
      marginBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
    },
    backgroundDone: {
      backgroundColor: '#eea',
    },
    backgroundUnDone: {
      backgroundColor: '#eaeaea',
    },
    con : {
      width : "100%",
      height: 'auto',
      marginVertical: 10,
      marginHorizontal: 0,
      flex: 1,
      alignSelf: 'center',
    },
    r : {
      position: 'absolute',
      top: '40%',
      color: '#fff',
      marginLeft: '12%'
    },
    l : {
      position: 'absolute',
      color: '#fff',
      top: '40%',
      right: 0,
      marginRight: '6%'
    }
  });
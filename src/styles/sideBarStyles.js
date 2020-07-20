import React from 'react';
import {StyleSheet} from 'react-native'

export const style = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: '#f8eddc',
  },
  headerInfo: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: 'auto',
    borderBottomColor: '#bbbaba',
    borderBottomWidth: 1,
    marginRight: 40,
  },
  textTitle: {
    fontSize: 20,
    color: '#010c24',
    fontWeight: 'bold',
  },
  menuItem: {
    fontSize: 15,
    margin: 0,
  },
  menuItemLogOut: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  menuItemLogOutLable: {
    fontSize: 18,
  },
});
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {observer} from 'mobx-react';
import 'mobx-react-lite/batchingForReactNative';

import UserStore from '../AuthScreen/userStore';
import { goToHome, goToHomeWithoutToken, goToAuth, goToRegister } from './navigationService';

const Sidebar = props => {
  return (
    <View style={style.mainContainer}>
      <DrawerContentScrollView {...props} style={{flex: 1}}>

        <View style={style.headerInfo}>
          <Text style={style.textTitle}>
            Привет
            {UserStore.isAuth
              ? `, ${UserStore.userData.email.split('@')[0]}`
              : ''}
            !
          </Text>
        </View>

        {UserStore.isAuth ?
        (
          <View>
            <DrawerItem
              labelStyle={style.menuItem}
              label="| Home"
              onPress= {goToHome}
            />
          </View>
        ) 
        :
        (
          <View>
            <DrawerItem
              labelStyle={style.menuItem}
              label="| Home"
              onPress={ goToHomeWithoutToken }
            />
            <DrawerItem
              labelStyle={style.menuItem}
              label="| Auth"
              onPress={ goToAuth }
            />
            <DrawerItem
              labelStyle={style.menuItem}
              label="| Registration"
              onPress={ goToRegister }
            />
          </View>
        )}
      </DrawerContentScrollView>
      {UserStore.isAuth ? (
        <DrawerItem
          style={style.menuItemLogOut}
          labelStyle={style.menuItemLogOutLable}
          label="| LOGOUT"
          onPress={ UserStore.logoutUser }
        />
      ) : null}
    </View>
  );
};

export default observer(Sidebar);

//СТИЛИ
const style = StyleSheet.create({
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
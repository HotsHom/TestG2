import React from 'react';
import {Text, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {observer} from 'mobx-react';
import 'mobx-react-lite/batchingForReactNative';

import {style} from '../../styles/sideBarStyles';
import UserStore from '../../ModuleRepositories/local/store/userStore';

const Sidebar = props => {
  return (
    <View style={style.mainContainer}>
      <DrawerContentScrollView {...props} style={{flex: 1}}>

        <View style={style.headerInfo}>
          <Text style={style.textTitle}>
            Привет
            {UserStore.isFlagAuth.Flag
              ? `, ${UserStore.userData.email.split('@')[0]}`
              : ''}
            !
          </Text>
        </View>
        
        {UserStore.isFlagAuth.Flag ? 
        (
          <View>
            <DrawerItem
              labelStyle={style.menuItem}
              label="| Home"
              onPress={() => {
                props.navigation.jumpTo('Tasks');
              }}
            />
          </View>
        ) : 
        (
          <View>
            <DrawerItem
              labelStyle={style.menuItem}
              label="| Home"
              onPress={() => {
                props.navigation.jumpTo('Home');
              }}
            />
            <DrawerItem
              labelStyle={style.menuItem}
              label="| Auth"
              onPress={() => {
                props.navigation.jumpTo('Auth');
              }}
            />
            <DrawerItem
              labelStyle={style.menuItem}
              label="| Registration"
              onPress={() => {
                props.navigation.jumpTo('Registration');
              }}
            />
          </View>
        )}
      </DrawerContentScrollView>
      {UserStore.isFlagAuth.Flag ? (
        <DrawerItem
          style={style.menuItemLogOut}
          labelStyle={style.menuItemLogOutLable}
          label="| LOGOUT"
          onPress={() => {
            UserStore.logoutUser()
            props.navigation.jumpTo('Home');
          }}
        />
      ) : null}
    </View>
  );
};

export default observer(Sidebar);

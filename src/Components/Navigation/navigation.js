import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Sidebar from './SideBar';
import HomeScreen from '../AuthScreen/HomeScreen';
import AuthScreen from '../AuthScreen/AuthScreen';
import TasksScreen from '../TaskScreen/TasksScreen';
import {TaskCreate} from '../TaskScreen/TaskCreate';
import UserStore from '../../ModuleRepositories/local/store/userStore';

const Drawer = createDrawerNavigator();

const MainNavigation = props => {
  return (
    <Drawer.Navigator
      drawerContent={ props => <Sidebar {...props} />}
      drawerType="slide"
      screenOptions = { {unmountOnBlur: true} }>
      <Drawer.Screen name="Home" size={ 20 } component={ HomeScreen } />
      <Drawer.Screen name="Auth">
        {props => (
          <AuthScreen
            {...props}
            authType="Login"
            authFunction={ UserStore.AuthUser }
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Registration">
        {props => (
          <AuthScreen
            {...props}
            authType="Registration"
            authFunction={ UserStore.RegistrationUser }
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name='Tasks'>
        {props => (
          <TasksScreen
            {...props}
            showActionSheetWithOptions={props.showActionSheetWithOptions}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="TaskCreate" component={ TaskCreate }/>
    </Drawer.Navigator>
  );
};

export default MainNavigation

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import {useActionSheet} from '@expo/react-native-action-sheet';

import MainNavigation from './Components/Navigation/navigation';
import {Warning} from './Components/Warnings/warningView';
import {navigationRef} from './Components/Navigation/navigationRef';
import {styles} from './styles/AppStyle'

const App: () => React$Node = () => {
  const {showActionSheetWithOptions} = useActionSheet();
  return (
    <NavigationContainer
      style={{flex: 5, backgroundColor: '#f8eddc', height: '100%'}}
      ref={navigationRef}>
      <View style={styles.Title}>
        <Text style={styles.textTitle}>Заметки</Text>
      </View>
      <MainNavigation showActionSheetWithOptions={showActionSheetWithOptions} />
      <Warning />
    </NavigationContainer>
  );
};

const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;

import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import {observer} from 'mobx-react';

import {defaultStyles} from '../../styles/screenDefaultStyles';
import UserStore from '../../ModuleRepositories/local/store/userStore';

function AuthScreen(props) {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <View style={ defaultStyles.screen }>
      <Text style={ defaultStyles.centerText }> {props.authType === 'Login' ? 'АВТОРИЗАЦИЯ' : 'РЕГИСТРАЦИЯ'} </Text>
      <TextInput
        style={ defaultStyles.textInput }
        value={
          UserStore.userData.email !== '' ? UserStore.userData.email : login
        }
        onChange={event => {
          setLogin(event.nativeEvent.text);
          UserStore.saveEmail(event.nativeEvent.text);
        }}
        placeholder="Login"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={ defaultStyles.textInput }
        value={ password }
        onChange={event => {
          setPassword(event.nativeEvent.text);
          UserStore.savePassword(event.nativeEvent.text);
        }}
        placeholder="Password"
        autoCompleteType="password"
        placeholderTextColor="#fff"
      />
      <Button
        containerStyle={ defaultStyles.button }
        titleStyle={ {color: '#232323'} }
        type="clear"
        title={props.authType}
        onPress={props.authFunction}
      />
    </View>
  );
}

export default observer(AuthScreen);

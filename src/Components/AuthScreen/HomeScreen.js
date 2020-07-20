import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {defaultStyles} from '../../styles/screenDefaultStyles';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={defaultStyles.screen}>
        <Text style={ defaultStyles.centerText } >
            Привет, если хочешь увидеть заметки, тебе придётся залогиниться
        </Text>
      </View>
    );
  }
}

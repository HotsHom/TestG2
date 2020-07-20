import React from 'react';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import ConnectedApp from './App';

export class AppContainer extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <ConnectedApp />
      </ActionSheetProvider>
    );
  }
}

import {Text, View, Animated, PanResponder} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import {connectActionSheet} from '@expo/react-native-action-sheet';

import {style} from '../../styles/taskViewStyle'
import TasksStore from '../../ModuleRepositories/local/store/tasksStore';
import { goToEdit } from '../../ModuleRepositories/local/navigationService';
import HistoryStore from '../../ModuleRepositories/local/store/historyStore'

class taskView extends React.Component {

  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => { 
      (Math.abs(gestureState.dx) < 120)
                    ? this.pan.x.setValue(gestureState.dx)
                    : this.pan.stopAnimation();
  },
    onPanResponderRelease: () => {
      let x = this.pan.x
      Animated.spring(this.pan, { toValue: { x: 0, y: 0 } }).start();
      if (Math.abs(x.__getValue()) > 80)
       x.__getValue() > 0 ?
          TasksStore.ChangeStatusTask(this.props.id, this.props.done)
          : this._onOpenActionSheet()
    }
  });

  _onOpenActionSheet = () => {
    const options = [
      `Редактировать`, 
      this.props.done ? 'Возобновить' : 'Завершить', 
      'Удалить', 
      'Отмена'
    ];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            TasksStore.loadCurrentTask(this.props.id)
            HistoryStore.clearHistory()
            goToEdit(this.props.id)
            break;
          case 1:
            TasksStore.ChangeStatusTask(this.props.id, this.props.done)
            break;
          case 2:
            TasksStore.DeleteTask(this.props.id)
            break;
          default:
            break;
        }
      },
    );
  };

  render() {
    return (
      <View style={style.con}>
        <Text style={style.r}>
          {this.props.done ? 'Возобновить' : 'Завершить'}
        </Text>
        <Text style={style.l}>
          Действие
        </Text>
        
        <Animated.View
            style={[style.container, this.props.done ? style.backgroundDone : style.backgroundUnDone , {
              transform: [{ translateX: this.pan.x }]
            }]}
            {...this.panResponder.panHandlers}
          >
          <View style={style.title}>
            <Text style={style.title}>{this.props.title}</Text>
          </View>
          <Text>
            {this.props.body}
          </Text>
        </Animated.View>
      </View>
    );
  }
}

const TaskView = connectActionSheet(observer(taskView));
export default TaskView;



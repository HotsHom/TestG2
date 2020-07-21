import {Text, View, Animated, PanResponder, StyleSheet} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import {connectActionSheet} from '@expo/react-native-action-sheet';

import TasksStore from './tasksStore';
import HistoryStore from './historyStore';

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
            HistoryStore.clearHistory()
            TasksStore.loadCurrentTask(this.props.id)
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


const style = StyleSheet.create({
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
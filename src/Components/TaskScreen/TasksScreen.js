import {observer} from 'mobx-react';
import {ScrollView, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-elements';

import {defaultStyles} from '../../styles/screenDefaultStyles';
import TaskView from './TaskView';
import TasksStore from '../../ModuleRepositories/local/store/tasksStore';
import { goToCreate } from '../../ModuleRepositories/local/navigationService';
import HistoryStore from '../../ModuleRepositories/local/store/historyStore';

class TasksScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  interval = null

  componentDidMount() {
    TasksStore.LoadTasks();
    this.interval = setInterval(() => {
      TasksStore.LoadTasks();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <View style={defaultStyles.screen}>
        <Button
          title="Добавить"
          onPress={() => {
            HistoryStore.clearHistory()
            TasksStore.clearCurrentTask()
            goToCreate()
          }}
          containerStyle={ defaultStyles.button }
          titleStyle={ {color: '#232323'} }
          type="clear"
        />
        <ScrollView style={ {height: '100%', width: '100%'} }>
          {Array.isArray(TasksStore.getTasksListStore) ? 
              TasksStore.getTasksListStore.map((value, index) => {
                return (
                  <TaskView
                    key={value.id}
                    title={value.title}
                    body={value.body}
                    id={value.id}
                    done={value.done}
                    showActionSheetWithOptions={ this.props.showActionSheetWithOptions }
                  />
                );
              })
            : ''
          }
        </ScrollView>
      </View>
    );
  }
}

export default observer(TasksScreen);

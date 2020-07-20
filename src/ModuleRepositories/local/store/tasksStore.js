import {action, computed, decorate, observable} from 'mobx';
import {RestService} from '../../rest/apiService';
import NotificationStore from './notificationStore';

class tasksStore {

  tasksData = observable({
    tasks: [],
    count: 0,
  });

  task = observable({
    id: null,
    title: '',
    body: '',
    done: false,
    changed: false
  });

  setField = (fieldName, value) => {
    this.task[fieldName] = value;
  };
  setTasks = tasks => {
    this.tasksData.tasks = tasks;
    this.tasksData.count = this.tasksData.tasks.length;
  };
  get getTasksListStore() {
    return this.tasksData.tasks.slice().sort((a, b) => {
      return +a.done - +b.done;
    });
  }

  CreateOrChangeTask = () => {
    RestService({
      url: `/tasks${this.task.id ? `/${this.task.id}` : ''}`,
      method: this.task.id ? 'PATCH' : 'POST',
      body: this.task,
    }).then(
      response => {
        this.LoadTasks();
        this.notyfication('Заметка', 'Tasks');
      },
      reason => {
        this.notyfication(reason, '', true);
      },
    );
  };
  LoadTasks = signal => {
    RestService({
      url: '/tasks',
      method: 'GET',
      signal: signal,
    }).then(
      response => {
        this.setTasks(response);
      },
      reason => {
        this.notyfication(reason, '', true);
      },
    );
  };
  DeleteTask = id => {
    RestService({
      url: `/tasks/${id}`,
      method: 'DELETE',
    }).then(
      () => {
        this.LoadTasks();
      },
      reason => {
        this.notyfication(reason, '', true);
      },
    );
  };
  ChangeStatusTask = (id, status) => {
    RestService({
      url: `/tasks/${id}`,
      method: 'PATCH',
      body: {done: !status},
    }).then(
      () => {
        this.LoadTasks();
      },
      reason => {
        this.notyfication(reason, '', true);
      },
    );
  };
  
  notyfication = (errorMessage, location, isError = false) => {
    NotificationStore.setNotification(errorMessage, location, isError);
  };

  loadCurrentTask = id => {
    let index = this.getTaskIndex(id);
    this.task = this.tasksData.tasks[index];
    this.task.id = id;
    this.task.changed = false
  };

  putInCurrentTask = task => {
    this.task.id = task.id
    this.task.body = task.body
    this.task.title = task.title
    this.task.done = task.done
    this.task.changed = task.changed
  }

  getTaskIndex = id => {
    return this.tasksData.tasks.findIndex(element => {
      return +element.id === +id;
    });
  };
  clearCurrentTask = () =>{
    this.task.body = ''
    this.task.id = null
    this.task.title = ''
    this.task.done = false
    this.task.changed = false
  }
  change(){
    this.task.changed = true
  }
  switchDone(){
    this.task.done = !this.task.done
  }
}
decorate(tasksStore, {
  ChangeStatusTask: action,
  setTasks: action,
  getTasksListStore: computed,
  LoadTasks: action,
  CreateOrChangeTask: action,
  DeleteTask: action,
  setField: action,
  loadCurrentTask: action,
  clearCurrentTask : action,
  change: action,
  switchDone: action,
  putInCurrentTask: action
});
const TasksStore = new tasksStore();
export default TasksStore;

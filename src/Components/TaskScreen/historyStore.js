import {action, decorate, observable, toJS} from 'mobx';
import TasksStore from "./tasksStore";

class historyStore {
    undo = observable({
        tasks: [],
      });

    redo = observable({
        tasks: [],
    })

    addPast = () => {
        this.clearRedo()
        this.undo.tasks.push(toJS(TasksStore.task))
    }
    addFuture = () => {
        this.redo.tasks.push(toJS(TasksStore.task))
    }
    getPast(){
        this.addFuture()
        this.undo.tasks.length > 1 ? TasksStore.putInCurrentTask(this.undo.tasks.pop()) : null
    }
    getFuture(){
        this.redo.tasks.length > 1 ? TasksStore.putInCurrentTask(this.redo.tasks.pop()) : null
    }
    clearHistory(){
        this.clearUndo()
        this.clearRedo()
    }
    clearRedo = () => {
        this.redo.tasks = [{
            id: null,
            title: '',
            body: '',
            done: false,
            changed: false
        }]
    }
    clearUndo = () => {
        this.undo.tasks = [{
            id: null,
            title: '',
            body: '',
            done: false,
            changed: false
        }]
    }
}
decorate(historyStore, {
    addFuture: action,
    addPast: action,
    getFuture: action,
    getPast: action,
    clearHistory: action,
    clearRedo: action,
    clearUndo: action
});

const HistoryStore = new historyStore();
export default HistoryStore;
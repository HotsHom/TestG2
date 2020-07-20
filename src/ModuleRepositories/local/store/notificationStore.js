import {action, computed, decorate, observable} from 'mobx';
import * as RootNavigation from '../../../Components/Navigation/navigationRef';

class notificationStore {
  notifications = [];

  setNotification = (text, location, isError_) => {
    this.notifications.push({
      text,
      done: false,
      location,
      isError: isError_,
    });
  };

  setStatus = id => {
    this.notifications[id].done = !this.notifications[id].done;
  };

  get getNotification() {
    if (
      this.notifications.length &&
      !this.notifications[this.notifications.length - 1].done
    ) {
      setTimeout(() => {
        this.setStatus(this.notifications.length - 1);
        if (this.notifications[this.notifications.length - 1].location !== '') {
          RootNavigation.navigate(
            this.notifications[this.notifications.length - 1].location,
          );
        }
      }, 2000);

      return !this.notifications[this.notifications.length - 1].done
        ? this.notifications[this.notifications.length - 1]
        : null;
    }
    return null;
  }
}
decorate(notificationStore, {
  setNotification: action,
  getNotification: computed,
  notifications: observable,
  setStatus: action,
});
const NotificationStore = new notificationStore();
export default NotificationStore;

import {action, computed, decorate, observable} from 'mobx';

import {RestService} from '../../rest/apiService';
import { deleteAllLocalData, setLocalToken, getLocalToken } from '../../../service/localStorageService';
import NotificationStore from './notificationStore';

class userStore {
  isFlagAuth = observable({
    Flag: false,
    loadFlag : getLocalToken()
  });

  userData = observable({
    id: 0,
    email: '',
    password: '',
    token: null,
  });

  changeFlagAuth = () => {
    this.isFlagAuth.Flag = !this.isFlagAuth.Flag;
  };
  saveData = (id_, token) => {
    this.userData.id = id_;
    this.userData.token = token;
    setLocalToken(token);
    this.changeFlagAuth();
  };
  get getEmail() {
    return this.userData.email;
  }
  get getPassword() {
    return this.userData.password;
  }
  saveToken = token => {
    this.userData.token = token;
  };
  saveEmail = email_ => {
    this.userData.email = email_;
  };
  savePassword = password_ => {
    this.userData.password = password_;
  };
  AuthUser = () => {
    RestService({
      url: '/Users/login',
      method: 'POST',
      body: {
        email: this.getEmail,
        password: this.getPassword,
      },
    }).then(
      response => {
        this.saveData(response.userId, response.id);
        this.notyfication('Успешная авторизация', 'Tasks');
      },
      reason => {
        this.notyfication(reason, '', true);
      },
    );
  };
  RegistrationUser = () => {
    RestService({
      url: '/Users',
      method: 'POST',
      body: {
        email: this.getEmail,
        password: this.getPassword,
      },
    }).then(
      () => {
        this.notyfication('Успешная регистрация', 'Auth');
        this.userData.password = '';
      },
      reason => {
        this.notyfication(reason, '', true);
      },
    );
  };
  notyfication = (errorMessage, location, isError = false) => {
    NotificationStore.setNotification(errorMessage, location, isError);
  };

  logoutUser = () => {
    deleteAllLocalData();
    this.changeFlagAuth()
  }
}
decorate(userStore, {
  changeFlagAuth: action,
  saveData: action,
  saveEmail: action,
  savePassword: action,
  AuthUser: action,
  getPassword: computed,
  getEmail: computed,
  RegistrationUser: action,
  saveToken: action,
  logoutUser: action
});
const UserStore = new userStore();
export default UserStore;

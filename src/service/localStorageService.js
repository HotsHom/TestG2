import UserStore from '../ModuleRepositories/local/store/userStore';
import AsyncStorage from '@react-native-community/async-storage';
import NotificationStore from '../ModuleRepositories/local/store/notificationStore';

export const setLocalToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    NotificationStore.setNotification(error, '', true)
  }
};

export const getLocalToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      UserStore.changeFlagAuth();
      UserStore.saveToken(token);
    }
  } catch (error) {
    NotificationStore.setNotification(error, '', true)
  }
};

export const deleteAllLocalData = async () => {
  try {
    await AsyncStorage.removeItem('token')
  } catch (error) {
    NotificationStore.setNotification(error, '', true)
  }
};

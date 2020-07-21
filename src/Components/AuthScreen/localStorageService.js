import AsyncStorage from '@react-native-community/async-storage';

export const setLocalToken = token => {return AsyncStorage.setItem('token', token)}

export const getLocalToken = () => {
    const token = AsyncStorage.getItem('token')
    return token ? token : Promise.reject(null)
};

export const deleteAllLocalData = () => {
  return AsyncStorage.removeItem('token')
};

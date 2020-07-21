import AsyncStorage from '@react-native-community/async-storage';

export const setLocalToken = async token => {
  try {
    return Promise.resolve(await AsyncStorage.setItem('token', token))
  } catch (error) {
    return Promise.reject(error)
  }
};

export const getLocalToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    return token ?
      Promise.resolve(token)
      : Promise.reject(null)
  } catch (error) {
    return Promise.reject(error)
  }
};

export const deleteAllLocalData = async () => {
  try {
    return Promise.resolve(await AsyncStorage.removeItem('token'))
  } catch (error) {
    return Promise.reject(error)
  }
};

import {ERROR_HTTP} from '../../constants';

const PORT = '3000';
const HOST = `http://10.15.14.44:${PORT}`;
const API_URL = `${HOST}/api`;

export const RestService = ({url, method, body, signal, tokenFunction}) => {
  const token = tokenFunction();
  const apiUrl = `${API_URL + url + (token ? '?access_token=' + token : '')}`;
  return fetch(apiUrl, {
    signal,
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(ERROR_HTTP);
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

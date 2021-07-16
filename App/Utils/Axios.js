import axios from 'axios';
import {API} from 'configs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {API_ROOT, TIMEOUT, ROOT} = API;
const getRoot = async () => {
  let root = await AsyncStorage.getItem('root');
  return !!root ? JSON.parse(root)?.value_index : ROOT;
};
const instance = axios.create({
  withCredentials: false,
  baseURL: ROOT,
  timeout: TIMEOUT,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Requested-Store': 'default',
  },
});

export function setDefaultHeaders(headers) {
  Object.keys(headers).forEach(key => {
    instance.defaults.headers.common[key] = headers[key];
  });
}

export default instance;

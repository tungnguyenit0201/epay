import axios from 'axios';
import {API} from 'configs';

const {TIMEOUT, ROOT} = API;
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

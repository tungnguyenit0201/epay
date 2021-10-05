import axios from 'axios';
import {API} from 'configs';
import curlirize from 'axios-curlirize';

const {TIMEOUT, ROOT} = API;
const instance = axios.create({
  withCredentials: false,
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

__DEV__ && curlirize(instance);

export default instance;

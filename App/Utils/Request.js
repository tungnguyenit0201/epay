import {Platform} from 'react-native';
import axios from './Axios';
import {API} from 'configs';
import {buildURL} from './Functions';
import _ from 'lodash';
import moment from 'moment';
import {
  getUniqueId,
  getVersion,
  getReadableVersion,
} from 'react-native-device-info';

let transactionID = '';

const getCommonParams = async (url, language = 'vi') => {
  const uniqueDeviceID = getUniqueId();
  let urlPart = url.split('/');

  return {
    MsgID: uniqueDeviceID + moment().format('DD-MM-YYYY HH:mm:ss.SSS'),
    MsgType: urlPart[urlPart.length - 1],
    TransactionID:
      transactionID !== null && transactionID !== ''
        ? transactionID
        : (
            new Date().getTime() +
            '' +
            Math.floor(Math.random() * 10000)
          ).toString(),
    RequestTime: moment().format('DD-MM-YYYY HH:mm:ss'),
    Lang: language,
    Channel: 'App',
    AppVersion: getVersion(),
    AppCode: getReadableVersion(),
    DeviceOS: Platform.OS,
    OsVersion: Platform.Version,
    IpAddress: '0.0.0.0',
    DeviceInfo:
      (Platform.OS === 'ios' ? 'Iphone iOS ' : 'Android ') + Platform.Version,
    DeviceID: uniqueDeviceID,
  };
};

async function request({
  method = 'get',
  url,
  query,
  params,
  success,
  failure = defaultFailureHandle,
  headers,
  form = false,
}) {
  let root = API.ROOT;
  const requestMethod = axios;

  if (typeof requestMethod[method] === 'function') {
    try {
      let result;
      if (method === 'get' || method === 'delete') {
        result = await requestMethod[method](buildURL(root + url, query), {
          headers,
        });
        if (__DEV__) {
          console.log(method, buildURL(root + url, query), params, result);
        }
      } else {
        let postParams = {...(await getCommonParams(url)), ...params};
        if (form) {
          postParams = new FormData();
          _.forIn(params, (value, key) => {
            if (typeof value === 'object')
              postParams.append(key, JSON.stringify(value));
            else postParams.append(key, value);
          });
        }
        result = await requestMethod[method](
          buildURL(root + url, query),
          postParams,
          {
            headers,
          },
        );
        if (__DEV__) {
          console.log(method, buildURL(root + url, query), postParams, result);
        }
      }
      if (
        result.status === 200 ||
        result.status === 201 ||
        result.status === 203
      ) {
        if (_.get(result, 'data.TransactionID', '')) {
          transactionID = _.get(result, 'data.TransactionID', '');
        }

        if (typeof success === 'function') {
          return success(result?.data || result);
        }
      } else {
        if (__DEV__) {
          console.log(method, buildURL(url, query), params, result);
        }
        return failure({
          status: result?.status,
          message: result?.data,
        });
      }
    } catch (err) {
      if (__DEV__) {
        console.log(method, buildURL(url, query), params, err);
      }
      const result = err?.toJSON?.();
      if (typeof failure === 'function') {
        if (err?.response?.data) {
          return failure({
            status: err?.response?.status,
            ...err?.response?.data,
          });
        } else {
          return failure({message: result?.message});
        }
      }
    }
  }
}

const defaultFailureHandle = error => {
  console.error(error);
};

export {request};

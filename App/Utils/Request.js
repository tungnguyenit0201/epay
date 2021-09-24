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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debugData} from 'components/Common/Debug';
import {ASYNC_STORAGE_KEY, COMMON_ENUM} from 'configs/Constants';
import curlirize from 'axios-curlirize';

import AES from './AES';
import RSA from './RSA';
import {signature} from './crypto';
var aes = new AES();
var rsa = new RSA();

let transactionID = '';

const getRequestData = async (url, params) => {
  let urlPart = url.split('/');
  const uniqueDeviceID = getUniqueId();
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
    ...params,
  };
};

const getEncryptParam = async (url, params) => {
  let language = 'vi';
  const uniqueDeviceID = getUniqueId();
  let urlPart = url.split('/');
  let currentLanguage = await AsyncStorage.getItem('currentLanguage');
  let requestTime = moment().format(COMMON_ENUM.DATETIME_FORMAT);
  let requestData = await getRequestData(url, params);
  // let dataEncrypted = aes.Encrypt(JSON.stringify(requestData));
  // let signature = rsa.Sign(requestTime, dataEncrypted);

  return {
    MsgType: urlPart[urlPart.length - 1],
    RequestTime: requestTime,
    Lang: currentLanguage ? currentLanguage : language,
    Channel: 'App',
    AppVersion: getVersion(),
    AppCode: getReadableVersion(),
    DeviceOS: Platform.OS,
    OsVersion: Platform.Version,
    IpAddress: '0.0.0.0',
    DeviceInfo:
      (Platform.OS === 'ios' ? 'Iphone iOS ' : 'Android ') + Platform.Version,
    DeviceID: uniqueDeviceID,
    // Data: dataEncrypted,
    Data: JSON.stringify(requestData),
    // Signature: signature,
    Signature: 'FAKE',
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
  // __DEV__ && curlirize(requestMethod);

  const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.USER.TOKEN);
  if (token) {
    headers = {...headers, Authorization: `Bearer ${token}`};
  }

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
        let postParams = await getEncryptParam(url, params);
        // console.log('postParams :>> ', postParams);
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
          debugData.push(result);
        }
      }

      let {data, status} = result || {};
      let {ResponseTime, Data, Signature, ErrorMessage, ErrorCode} = data || {};

      // console.log('[Request] Data: ' + JSON.stringify(result.data));
      //Verify signature
      const verified = rsa.Verify(ResponseTime, Data, Signature);
      if (!!verified) {
        if (status === 200 || status === 201 || status === 203) {
          if (_.get(result, 'data.TransactionID', '')) {
            transactionID = _.get(result, 'data.TransactionID', '');
          }

          // console.log('[Request] Data text before decrypt: ' + Data);
          // let deCryptedText = aes.Decrypt(Data);
          // console.log('[Request] Data text after decrypt: ' + deCryptedText);

          // const decryptedData = JSON.parse(deCryptedText);

          // transactionID = decryptedData?.TransactionID || transactionID;

          if (typeof success === 'function') {
            // if (!ErrorCode) {
            //   return success(decryptedData);
            // } else {
            //   return success(data);
            // }
            // return success({...result?.data, ...decryptedData} || result);
            return success({...result?.data, ...JSON.parse(Data)} || result);
          }
        } else {
          if (__DEV__) {
            console.log(method, buildURL(url, query), params, result);
          }
          return failure({
            status: status,
            message: ErrorMessage || aes.Decrypt(Data),
          });
        }
      } else {
        throw Error('WRONG_SIGNATURE');
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

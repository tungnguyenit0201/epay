import ERROR_CODE from 'configs/Enums/ErrorCode';
import axios from './Axios';
import ROOT from '../Configs/API';
import {Platform} from 'react-native';
import * as moment from 'moment';

/**
 * Main API Request
 * @param method
 * @param path
 * @param params
 * @param data
 * @param query
 * @param headers
 * @param success
 * @param failure
 * @param exception
 * @returns {Promise<void>}
 */
async function request({
  method = 'GET',
  path = '',
  params = [],
  data = {},
  query = {},
  headers = [],
  success = null,
  failure = defaultFailureHandler,
  exception = defaultExceptionHandler,
}) {
  return axios
    .request({
      method: method,
      baseURL: ROOT,
      // Generate Path from API Path and Params Value
      path: createRouteURL(path, params),
      // URL's query params
      params: query,
      data: {...getCommonData(path), ...data},
      headers: headers,
    })
    .then(function (response) {
      // If success code was returned, and success handler was provided
      if (response.ErrorCode === ERROR_CODE.SUCCESS && success) {
        success(response);
      }
      // If errorCode was not success
      failure(response);
      // Return the Promise response
      return response;
    })
    .catch(function (err) {
      exception(err);
    });
}

const AppInfo = {
  uniqueDeviceID: '',
  token: '',
  deviceInfo: '',
  pushToken: '',
  ipAddress: '0.0.0.0',
  transactionId: '',
};

/**
 *
 * @param url
 * @returns {{DeviceID: *, Channel: string, OsVersion: (string|number), RequestTime: string, Lang: *, MsgType: *, DeviceOS: (string), MsgID: string, TransactionID: (AppInfo.transactionId), AppVersion: *, AppCode: *, DeviceInfo: *, IpAddress: string}}
 */
const getCommonData = url => {
  let urlPart = url.split('/');
  return {
    MsgID: '',
    MsgType: urlPart[urlPart.length - 1],
    TransactionID:
      AppInfo.transactionId !== null && AppInfo.transactionId !== ''
        ? AppInfo.transactionId
        : (
            new Date().getTime() +
            '' +
            Math.floor(Math.random() * 10000)
          ).toString(),
    RequestTime: moment().format('DD-MM-YYYY HH:mm:ss'), //TODO: Fix This to Enum
    Lang: 'vi', //TODO: Fix This to Dynamic
    Channel: 'App',
    AppVersion: '', //TODO: Fix This to Dynamic
    AppCode: '', //TODO: Fix This to Dynamic
    DeviceOS: Platform.OS,
    OsVersion: Platform.Version,
    IpAddress: AppInfo.ipAddress,
    DeviceInfo: AppInfo.deviceInfo,
    DeviceID: AppInfo.uniqueDeviceID,
  };
};

/**
 * Create URL with route params
 * @param url
 * @param params
 * @returns {*}
 */
const createRouteURL = (url, params) => {
  let regex = new RegExp(/<[A-Za-z0-9_]*>/g),
    matches = [...url.matchAll(regex)];
  if (params.length !== matches.length) {
    throw new Error("Route's Params and Params must match");
  }
  params.forEach((param, index) => {
    url = url.replace(matches[index][0], param);
  });
  return url;
};

/**
 * Default Failure Handler
 * @param err
 */
const defaultFailureHandler = err => {
  console.log(err);
};

/**
 * Default Exception Handler
 * @param err
 */
const defaultExceptionHandler = err => {
  console.log(err);
};

export {request};

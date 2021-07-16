import axios from './Axios';
import {API} from 'configs';
// import WooCommerce from 'utils/WooCommerce';
import {buildURL} from './Functions';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WooCommerceAPI from 'react-native-woocommerce-api';

const getRoot = async () => {
  let root = await AsyncStorage.getItem('root');
  return !!root ? JSON.parse(root)?.value_index : API.ROOT;
};
async function request({
  method = 'get',
  url,
  query,
  params,
  success,
  failure,
  headers,
  form = false,
  isWooApi = false,
}) {
  let root = await getRoot();
  const WooCommerce = new WooCommerceAPI({
    url: root,
    ssl: true,
    consumerKey: 'ck_ba5ad7ba6f705e2b7158bd8b1a6b4a0406eae1a4',
    consumerSecret: 'cs_6fb40253eb3dd217e30d5d9640003b0da9d83615',
    wpAPI: true,
    version: 'wc/v3',
    queryStringAuth: true,
  });
  const requestMethod = isWooApi ? WooCommerce : axios;

  if (__DEV__) {
    console.log(method, buildURL(root + url, query), params);
  }

  if (typeof requestMethod[method] === 'function') {
    try {
      let result;
      if (method === 'get' || method === 'delete') {
        result = isWooApi
          ? await requestMethod[method](buildURL(url), {...query, headers})
          : await requestMethod[method](buildURL(root + url, query), {headers});
      } else {
        let postParams = params;
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
      }

      if (
        result.status === 200 ||
        result.status === 201 ||
        result.status === 203 ||
        (!!result && isWooApi)
      ) {
        if (_.get(result, 'data.error', null)) {
          throw {response: result};
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

export {request};

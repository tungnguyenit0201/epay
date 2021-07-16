import WooCommerceAPI from 'react-native-woocommerce-api';
import {API} from 'configs';
const {API_ROOT, TIMEOUT, ROOT} = API;

const instance = new WooCommerceAPI({
  url: ROOT,
  ssl: true,
  consumerKey: 'ck_ba5ad7ba6f705e2b7158bd8b1a6b4a0406eae1a4',
  consumerSecret: 'cs_6fb40253eb3dd217e30d5d9640003b0da9d83615',
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3',
  queryStringAuth: true,
});

export default instance;

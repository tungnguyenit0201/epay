//TODO: Changes ROOT later to production URL
const ROOT = __DEV__
  ? 'https://test.epayservices.com.vn:9443/api/v2'
  : 'https://test.epayservices.com.vn:9443/api/v2';
const TIMEOUT = 30;

export default {
  ROOT,
  TIMEOUT,
  USER: {
    CREATE: '/account/create_account',
    LOGIN: '/account/login_account',
  },
};

const ROOT = 'https://dev.epayservices.com.vn:9443/api/';
const TIMEOUT = 10000;

export default {
  ROOT,
  TIMEOUT,
  USER: {
    CREATE: '/account/create_account',
    LOGIN: '/account/login_account',
  },
  AUTH: {
    GET_CONFIG_INFO: 'config/get_config_info',
    CHECK_PHONE: 'account/check_exist',
  },
};

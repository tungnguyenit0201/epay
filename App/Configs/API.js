const ROOT = 'https://dev.epayservices.com.vn:9443/api/';
const TIMEOUT = 10000;

export default {
  ROOT,
  TIMEOUT,
  AUTH: {
    GET_CONFIG_INFO: 'config/get_config_info',
    CHECK_PHONE: 'account/check_exist',
    LOGIN: 'v2/account/login_account',
    REGISTER: 'account/create_account',
  },
  COMMON: {
    GEN_OTP: 'common/otp/gen_otp',
    CONFIRM_OTP: 'common/otp/confirm_otp',
  },
};

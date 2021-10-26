import {API} from 'configs';
import {request} from 'utils/Request';
import {useRequest} from 'context/Common/utils';

const useServiceUser = () => {
  const {doRequest} = useRequest();
  const updateForgotPassword = async ({phone, password}) => {
    let response = null;
    await doRequest({
      url: API.USER.UPDATE_FORGOT_PASSWORD,
      method: 'post',
      params: {PhoneNumber: phone, NewPassword: password},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const updatePersonalInfo = async ({phone, personalInfo}) => {
    let response = null;
    await doRequest({
      url: API.USER.UPDATE_PERSONAL_INFO,
      method: 'post',
      params: {PhoneNumber: phone, PersonalInfo: personalInfo},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getPersonalInfo = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.USER.GET_PERSONAL_INFO,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getAllInfo = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.USER.GET_ALL_INFO,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const updateUserAddress = async ({
    phone,
    Address,
    Ward,
    County,
    Provincial,
  }) => {
    let response = null;
    await doRequest({
      url: API.USER.UPDATE_USER_ADDRESS,
      method: 'post',
      params: {
        PhoneNumber: phone,
        AddressInfo: {
          Address,
          Ward,
          County,
          Provincial,
          Country: 'VIET NAM',
        },
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const updateIdentify = async ({phone, ICInfor}) => {
    let response = null;
    await doRequest({
      url: API.USER.UPDATE_IDENTIFY,
      method: 'post',
      params: {PhoneNumber: phone, ICInfor},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getConnectedBank = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.USER.GET_CONNECTED_BANK,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const confirmPassword = async ({phone, password}) => {
    let response = null;
    await doRequest({
      url: API.USER.CONFIRM_PASSWORD,
      method: 'post',
      params: {PhoneNumber: phone, Password: password},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getLimit = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.USER.GET_LIMIT,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getSettingsInfo = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.USER.GET_SETTINGS_INFO,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getQRCode = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.USER.GET_QRCODE,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const updateAvatar = async ({phone, AvatarPhoto}) => {
    let response = null;
    await doRequest({
      url: API.USER.UPDATE_AVATAR,
      method: 'post',
      params: {PhoneNumber: phone, AvatarPhoto},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const verifyEmail = async ({phone, email}) => {
    let response = null;
    await doRequest({
      url: API.USER.VERIFY_EMAIL,
      method: 'post',
      params: {PhoneNumber: phone, Email: email},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const updateEmail = async ({phone, email}) => {
    let response = null;
    await doRequest({
      url: API.USER.UPDATE_EMAIL,
      method: 'post',
      params: {PhoneNumber: phone, Email: email},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const updatePassword = async ({phone, oldPassword, newPassword}) => {
    let response = null;
    await doRequest({
      url: API.USER.UPDATE_PASSWORD,
      method: 'post',
      params: {
        PhoneNumber: phone,
        OldPassword: oldPassword,
        NewPassword: newPassword,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };
  return {
    updateForgotPassword,
    updatePersonalInfo,
    getPersonalInfo,
    getAllInfo,
    updateUserAddress,
    updateIdentify,
    getConnectedBank,
    confirmPassword,
    getLimit,
    getSettingsInfo,
    getQRCode,
    updateAvatar,
    verifyEmail,
    updateEmail,
    updatePassword,
  };
};
export default useServiceUser;

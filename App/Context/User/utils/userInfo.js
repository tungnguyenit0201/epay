import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN, FUNCTION_TYPE} from 'configs/Constants';
import useServiceUser from 'services/user';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useShowModal,
} from 'context/Common/utils';
import {useBankInfo} from 'context/Wallet/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
import {sha256} from 'react-native-sha256';
import {useWallet} from 'context/Wallet';
import ImagePicker from 'react-native-image-crop-picker';
import {getAll} from 'utils/Functions';
import Keychain from 'react-native-keychain';

const useUserInfo = type => {
  let personalInfo = useRef({
    FullName: '',
    DateOfBirth: '',
    SexType: 1,
    Avatar: '',
    Email: '',
  });

  const {getPhone, setName} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useUser();
  const {showModalSmartOTPSuggestion} = useShowModal();
  const {onChangeLimit} = useBankInfo();
  const {walletInfo} = useWallet();
  const {
    updatePersonalInfo,
    getPersonalInfo,
    getAllInfo,
    updateUserAddress,
    getConnectedBank,
    confirmPassword,
    getLimit,
    getQRCode,
    updateAvatar,
    updatePassword,
  } = useServiceUser();
  const [showModal, setShowModal] = useState(null);

  const setPersonalInfo = (key, value) => {
    personalInfo.current[key] = value;
  };

  const onGetPersonalInfo = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      setLoading(false);
      let result = await getPersonalInfo({phone});
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        dispatch({
          type: 'SET_PERSONAL_INFO',
          personalInfo: result?.PersonalInfo,
        });
        dispatch({type: 'SET_PHONE', phone});
      } else {
        setError(result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onUpdatePersonalInfo = async ({FullName}) => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await updatePersonalInfo({
        phone,
        personalInfo: {FullName: personalInfo.current?.FullName?.trim()},
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        await onGetAllInfo();
        // showModalSmartOTPSuggestion(true);
        Navigator.reset(SCREEN.TAB_NAVIGATION);
      } else {
        setError(result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetAllInfo = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getAllInfo({phone});
    setLoading(false);
    switch (_.get(result, 'ErrorCode', '')) {
      case ERROR_CODE.LOGIN_PASSWORD_INCORRECT:
        return setError(result);
      case ERROR_CODE.SUCCESS:
        console.log('result?.PersonalInfo :>> ', result?.PersonalInfo);
        dispatch({
          type: 'UPDATE_WALLET',
          data: result?.WalletInfo?.AvailableBlance,
        });
        dispatch({type: 'SET_PHONE', phone});
        dispatch({type: 'SET_PERSONAL_ADDRESS', data: result?.AddressInfo});
        dispatch({type: 'SET_PERSONAL_IC', data: result?.ICInfor});
        dispatch({
          type: 'SET_PERSONAL_INFO',
          personalInfo: result?.PersonalInfo,
        });
        dispatch({type: 'SET_PHONE', phone});
        result?.PersonalInfo?.FullName && setName(result.PersonalInfo.FullName);
    }
  };

  const onUpdateUserAddress = async ({Address, Ward, County, Provincial}) => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await updateUserAddress({
        phone,
        Address,
        Ward,
        County,
        Provincial,
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        dispatch({
          type: 'SET_PERSONAL_ADDRESS',
          data: {Address, Ward, County, Provincial},
        });
        Navigator.navigate(SCREEN.USER_INFO);
      } else {
        setError(result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetConnectedBank = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getConnectedBank({phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      return Navigator.navigate(SCREEN.MY_WALLET, result);
    } else {
      setError(result);
    }
  };

  const onConfirmPassword = async ({password}) => {
    const limitMoney = walletInfo?.limit;
    const passwordEncrypted = await sha256(password);
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await confirmPassword({
        phone,
        password: passwordEncrypted,
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        switch (type) {
          case 'change_limit_response':
            onChangeLimit({limit: limitMoney});
            Navigator.navigate(SCREEN.TAB_NAVIGATION);
            break;
          case 'confirm_password_response':
            Navigator.push(SCREEN.NEW_PASSWORD, {oldPassword: password});
            break;
          case 'update_email':
            Navigator.push(SCREEN.VERIFY_EMAIL, {
              functionType: FUNCTION_TYPE.CHANGE_EMAIL_BY_EMAIL,
            });
            break;
          default:
            Navigator.push(SCREEN.OTP, {
              phone,
              functionType: FUNCTION_TYPE.FORGOT_PASS,
            });
            break;
        }
      } else {
        setError(result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetLimit = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getLimit({phone});
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        Navigator.navigate(SCREEN.LIMIT_SETTING, result);
      } else {
        setError(result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onUpdateAvatar = async type => {
    const phone = await getPhone();
    const options = {cropping: false, includeBase64: true};
    const onUpdateResult = async image => {
      setLoading(true);
      const result = await updateAvatar({phone, AvatarPhoto: image?.data});
      setLoading(false);
      if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
        setError(result);
        return;
      }
      await onGetPersonalInfo();
    };

    switch (type) {
      case 'photo':
        return ImagePicker.openPicker(options).then(onUpdateResult);
      case 'camera':
        return ImagePicker.openCamera(options).then(onUpdateResult);
      default:
        return setShowModal('selectAvatar');
    }
  };

  const onUpdateUserInfo = async data => {
    const {Address, Ward, County, Provincial, SexType} = data;
    // update address
    onUpdateUserAddress({Address, Ward, County, Provincial});
    // update gender
    if (!SexType) {
      return;
    }
    const phone = await getPhone();
    const result = await updatePersonalInfo({
      phone,
      personalInfo: {SexType},
    });
    await onGetAllInfo();
    result?.ErrorCode && setError(result);
  };

  const onUpdatePassword = async ({oldPassword, newPassword}) => {
    setLoading(true);
    const [oldPasswordEncrypted, newPasswordEncrypted, phone] = await getAll(
      async () => await sha256(oldPassword),
      async () => await sha256(newPassword),
      getPhone,
    );
    const result = await updatePassword({
      phone,
      oldPassword: oldPasswordEncrypted,
      newPassword: newPasswordEncrypted,
    });
    setLoading(false);
    if (result?.ErrorCode === ERROR_CODE.SUCCESS) {
      setError({ErrorCode: -1, ErrorMessage: 'Đổi mật khẩu thành công'}); // TODO: translate
      Keychain.setGenericPassword(phone, newPasswordEncrypted);
      Navigator.navigate(SCREEN.TAB_NAVIGATION);
      return;
    }
    setError(result);
  };

  return {
    personalInfo: personalInfo.current,
    onUpdatePersonalInfo,
    setPersonalInfo,
    onGetPersonalInfo,
    onGetAllInfo,
    onUpdateUserAddress,
    onGetConnectedBank,
    onConfirmPassword,
    onGetLimit,
    onUpdateAvatar,
    onUpdateUserInfo,
    showModal,
    setShowModal,
    onUpdatePassword,
  };
};
export default useUserInfo;

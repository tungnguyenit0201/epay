import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN} from 'configs/Constants';
import {
  updatePersonalInfo,
  updateUserAddress,
  updateIdentify,
} from 'services/user';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import _ from 'lodash';
import {useUser} from '..';
import {useTranslation} from 'context/Language';
import {useUserInfo} from 'context/User/utils';

const useVerifyInfo = (initialValue = {}) => {
  const contentRef = useRef(initialValue);
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useUser();
  const translation = useTranslation();
  const {getPhone} = useAsyncStorage();
  const {onGetAllInfo} = useUserInfo();
  let [disabledIdentify, setDisabledIdentify] = useState(false);
  let [disabledAvatar, setDisabledAvatar] = useState(false);

  const onChange = (key, value) => {
    contentRef.current[key] = value;
    setDisabledIdentify(
      Boolean(
        !contentRef.current?.ICFrontPhoto || !contentRef.current?.ICBackPhoto,
      ),
    );
    setDisabledAvatar(!contentRef.current?.Avatar);
  };

  const onContinue = screen => {
    Navigator.navigate(screen, contentRef.current);
  };

  const onUpdateIdentify = async ({
    ICBackPhoto,
    ICFrontPhoto,
    ICFullName,
    ICIssuedDate,
    ICIssuedPlace,
    ICNumber,
  }) => {
    try {
      setLoading(true);

      let phone = await getPhone();
      let result = await updateIdentify({
        phone,
        ICInfor: {
          ICBackPhoto,
          ICFrontPhoto,
          ICFullName,
          ICIssuedDate,
          ICIssuedPlace,
          ICNumber,
        },
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        Navigator.navigate(SCREEN.VERIFY_SUCCESS);
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onUpdatePersonalInfo = async ({
    ICFullName,
    Avatar,
    DateOfBirth,
    Email,
    SexType,
  }) => {
    try {
      setLoading(true);

      let phone = await getPhone();
      let result = await updatePersonalInfo({
        phone,
        personalInfo: {
          FullName: ICFullName,
          Avatar,
          DateOfBirth,
          Email,
          SexType,
        },
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      } else setError(result);
    } catch (error) {
      setLoading(false);
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
        dispatch({
          type: 'SET_REGION',
          data: {Ward: '', County: '', Provincial: ''},
        });
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onUpdateAllInfo = async value => {
    await onUpdateIdentify({...contentRef.current, ...value});
    await onUpdatePersonalInfo({...contentRef.current, ...value});
    await onUpdateUserAddress({...contentRef.current, ...value});
    await onGetAllInfo();
  };

  return {
    disabledIdentify,
    disabledAvatar,
    verifyInfo: contentRef.current,
    onChange,
    onContinue,
    onUpdateAllInfo,
  };
};

export default useVerifyInfo;

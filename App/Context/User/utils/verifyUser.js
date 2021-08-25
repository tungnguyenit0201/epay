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

const useVerifyInfo = (initialValue = {}) => {
  const contentRef = useRef(initialValue);
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {getPhone} = useAsyncStorage();
  console.log('initialValue :>> ', initialValue, contentRef.current);

  const onChange = (key, value) => {
    contentRef.current[key] = value;
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
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS)
        console.log('result :>> ', result);
      else setError(result);
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
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS)
        Navigator.navigate(SCREEN.TAB_NAVIGATION);
      else setError(result);
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
        Navigator.navigate(SCREEN.USER_INFO);
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onUpdateAllInfo = async () => {
    console.log('values :>> ', contentRef.current);

    // await onUpdateIdentify(contentRef.current);
    // await onUpdatePersonalInfo(contentRef.current);
    // await onUpdateUserAddress(contentRef.current);
  };
  return {
    verifyInfo: contentRef.current,
    onChange,
    onContinue,
    onUpdateAllInfo,
  };
};

export default useVerifyInfo;

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
import {useSelectRegion, useUserInfo} from 'context/User/utils';

const useVerifyInfo = (initialValue = {}) => {
  const contentRef = useRef(initialValue);
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useUser();
  const translation = useTranslation();
  const {getPhone} = useAsyncStorage();
  const {onGetAllInfo} = useUserInfo();
  let [disabledIdentify, setDisabledIdentify] = useState(true);
  let [disabledAvatar, setDisabledAvatar] = useState(true);
  const [showModalReVerify, setShowModalReVerify] = useState(false);
  const {onClearRegionData} = useSelectRegion();

  const onChange = (key, value) => {
    contentRef.current[key] = value;
    setDisabledIdentify(
      Boolean(
        !contentRef.current?.ICFrontPhoto || !contentRef.current?.ICBackPhoto,
      ),
    );
    if (key == 'Avatar') setDisabledAvatar(Boolean(!value));
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
    identifyCard,
  }) => {
    setLoading(true);
    let phone = await getPhone();
    let result = await updateIdentify({
      phone,
      ICInfor: {
        ICBackPhoto: ICBackPhoto?.data,
        ICFrontPhoto: ICFrontPhoto?.data,
        ICFullName,
        ICIssuedDate,
        ICIssuedPlace,
        ICNumber,
        ICType: identifyCard?.ICType,
      },
    });
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      Navigator.navigate(SCREEN.VERIFY_SUCCESS);
    } else setError(result);
  };

  const onUpdatePersonalInfo = async ({
    ICFullName,
    Avatar,
    DateOfBirth,
    Email,
    SexType,
  }) => {
    setLoading(true);

    let phone = await getPhone();
    let result = await updatePersonalInfo({
      phone,
      personalInfo: {
        FullName: ICFullName,
        Avatar: Avatar?.data,
        DateOfBirth,
        Email,
        SexType,
      },
    });
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
    } else setError(result);
  };

  const onUpdateUserAddress = async ({Address, Ward, County, Provincial}) => {
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
  };

  const onUpdateAllInfo = async value => {
    // console.log('data :>> ', {...contentRef.current, ...value});
    await onUpdateIdentify({...contentRef.current, ...value});
    await onUpdatePersonalInfo({...contentRef.current, ...value});
    await onUpdateUserAddress({...contentRef.current, ...value});
    await onGetAllInfo();
    onClearRegionData();
  };

  const onReVerify = action => {
    switch (action) {
      case 'showModal':
        return setShowModalReVerify(true);
      case 'hideModal':
        return setShowModalReVerify(false);
      default:
        setShowModalReVerify(false);
        Navigator.push(SCREEN.CHOOSE_IDENTITY_CARD);
    }
  };

  return {
    disabledIdentify,
    disabledAvatar,
    verifyInfo: contentRef.current,
    showModalReVerify,
    onChange,
    onContinue,
    onUpdateAllInfo,
    onReVerify,
  };
};

export default useVerifyInfo;

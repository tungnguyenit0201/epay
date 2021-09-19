import { useState, useEffect, useRef } from 'react';
import Navigator from 'navigations/Navigator';
import { ERROR_CODE, SCREEN } from 'configs/Constants';
import {
  updatePersonalInfo,
  updateUserAddress,
  updateIdentify,
} from 'services/user';
import { useAsyncStorage, useError, useLoading } from 'context/Common/utils';
import _ from 'lodash';
import { useUser } from '..';
import { useTranslation } from 'context/Language';
import { useSelectRegion, useUserInfo } from 'context/User/utils';
import useKYC from 'context/User/utils/useKYC';
import KYCType from 'configs/Enums/KYCType';

const useVerifyInfo = (initialValue = {}) => {
  const contentRef = useRef(initialValue);
  const { setLoading } = useLoading();
  const { setError } = useError();
  const { dispatch } = useUser();
  const translation = useTranslation();
  const { getPhone } = useAsyncStorage();
  const { onGetAllInfo } = useUserInfo();
  let [disabledIdentify, setDisabledIdentify] = useState(true);
  let [disabledAvatar, setDisabledAvatar] = useState(true);
  const [showModalReVerify, setShowModalReVerify] = useState(false);
  const { onClearRegionData } = useSelectRegion();

  const documentType = contentRef.current?.identifyCard?.ICType;
  const { kycType, extractCardInfo, compareUserFace, verifyIdentityCard } = useKYC(documentType);
  const eKYC = kycType === KYCType.EKYC;

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
    try {
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
          Avatar: Avatar?.data,
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

  const onUpdateUserAddress = async ({ Address, Ward, County, Provincial }) => {
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
          data: { Address, Ward, County, Provincial },
        });
        dispatch({
          type: 'SET_REGION',
          data: { Ward: '', County: '', Provincial: '' },
        });
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onUpdateAllInfo = async value => {
    // console.log('data :>> ', { ...contentRef.current, ...value });
    try {
      if (eKYC) {
        const { CardID, CardNumber, Step, ICType, ValidDate, Verified } = extractCardInfo || {};
        await verifyIdentityCard({
          IdentityCardInfor: {
            Address: value.Address,
            BirthDay: value.DateOfBirth,
            CardID,
            CardNumber,
            District: value.County,
            Step,
            FullName: value.ICFullName,
            Gender: value.SexType,
            ICType,
            IssueDate: value.ICIssuedDate,
            IssuePlace: value.ICIssuedPlace,
            Province: value.Provincial,
            ValidDate,
            Verified,
            Ward: value.Ward,
          },
        });
      } else {
        await onUpdateIdentify({ ...contentRef.current, ...value });
      }
      await onUpdatePersonalInfo({ ...contentRef.current, ...value });
      await onUpdateUserAddress({ ...contentRef.current, ...value });
      await onGetAllInfo();
      onClearRegionData();
    } catch (e) {
      //console.log(e)
    }
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

  const onDoneIdentityCard = async () => {
    if (eKYC) {
      const result = await extractCardInfo(contentRef.current);
      if (result) {
        onChange('extractCardInfo', { ...result });
        onContinue(SCREEN.VERIFY_IDENTITY_CARD);
      }
    } else {
      onContinue(SCREEN.VERIFY_IDENTITY_CARD);
    }
  };

  const onDoneCaptureFace = async () => {
    if (eKYC) {
      const { extractCardInfo: cardInfo, Avatar } = contentRef.current;
      const result = await compareUserFace({
        Avatar,
        CardId: cardInfo?.CardID,
      });
      if (result) {
        onContinue(SCREEN.VERIFY_USER_PORTRAIT);
      }
    } else {
      onContinue(SCREEN.VERIFY_USER_PORTRAIT);
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
    onDoneIdentityCard,
    onDoneCaptureFace,
  };
};

export default useVerifyInfo;

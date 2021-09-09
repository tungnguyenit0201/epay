import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN, FUNCTION_TYPE, NOTIFY} from 'configs/Constants';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useShowModal,
} from 'context/Common/utils';
import {useUser} from 'context/User';
import {useWallet} from 'context/Wallet';
import _ from 'lodash';
import {sha256} from 'react-native-sha256';
import {cos} from 'react-native-reanimated';
import {
  getChargesNotify,
  getPromotionNotify,
  getOtherNotify,
} from 'services/user';
const useNotify = () => {
  const {getPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch, userInfo} = useUser();

  let listChargesNotify = [];
  let listPromotionNotify = [];
  let listOtherNotify = [];
  let listAllNotify = [];
  const addFlag = (dataNotify, flag) => {
    const listNotify = dataNotify.map(value => {
      value.flag = flag;
      return value;
    });
    return listNotify;
  };
  const onGetChargesNotify = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getChargesNotify({phone});
      setLoading(false);
      switch (_.get(result, 'ErrorCode')) {
        case ERROR_CODE.SUCCESS:
          const archive = addFlag(result?.NotifyInfo, NOTIFY.CHARGES);
          return {archive};
        default:
          setError(result);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetPromotionNotify = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getPromotionNotify({phone});
      setLoading(false);
      switch (_.get(result, 'ErrorCode')) {
        case ERROR_CODE.SUCCESS:
          const archive = addFlag(result?.NotifyPromoInfo, NOTIFY.PROMOTION);
          return {archive};
        default:
          setError(result);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetOtherNotify = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getOtherNotify({phone});
      setLoading(false);
      switch (_.get(result, 'ErrorCode')) {
        case ERROR_CODE.SUCCESS:
          const archive = addFlag(result?.NotifyInfo, NOTIFY.OTHER);
          return {archive};
        default:
          setError(result);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetAllNotify = async () => {
    try {
      setLoading(true);
      const listCharges = await onGetChargesNotify();
      const listPromotion = await onGetPromotionNotify();
      const listOther = await onGetOtherNotify();
      setLoading(false);
      if (listCharges?.archive || listPromotion?.archive || listOther.archive) {
        listChargesNotify = listCharges?.archive;
        listPromotionNotify = listPromotion?.archive;
        listOtherNotify = listOther?.archive;
        listAllNotify = [
          ...listChargesNotify,
          ...listPromotionNotify,
          ...listOtherNotify,
        ];
        dispatch({type: 'SET_NOTIFY', data: listAllNotify});
        Navigator.navigate(SCREEN.NOTIFICATION);
      } else setError({ErrorCode: -1, ErrorMessage: 'Something went wrong'});
    } catch (error) {
      setLoading(false);
    }
  };
  const selectNotify = type => {
    switch (type) {
      case NOTIFY.ALL:
        return userInfo?.listNotify;
      default:
        const result = userInfo?.listNotify.filter(notify => {
          return notify?.flag === type;
        });
        return result;
    }
  };
  return {
    onGetChargesNotify,
    onGetPromotionNotify,
    onGetOtherNotify,
    onGetAllNotify,
    selectNotify,
  };
};
export default useNotify;

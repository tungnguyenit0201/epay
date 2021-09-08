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
  const {dispatch} = useUser();
  const onGetChargesNotify = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getChargesNotify({phone});
      setLoading(false);
      switch (_.get(result, 'ErrorCode')) {
        case ERROR_CODE.SUCCESS:
          dispatch({type: 'SET_NOTIFY', data: result?.NotifyInfo});
          return {result};
        default:
          setError(result);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetPromotionNotify = async () => {
    let listPromotionNotify = {};
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getPromotionNotify({phone});
      setLoading(false);
      switch (_.get(result, 'ErrorCode')) {
        case ERROR_CODE.SUCCESS:
          dispatch({type: 'SET_NOTIFY', data: result?.NotifyPromoInfo});
          return {result};
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
          dispatch({type: 'SET_NOTIFY', data: result?.NotifyInfo});
          return {result};
        default:
          setError(result);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetAllNotify = async () => {
    let listAllNotify = [];
    try {
      setLoading(true);
      const listChargesNotify = await onGetChargesNotify();
      const listPromotionNotify = await onGetPromotionNotify();
      const listOtherNotify = await onGetOtherNotify();
      setLoading(false);
      if (
        _.get(listChargesNotify.result, 'ErrorCode') == ERROR_CODE.SUCCESS &&
        _.get(listPromotionNotify.result, 'ErrorCode') == ERROR_CODE.SUCCESS &&
        _.get(listOtherNotify.result, 'ErrorCode') == ERROR_CODE.SUCCESS
      ) {
        const listCharges = listChargesNotify?.result?.NotifyInfo;
        const listPromotion = listPromotionNotify?.result?.NotifyPromoInfo;
        const listOther = listOtherNotify?.result?.NotifyInfo;
        listAllNotify = [...listCharges, ...listPromotion, ...listOther];
        dispatch({type: 'SET_NOTIFY', data: listAllNotify});
      } else setError({ErrorCode: -1, ErrorMessage: 'Something went wrong'});
    } catch (error) {
      setLoading(false);
    }
  };
  const selectNotify = type => {
    switch (type) {
      case NOTIFY.CHARGES:
        onGetChargesNotify();
        break;
      case NOTIFY.PROMOTION:
        onGetPromotionNotify();
        break;
      case NOTIFY.OTHER:
        onGetOtherNotify();
        break;
      default:
        onGetAllNotify();
        break;
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

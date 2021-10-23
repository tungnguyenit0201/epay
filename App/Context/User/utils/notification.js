import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN, NOTIFY} from 'configs/Constants';
import {useError, useLoading} from 'context/Common/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
import useSErviceNotificaiton from 'services/notification';
import {getAll} from 'utils/Functions';
import {useTranslation} from 'context/Language';

const useNotify = (isMount = true) => {
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch, userInfo, phone} = useUser();
  const translation = useTranslation();
  const {
    getChargesNotify,
    getPromotionNotify,
    getOtherNotify,
    readNotify,
    getAllNofify,
  } = useSErviceNotificaiton();
  let listChargesNotify = [];
  let listPromotionNotify = [];
  let listOtherNotify = [];
  let listAllNotify = [];

  const addFlag = (dataNotify, flag) => {
    const listNotify = dataNotify.map(value => {
      !value?.NotifyType && (value.NotifyType = flag?.value || flag);
      return value;
    });
    return listNotify;
  };

  const onGetChargesNotify = async () => {
    try {
      setLoading(true);
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

  const onGetAllNotify = async isMount => {
    try {
      setLoading(true);
      const result = await getAllNofify({phone});
      if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
        setError({
          ...result,
          onClose: () => (isMount ? Navigator.goBack?.() : true),
        });
        return;
      }
      dispatch({type: 'SET_NOTIFY', data: result?.NotifyInfo});
    } finally {
      setLoading(false);
    }

    // old API
    // try {
    //   setLoading(true);
    //   const [listCharges, listPromotion, listOther] = await getAll(
    //     onGetChargesNotify,
    //     onGetPromotionNotify,
    //     onGetOtherNotify,
    //   );
    //   setLoading(false);
    //   if (listCharges?.archive || listPromotion?.archive || listOther.archive) {
    //     listChargesNotify = listCharges?.archive;
    //     listPromotionNotify = listPromotion?.archive;
    //     listOtherNotify = listOther?.archive;
    //     listAllNotify = [
    //       ...listChargesNotify,
    //       ...listPromotionNotify,
    //       ...listOtherNotify,
    //     ];
    //     dispatch({type: 'SET_NOTIFY', data: listAllNotify});
    //   } else setError({ErrorCode: -1, ErrorMessage: 'Something went wrong'});
    // } catch (error) {
    //   setLoading(false);
    // }
  };

  const onGoNotify = async () => {
    // await onGetAllNotify();
    Navigator.navigate(SCREEN.NOTIFICATION);
  };

  const selectNotify = type => {
    const notifyType = _.mapKeys(NOTIFY, ({value}) => value);
    switch (type) {
      case NOTIFY.ALL.title:
        return userInfo?.listNotify;
      default:
        const result = userInfo?.listNotify.filter(notify => {
          return notifyType[notify?.NotifyType].title === type;
        });
        return result;
    }
  };

  const onReadNotify = async notifyID => {
    const result = await readNotify({phone, notifyID});
    if (result?.ErrorCode === ERROR_CODE.SUCCESS) {
      onGetAllNotify();
    }
  };

  const onPressNotify = item => {
    // if (item?.NotifyType === NOTIFY.OTHER.value) {
    //   Navigator.push(SCREEN.TRANSACTION_SUCCESS);
    // } else {
    //   Navigator.navigate(SCREEN.EPAY_SUCCESS, {data: item});
    // }
    Navigator.navigate(SCREEN.EPAY_SUCCESS, {data: item});
    item?.Id && !item?.IsRead && onReadNotify(item.Id);
  };

  const onReadAllNotify = () => {
    const list = userInfo?.listNotify?.filter(x => !x.IsRead);
    list.forEach(item => {
      item?.Id && readNotify({phone, notifyID: item?.Id});
    });
    onGetAllNotify();
  };

  useEffect(() => {
    phone && isMount && onGetAllNotify(true);
  }, [phone]);

  return {
    onGetChargesNotify,
    onGetPromotionNotify,
    onGetOtherNotify,
    onGetAllNotify,
    selectNotify,
    onReadNotify,
    onPressNotify,
    onGoNotify,
    onReadAllNotify,
  };
};
export default useNotify;

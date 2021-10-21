import React, {useEffect, useRef, useState} from 'react';
import {useError, useLoading} from 'context/Common/utils';
import {useUser} from 'context/User';
import {useWallet} from 'context/Wallet';
import useServiceWallet from 'services/wallet';
import {ERROR_CODE, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const useQRPromo = () => {
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {phone} = useUser();
  const {qrTransaction, dispatch} = useWallet();
  const {getPromotion, applyPromo} = useServiceWallet();
  const promotion = useRef({});
  let [promoCode, setPromoCode] = useState(false);

  const {MerchantCode, AgencyCode, Amount} = qrTransaction;

  const onChange = (key, value) => {
    if (key == 'promoCode') return setPromoCode(value);
    promotion.current[key] = value;
  };
  const onGetPromo = async () => {
    setLoading(true);
    let result = await getPromotion({
      phone,
      MerchantCode,
      AgencyCode,
      PromoCode: promotion.current?.promoCode,
      //   PromoCode: 'HAPPYDAY',
      Amount,
    });
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      promotion.current.promotions = result?.Promotions;
    } else setError(result);
    setLoading(false);
  };

  const onApplyPromo = async () => {
    setLoading(true);
    let result = await applyPromo({
      phone,
      MerchantCode,
      AgencyCode,
      PromoCode: promoCode,
    });
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      promotion.current.promotions = result?.Promotions;
      Navigator.navigate(SCREEN.QR_TRANSFER);
    } else setError(result);
    setLoading(false);
  };

  useEffect(() => {
    // setLoading(false);
  }, []);
  return {
    promoCode,
    promotions: promotion.current?.promotions,
    onGetPromo,
    onChange,
    onApplyPromo,
  };
};
export default useQRPromo;

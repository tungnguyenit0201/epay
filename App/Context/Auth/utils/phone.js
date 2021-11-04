import {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {useAsyncStorage} from 'context/Common/utils';
import {useIsFocused} from '@react-navigation/native';

const usePhone = () => {
  const [phone, setPhone] = useState('');
  const {setPhone: setPhoneStorage, getPhone} = useAsyncStorage();
  const isFocused = useIsFocused();
  const isLoadedRef = useRef(false);

  const loadPhone = async () => {
    setPhone(await getPhone());
    isLoadedRef.current = true;
  };

  useEffect(() => {
    loadPhone();
    return () => {
      phone && setPhoneStorage(phone);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isFocused) {
      isLoadedRef.current && setPhone('');
    } else {
      loadPhone();
    }
  }, [isFocused]);

  return {phone};
};

export default usePhone;

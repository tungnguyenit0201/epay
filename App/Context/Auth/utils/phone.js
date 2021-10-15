import {useState, useEffect} from 'react';
import _ from 'lodash';
import {useAsyncStorage} from 'context/Common/utils';

const usePhone = () => {
  const [phone, setPhone] = useState('');
  const {setPhone: setPhoneStorage, getPhone} = useAsyncStorage();

  const loadPhone = async () => {
    setPhone(await getPhone());
  };

  useEffect(() => {
    loadPhone();
    return () => {
      phone && setPhoneStorage(phone);
    };
  }, []); // eslint-disable-line

  return {phone};
};

export default usePhone;

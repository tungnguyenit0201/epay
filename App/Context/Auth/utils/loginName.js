import {SCREEN} from 'configs/Constants';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {useAsyncStorage} from 'context/Common/utils';

const useLoginName = () => {
  const {getPhone, getNameData} = useAsyncStorage();

  const getParams = async phone => {
    const _phone = phone || (await getPhone());
    const nameData = await getNameData();
    return {phone: _phone, name: nameData[_phone]};
  };

  const navigateLoginByName = async phone => {
    Navigator.navigate(SCREEN.LOGIN, await getParams(phone));
  };

  const resetLoginByName = async phone => {
    Navigator.reset(SCREEN.AUTH);
    Navigator.navigate(SCREEN.LOGIN, await getParams(phone));
  };

  return {navigateLoginByName, resetLoginByName};
};

export default useLoginName;

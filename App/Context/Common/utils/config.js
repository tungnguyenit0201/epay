import {useCommon} from 'context/Common';
import _ from 'lodash';
import {useUser} from 'context/User';
import useAsyncStorage from './asyncStorage';
import {getConfigInfo} from 'services/common';
const useConfig = () => {
  const {dispatch} = useCommon();

  const onGetConfig = async (value = true) => {
    let result = await getConfigInfo();

    dispatch({type: 'SET_CONFIG', config: result?.ConfigInfo});
  };

  return {onGetConfig};
};

export default useConfig;

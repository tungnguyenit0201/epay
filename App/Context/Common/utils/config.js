import {useCommon} from 'context/Common';
import _ from 'lodash';
import {useUser} from 'context/User';
import useAsyncStorage from './asyncStorage';
import useServiceCommon from 'services/common';
import {ERROR_CODE} from 'configs/Constants';
const useConfig = () => {
  const {dispatch} = useCommon();
  const {getConfigInfo} = useServiceCommon();
  const onGetConfig = async (value = true) => {
    let result = await getConfigInfo();
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      dispatch({type: 'SET_CONFIG', config: result?.ConfigInfo});
      return result?.ConfigInfo;
    } else
      dispatch({
        type: 'SET_ERROR',
        error: {
          errorCode: result?.ErrorCode,
          errorMessage: result?.ErrorMessage,
          action: [{onPress: () => {}}],
        },
      });
  };

  return {onGetConfig};
};

export default useConfig;

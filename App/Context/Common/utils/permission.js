import {useEffect} from 'react';
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Navigator from 'navigations/Navigator';
import {useCommon} from '..';

export const usePermission = () => {
  const {showModalCamera} = useModalPermission();
  const checkPermission = async action => {
    try {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );

          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          !!action && action();

          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          showModalCamera(true);

          break;
      }
      return result;
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return {checkPermission};
};

export const useModalPermission = () => {
  const {dispatch, showModal} = useCommon();
  const showModalCamera = (value = true) => {
    dispatch({type: 'SHOW_MODAL', modal: {type: 'permissionCamera', value}});
  };
  const askPermission = () => {
    try {
      dispatch({
        type: 'SHOW_MODAL',
        modal: {type: 'permissionCamera', value: false},
      });
      openSettings().catch(() => console.log('cannot open settings'));
    } catch (error) {
      console.log('askPermission :>> ', error);
    }
  };
  return {
    permissionCamera: showModal?.permissionCamera,
    showModalCamera,
    askPermission,
  };
};

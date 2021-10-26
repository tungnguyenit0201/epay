import {useEffect, useState} from 'react';
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Navigator from 'navigations/Navigator';
import {useCommon} from '..';
import {Images} from 'themes';
import useError from './error';

export const usePermission = () => {
  const {showModalCamera} = useModalPermission();
  const checkPermission = async (action, goBack) => {
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
          !!action && action();
          !!goBack && goBack();
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

          showModalCamera(true, goBack);

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
  const {setError} = useError();
  const showModalCamera = (value = true, goBack) => {
    // dispatch({
    //   type: 'SHOW_MODAL',
    //   modal: {type: 'permissionCamera', value},
    //   goBack,
    // });
    setError({
      title: 'Truy cập camera',
      ErrorCode: -1,
      ErrorMessage: 'Epay muốn truy cập camera trên điện thoại của bạn',
      icon: Images.Modal.Camera,
      onClose: () => showModalCamera(false),
      action: [
        {
          label: 'Cho phép',
          onPress: () => askPermission(),
        },
        {
          label: 'Nhắc tôi sau',
          onPress: () => showModalCamera(false),
        },
      ],
    });
    // showModal?.goBack && showModal?.goBack();
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

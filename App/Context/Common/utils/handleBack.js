import React, {useEffect, useRef, useState} from 'react';
import {BackHandler} from 'react-native';
import {useError} from 'context/Common/utils';
import {useFocusEffect} from '@react-navigation/native';
import {useCommon} from 'context/Common';

export const useHandleBack = goBack => {
  const backType = useCommon();
  const numBack = useRef(0);
  const {setError} = useError();
  const backAction = () => {
    console.log('backType :>> ', backType?.backType);
    if (!backType?.backType) return true;

    if (backType == 1) {
      setTimeout(() => {
        numBack.current = 0;
      }, 3000);
      if (numBack.current > 0) {
        BackHandler.exitApp();
      } else {
        numBack.current = numBack.current + 1;
        setError({ErrorMessage: '....'});
      }
    }
    if (goBack && backType == 2) {
      return goBack();
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
};

// export const backAction = () => {
//   const numBack = useRef(0);
//   const {setError} = useError();
//   const {dispatch, backType} = useCommon();

//   const checkExit = () => {
//     setTimeout(() => {
//       numBack.current = 0;
//     }, 3000);
//     if (numBack.current > 0) {
//       BackHandler.exitApp();
//     } else {
//       numBack.current = numBack.current + 1;
//       setError({ErrorMessage: '....'});
//     }
//   };
//   useFocusEffect(
//     useCallback(() => {
//       dispatch({type: 'SET_BACK_TYPE', backType: 0});
//     }, []),
//   );
//   return {checkExit};
// };

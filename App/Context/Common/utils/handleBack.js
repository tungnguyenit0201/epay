import React, {useEffect, useRef, useState} from 'react';
import {BackHandler} from 'react-native';
import {useError} from 'context/Common/utils';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'context/Language';

export const useHandleBack = () => {
  const numBack = useRef(0);
  const {setError} = useError();
  const isFocused = useIsFocused();
  const translation = useTranslation();
  const backAction = () => {
    setTimeout(() => {
      numBack.current = 0;
    }, 3000);
    if (numBack.current > 0) {
      BackHandler.exitApp();
    } else {
      numBack.current = numBack.current + 1;
      setError({
        ErrorMessage: translation?.back_alert,
        action: [
          {
            label: translation.cancelled,
          },
        ],
      });
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    !isFocused && backHandler.remove();
    return () => backHandler.remove();
  }, [isFocused]);
};

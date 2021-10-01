import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, } from 'react-native';
import { HeaderBg, Header, Button, Text } from 'components';
import { useOTPBySmartOTP } from 'context/Wallet/utils';
import OTPBySmartOTPInput from 'components/User/SmartOTP/OTPBySmartOTPInput';
import { useTranslation } from 'context/Language';
import { Fonts, base, Colors } from 'themes';
import { scale } from 'utils/Functions';

const OTPBySmartOTP = (props) => {
  const { code, onConfirm, time } = useOTPBySmartOTP();
  const translation = useTranslation();

  const renderOTP = useCallback(
    () => {
      return <OTPBySmartOTPInput code={code} />
    },
    [code],
  )

  const renderTime = useCallback(
    () => {
      return <Text centered mv={20}>
        <Text centered>{translation.transaction.timeOTP}</Text>
        <Text centered bold color={Colors.blue}>{`${time}s`}</Text>
      </Text>
    },
    [time],
  )


  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header title={translation.transaction.confirm} back style={{ marginBottom: 20 }} />
      </HeaderBg>
      <View style={styles.content}>
        <Text mb={5} fs={'h5'} fw={'600'} color={'#141212'} style={{ lineHeight: 34 }}>{translation.transaction.confirmTransaction}</Text>
        <Text mb={35}>{translation.transaction.autoFillOTP} </Text>

        {
          renderOTP()
        }

        {
          renderTime()
        }

      </View>
      <View style={base.boxBottom}>
        <Button
          label={translation.transaction.confirm}
          bold
          onPress={onConfirm}
        />
      </View>
    </View>
  );
};

export default OTPBySmartOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(19),
    paddingTop: 28,
  },
  confirmTransaction: {
    fontSize: 28,
    fontWeight: '600'
  }
});

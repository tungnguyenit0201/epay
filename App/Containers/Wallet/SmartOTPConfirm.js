import React, { useState, useEffect, createRef, useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'components';
import { Colors, Fonts } from 'themes';
import { scale } from 'utils/Functions';
import { useNavigation } from '@react-navigation/core';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'context/Language';
import _ from 'lodash';
import { useSmartOTP } from 'context/User/utils';


const MAX_OTP_LENGTH = 6;
const cellSize = 16;
const cellSpacing = 16;

const SmartOTPConfirm = ({ route }) => {
  const navigation = useNavigation();
  const [otpCode, setOtpCode] = useState("")
  const otpRef = createRef(null);
  const translation = useTranslation();
  const { checkValidSmartOTP, message } = useSmartOTP();

  //NOTE: ALWAY OPEN KEYBOARD EVEN IF USER DISMISS APP AND OPEN AGAIN
  useEffect(() => {
    otpRef?.current?.focus();
  })
  const dismiss = useCallback(
    () => {
      navigation.goBack();
    },
    [],
  )

  useEffect(() => {
    setOtpCode("");
  },[message])

  const onChangeOTP = (otp) => {
    setOtpCode(otp)
    if(otp.length == MAX_OTP_LENGTH) {
      checkValidSmartOTP({
        otp,
        onSuccess: _.get(route, 'params.onSuccess', ()=>{})
      })
    } 
  }


  return <View style={{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  }}>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={dismiss}
      >
        <Image source={require('../../Images/icons/ic_close_grey.png')} style={styles.closeImage} resizeMode={'contain'} />
      </TouchableOpacity>

      <Text centered bold size={Fonts.H1}>{translation.smartOTP.enterOTP}</Text>

      <View style={styles.inputOTPContainer}>
        {
          Array.apply(null, Array(MAX_OTP_LENGTH)).map((_, idx) => {
            const filled = idx < otpCode.length;
            return <View
              key={idx}
              style={[styles.otpCode, { backgroundColor: filled ? "#141212" : "#C4C4C4" }]}
            >
            </View>
          })
        }
      </View> 
      <TextInput
        keyboardType={'number-pad'}
        autoCorrect={false}
        ref={otpRef}
        disableFullscreenUI
        onChangeText={onChangeOTP}
        value={otpCode}
        style={styles.inputOTP}
      />
      <Text centered  color={'red'} style={{flex:1}}>{message}</Text>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={()=>{

        }}
      >
        <Text
          centered
          size={Fonts.H6}
          >
          {translation.smartOTP.forgotPassword}
        </Text>
      </TouchableOpacity>
    </View>
    
  </View>;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: scale(334),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: Colors.white,
  },
  continueContainer: {
    padding: scale(16),
    paddingBottom: 0
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: scale(20),
    marginRight: scale(20),
  },
  closeImage: {
    height: scale(15),
    width: scale(15),
  },
  inputOTP: {
    flex: 1,
    opacity: 0,
    textAlign: 'center',
  },
  inputOTPContainer: {
    marginTop: scale(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  otpCode: {
    width: cellSize,
    height: cellSize,
    marginLeft: cellSpacing / 2,
    marginRight: cellSpacing / 2,
    borderRadius: cellSize / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  forgotPassword: {
    marginBottom: scale(10)
  }
});

export default React.memo(SmartOTPConfirm);

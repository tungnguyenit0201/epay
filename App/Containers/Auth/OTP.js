import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import {
  Text,
  InputBlock,
  Header,
  Button,
  FWLoading,
  TextInput,
} from 'components';
import { TEXT } from 'configs/Constants';
import { Colors, Fonts, Spacing } from 'themes';
import { User } from 'services';
import Navigator from 'navigations/Navigator';
import _ from 'lodash';
import { scale } from 'utils/Functions';
import OTPContainer from 'components/Auth/OTPContainer';
import Password from 'components/Auth/Password';
import { SCREEN } from 'configs/Constants';

const OTP = () => {
  let { height } = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let [countdown, setCountDown] = useState(100);
  let forgotRef = useRef({
    otp: null,
    newPassword: null,
    passwordConfirm: null,
  });
  const onChange = (key, val) => {
    forgotRef.current[key] = val;
  };

  const register = async () => {
    Navigator.navigate(SCREEN.REGISTER_PASSWORD);
  };

  return (
    <ScrollView style={styles.container}>
      <Header back />

      {!loading ? (
        <View style={styles.wrap}>
          <OTPContainer
            onChange={value => onChange('otp', value)} />

          {/* <Password
            onChangePassword={value => onChange('newPassword', value)}
            onChangeConfirm={value => onChange('passwordConfirm', value)}
          /> */}

          {/* <Button
            mb={10}
            disabled
            label='Gửi lại (56s)'
            onPress={register}
            labelStyle={{color: Colors.GRAY}}
            style={styles.btn_send}/> 
            //button send which waiting for [number] seconds*/}
          <Button
            mb={10}
            label='Gửi lại (56s)'
          //onPress={register}
          />
          <Button
            disabled = {false}
            label='Tiếp tục'
            onPress={register} 
            style={styles.buttonBlock}
          />
        </View>
      ) : (
        <FWLoading wrapStyle={[styles.loading, { height: height }]} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING * 3,
  },
  header: {
    fontSize: Fonts.FONT_LARGE,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmation: {
    marginTop: Spacing.PADDING * 2,
  },
  btn_send: {
    // color: Colors.BLACK,
    backgroundColor: '#fff',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: Colors.BLACK,
    borderStyle: 'solid'
  },
  buttonBlock: {
    paddingVertical: Spacing.PADDING,
  },
});
export default OTP;

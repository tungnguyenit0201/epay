import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, FWLoading} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import _ from 'lodash';
import {SCREEN} from 'configs/Constants';

const Register = () => {
  let {height} = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let [disable, setDisable] = useState(true);

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

  const pressOTP = () => {
    Navigator.navigate(SCREEN.OTP);
  };

  return (
    // TODO: translate
    <ScrollView style={styles.container}>
      <Header back shadow={false} />

      {!loading ? (
        <View style={styles.wrap}>
          <Text style={[styles.title]} mb={20}>
            Nhập số điện thoại
          </Text>
          <Text style={styles.text} mb={40}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <InputBlock
            phone
            style={[styles.input]}
            placeholder="Nhập số điện thoại"
            onFocus={e => setDisable(false)}
          />
          <Text style={styles.text}>Số điện thoại không đúng</Text>
          <Button
            mt={56}
            disabled={disable}
            label="Tiếp tục"
            style={styles.btn}
            onPress={pressOTP}
          />
        </View>
      ) : (
        <FWLoading wrapStyle={[styles.loading, {height: height}]} />
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
    paddingHorizontal: Spacing.PADDING * 2,
    paddingTop: Spacing.PADDING * 3,
  },
  // header: {
  //   // fontSize: Fonts.FONT_LARGE,
  //   // fontWeight: 'bold',
  //   // paddingBottom: Spacing.PADDING,
  //   // boxShadow: unset
  // },
  title: {
    fontSize: 30,
    // marginBottom: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 14,
  },
  input: {
    // marginBottom: 56,
    borderColor: Colors.black,
    borderRadius: 3,
    backgroundColor: Colors.white,
  },
  btn: {
    // color: Colors.BLACK,
    // fontSize: 30,
    paddingTop: 15,
    paddingBottom: 15,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Register;

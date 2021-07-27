import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {
  Text,
  InputBlock,
  Header,
  Button,
  FWLoading,
  TextInput,
} from 'components';
import {TEXT} from 'configs/Constants';
import {Colors, Fonts, Spacing} from 'themes';
import {User} from 'services';
import Navigator from 'navigations/Navigator';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import OTPContainer from 'components/Auth/OTPContainer';
import Password from 'components/Auth/Password';
import {SCREEN} from 'configs/Constants';

const Register = () => {
  let {height} = useWindowDimensions();
  let [loading, setLoading] = useState(false);
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
      <Header back shadow={false}/>

      {!loading ? (
        <View style={styles.wrap}>
          <Text style={[styles.title]}>Nhập số điện thoại</Text>
          <Text style={[styles.text]} mb={40}>Lorem Ipsum is simply dummy text of 
            the printing and typesetting industry.</Text>
          <InputBlock phone style={[styles.input]} placeholder="Nhập số điện thoại"/>
          <Button
            mode="no"
            label="Tiếp tục"
            style={styles.btn}
            onPress={() => Navigator.navigate(SCREEN.LOGIN)}
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
    fontSize: 35,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14
  },
  input: {
    marginBottom: 56,
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: '#fff'
  },
  btn: {
    color: Colors.BLACK,
    fontSize: 30,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#CCCCCC'
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmation: {
    marginTop: Spacing.PADDING * 2,
  },
});
export default Register;

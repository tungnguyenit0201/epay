import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, Pressable, useWindowDimensions} from 'react-native';
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

const OTP = () => {
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
      <Header back />

      {!loading ? (
        <View style={styles.wrap}>
          <OTPContainer 
            onChange={value => onChange('otp', value)}/>

          {/* <Password
            onChangePassword={value => onChange('newPassword', value)}
            onChangeConfirm={value => onChange('passwordConfirm', value)}
          /> */}

          <Button
            mb={10}
            disabled
            label={() => (
              <Text style={{color: Colors.BACKGROUNDACCORDION}}>
                {TEXT.CONFIRM} <Text>(60s)</Text>
              </Text>
            )}
            style={styles.disabled_btn}
            onPress={register}/>
          
          <View style={[styles.box_1, {marginTop: 20}]}>
            <Pressable onPress={register}>
              <Text style={[styles.link_text]}>Không nhận được OTP</Text>
            </Pressable>

            <Pressable onPress={register}>
              <Text style={[styles.link_text]}>Đổi số điện thoại</Text>
            </Pressable>
          </View>
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
  disabled_btn: {
    // color: Colors.BLACK,
    backgroundColor: '#fff',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: Colors.BACKGROUNDACCORDION,
    borderStyle: 'solid'
  },
  link_text: {
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.BLACK,
    textDecorationLine: 'underline',
  },
  box_1: {
    flexDirection: "row",
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }
});
export default OTP;

import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Header, Button, HeaderBg} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import {useOTP} from 'context/Common/utils';
import {useRegister} from 'context/Auth/utils';

const RegisterFailure = ({route}) => {
  const translation = useTranslation();
  const {openCallDialog} = useOTP(route?.params);
  const {onNavigate} = useRegister();

  return (
    //translate
    <>
      <HeaderBg>
        <Header back shadow={false} title={translation?.sign_up} />
      </HeaderBg>

      <ScrollView style={styles.container}>
        <View style={styles.wrap}>
          <Text style={[styles.title]} mb={20} fs="h4" bold>
            Đăng ký không thành công
          </Text>
          <Text style={styles.text} mb={40}>
            Bạn đã nhập sai OTP quá 5 lần, vui lòng quay lại sau ít phút.
          </Text>
          <Button
            label="Gọi 024 32252336"
            style={styles.btn}
            onPress={openCallDialog}
            mb={Spacing.PADDING}
          />
          <Button
            label="Quay lại sau"
            style={styles.btn}
            bg={Colors.white}
            color={Colors.black}
            border={Colors.cl4}
            onPress={onNavigate}
          />
        </View>
      </ScrollView>
    </>
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

  title: {
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 14,
  },
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default RegisterFailure;

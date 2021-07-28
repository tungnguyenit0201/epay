import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, FWLoading} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

const ForgetPassword = () => {
  let {height} = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let forgotRef = useRef({
    phone: '',
  });
  const onPress = (key, val) => {
    Navigator.navigate(SCREEN.OTP);
  };

  return (
    <ScrollView style={styles.container}>
      <Header back title="Quên mật khẩu à?" />
      <Text>Hãy chọn định mệnh của bạn:</Text>
      <Button label="Nhận mã OTP" onPress={onPress} />
      <Button
        label="Gọi 0987654321"
        onPress={() => {
          alert('Gọi xong');
        }}
      />
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
});
export default ForgetPassword;

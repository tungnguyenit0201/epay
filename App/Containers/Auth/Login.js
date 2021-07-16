import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, FWLoading} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';

const ForgotPassword = () => {
  let {height} = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let forgotRef = useRef({
    phone: '',
  });
  const onChange = (key, val) => {
    forgotRef.current[key] = val;
  };

  const onPressButton = async () => {
    Navigator.navigate('OTP');
  };
  return (
    <ScrollView style={styles.container}>
      <Header back title="Đăng nhập" />

      {!loading ? (
        <View style={styles.wrap}>
          <Text style={styles.header}>Đăng nhập</Text>
          <Text
            style={{color: Colors.GRAY, paddingBottom: Spacing.PADDING * 2}}>
            Vui lòng nhập số điện thoại của bạn để nhận mã OTP
          </Text>
          <InputBlock
            label="Số điện thoại"
            required
            onChange={value => onChange('phone', value)}
          />

          <Button label={'Gửi'} onPress={onPressButton} />
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
});
export default ForgotPassword;

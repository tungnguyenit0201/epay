import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, FWLoading} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';
import {TEXT, SCREEN} from 'configs/Constants';

const ForgotPassword = () => {
  let {height} = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let forgotRef = useRef({
    phone: '',
  });
  const onChange = (key, val) => {
    forgotRef.current[key] = val;
  };

  const onPress = async () => {
    Navigator.navigate(SCREEN.TAB_NAVIGATION);
  };
  return (
    <ScrollView style={styles.container}>
      <Header back shadow={false}/>

      <View style={styles.wrap}>
        <Text bold size={35} mb={15} style={styles.title}>Đặt mật khẩu</Text>
        <Text mb={30}>Lorem Ipsum is simply dummy text of 
          the printing and typesetting industry.</Text>
        <Password
          onChangePassword={value => onChange('newPassword', value)}
          onChangeConfirm={value => onChange('passwordConfirm', value)}
        />
        <Text>Mật khẩu k trùng khớp</Text>
        <Button mt={50} label={TEXT.CONTINUE} onPress={onPress} />
      </View>
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
  title: {
    textTransform: 'uppercase'
  }
});
export default ForgotPassword;

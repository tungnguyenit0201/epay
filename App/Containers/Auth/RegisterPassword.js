import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Text, InputBlock, Header, Button, FWLoading } from 'components';
import { Colors, Fonts, Spacing } from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';
import {TEXT, SCREEN} from 'configs/Constants';

const ForgotPassword = () => {
  let { height } = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [errors, setError] = useState("")
  let forgotRef = useRef({
    phone: '',
  });

  const validateInput = (checkingText) => {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return {
        isInputValid: true,
        errorMessage: 'done'
      };
    } else {
      return {
        isInputValid: false,
        errorMessage: 'Mật khẩu tối thiểu 8 ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, tự đặc biệt'
      };
    }
  }

  const onChange = (key, val) => {
    forgotRef.current[key] = val;
    const newPassword = forgotRef.current["newPassword"];
    const passwordConfirm = forgotRef.current["passwordConfirm"];
    if (newPassword === passwordConfirm && forgotRef.current[key]) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  };

  const onPress = async () => {
    // Navigator.navigate(SCREEN.REGISTER_NAME);
    if (validateInput(forgotRef.current.newPassword).isInputValid || forgotRef.current.newPassword === "") {
      setError("")
      Navigator.navigate(SCREEN.TAB_NAVIGATION);
    } else {
      setError(validateInput(forgotRef.current.newPassword).errorMessage)
    } 
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

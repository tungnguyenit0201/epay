import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Text, InputBlock, Header, Button, FWLoading } from 'components';
import { Colors, Fonts, Spacing } from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';
import { SCREEN } from 'configs/Constants';

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
    if (validateInput(forgotRef.current.newPassword).isInputValid || forgotRef.current.newPassword === "") {
      setError("")
      Navigator.navigate(SCREEN.TAB_NAVIGATION);
    } else {
      setError(validateInput(forgotRef.current.newPassword).errorMessage)
    } 
  };
  return (
    <ScrollView style={styles.container}>
      <Header back title="Nhập mật khẩu" />
      <View style={styles.wrap}>
        <Text style={styles.header}>Đặt mật khẩu</Text>
        <Text style={styles.textDefault}>
          {`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print`}
        </Text>
        <Password
          onChangePassword={value => onChange('newPassword', value)}
          onChangeConfirm={value => onChange('passwordConfirm', value)}
        />
        {errors ? <Text style={styles.textError}>{errors}</Text> : <Text></Text>}
        <Button
          style={styles.buttonBlock}
          label="Tiếp tục"
          labelStyle={styles.textDefault}
          onPress={onPress}
          disabled={disable}
        />
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
    fontSize: Fonts.FONT_LARGE + 16,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDefault: {
    fontSize: Fonts.FONT_MEDIUM_LARGE,
  },
  buttonBlock: {
    marginTop: Spacing.PADDING,
    paddingVertical: Fonts.FONT_LARGE
  },
  textError: {
    color: "red",
    fontSize: Fonts.FONT_MEDIUM_LARGE,
    marginBottom: Spacing.PADDING
  }
});
export default ForgotPassword;

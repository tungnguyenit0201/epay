import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Text, InputBlock, Header, Button, FWLoading } from 'components';
import { Colors, Fonts, Spacing } from 'themes';
import Navigator from 'navigations/Navigator';
import { SCREEN } from 'configs/Constants';
import { scale } from 'utils/Functions';

const ForgotPassword = () => {
  let { height } = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let [disable, setDisable] = useState(true);
  const validateInput = (checkingText) => {
    const regexp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return {
        isInputValid: true,
        errorMessage: 'done'
      };
    } else {
      return {
        isInputValid: false,
        errorMessage: 'Số điện thoại không đúng'
      };
    }
  }
  const onPress = () => {
    Navigator.navigate(SCREEN.OTP);
  };
  const handleChange = async (e) => {
    const handleText = e.trim();
    if (validateInput(handleText).isInputValid) {
      setDisable(false)
    }
    else {
      setDisable(true);
    }
  }
  return (
    <ScrollView style={styles.container}>
      <Header back title="Quên mật khẩu" />
      <View style={styles.content}>
        <Text style={styles.header}>Quên mật khẩu</Text>
        <Text style={styles.textDescription}>
          {`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print`}
        </Text>
        <InputBlock
          onChange={handleChange}
          style={styles.inputBlock}
          placeholder={'Nhập số điện thoại'}
        />
        <Button
          style={styles.buttonBlock}
          label="Tiếp tục"
          labelStyle={styles.textLable}
          onPress={onPress}
          disabled={disable}
        />
        <Text style={styles.textUnderline}>Hoặc vui lòng gọi 1900-0000</Text>
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
  /////////////////////////////
  content: {
    paddingHorizontal: Spacing.PADDING,
    paddingVertical: scale(30),
  },
  inputBlock: {
    backgroundColor: "transparent",
    borderColor: Colors.BLACK,
    fontSize: Fonts.FONT_MEDIUM_LARGE,
  },
  textDescription: {
    color: Colors.GRAY,
    fontSize: scale(14)
  },
  buttonBlock: {
    marginTop: Spacing.PADDING,
    paddingVertical: Fonts.FONT_LARGE
  },
  textLable: {
    fontSize: Fonts.FONT_MEDIUM_LARGE,
  },
  textUnderline: {
    textAlign: 'center',
    fontSize: Fonts.FONT_MEDIUM_LARGE,
    marginTop: Spacing.PADDING + 20,
    textDecorationLine: 'underline',
  }
});
export default ForgotPassword;

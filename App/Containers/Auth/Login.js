import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {Text, InputBlock, Header, Button, FWLoading} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
// import {useTranslation} from 'context/Language';

const ForgotPassword = () => {
  // const translation = useTranslation();
  let {height} = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let [disable, setDisable] = useState(true);
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
      {/* <Header back/> */}
      <View style={styles.wrap}>
        <Text style={[styles.title]} mb={20}>
          Nhập mật khẩu
        </Text>
        <Text mb={10}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <InputBlock
          onFocus={e => setDisable(false)}
          password
          placeholder="Nhập mật khẩu"
        />
        <Button
          mb={10}
          disabled={disable}
          label="Đăng nhập"
          onPress={onPress}
        />
        <Button label="Touch/Face ID" onPress={onPress} />

        <View style={[styles.box_1, {marginTop: 40}]}>
          <Pressable onPress={() => Navigator.push(SCREEN.FORGET_PASSWORD)}>
            <Text style={[styles.link_text]}>
              {/* {translation.forgot_password} */}
            </Text>
          </Pressable>

          <Pressable onPress={onPress}>
            <Text style={[styles.link_text]}>Đổi số điện thoại</Text>
          </Pressable>
        </View>
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
    paddingTop: Spacing.PADDING * 6,
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
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  link_text: {
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.BLACK,
    textDecorationLine: 'underline',
  },
  box_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
export default ForgotPassword;

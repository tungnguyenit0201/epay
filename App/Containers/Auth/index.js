import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, InputBlock} from 'components';
import {Colors, Images, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {useUser} from 'context/User';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
const Splash = () => {
  const {userInfo} = useUser();
  const {login} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: 'https://is4-ssl.mzstatic.com/image/thumb/Purple114/v4/6c/ee/02/6cee02e7-2fcc-9702-912b-1e9a8d251292/source/512x512bb.jpg',
          }}
          style={{width: '100%', height: '50%'}}
        />
        <InputBlock numeric label="Nhập số điện thoại" />
        <Button
          label={login}
          onPress={() => Navigator.navigate(SCREEN.LOGIN)}
        />
        <Button
          label="Quên mật khẩu"
          onPress={() => Navigator.navigate(SCREEN.FORGET_PASSWORD)}
        />
        <Button
          label="Đăng ký"
          onPress={() => Navigator.navigate(SCREEN.REGISTER)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  content: {
    paddingHorizontal: Spacing.PADDING,
    paddingVertical: Spacing.PADDING * 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
export default Splash;

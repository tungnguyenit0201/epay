import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, InputBlock} from 'components';
import {Colors, Images, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {useUser} from 'context/User';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import {useAuth} from 'context/User/utils';

const Auth = () => {
  const {userInfo} = useUser();
  const {onChange, onPress} = useAuth();
  // const {} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: 'https://is4-ssl.mzstatic.com/image/thumb/Purple114/v4/6c/ee/02/6cee02e7-2fcc-9702-912b-1e9a8d251292/source/512x512bb.jpg',
          }}
          style={{width: '100%', height: '50%', marginBottom: Spacing.PADDING}}
        />
        <InputBlock
          numeric
          label={'Vui lòng nhập số điện thoại'}
          onChange={onChange}
        />
        <Button label={'Tiếp tục'} onPress={onPress} />
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
    alignItems: 'center',
    flex: 1,
  },
});
export default Auth;

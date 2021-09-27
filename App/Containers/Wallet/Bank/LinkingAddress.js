import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {Button, Header, InputBlock} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import HeaderBg from 'components/Common/HeaderBg';
import {useWallet} from 'context/Wallet';
import {useUser} from 'context/User';
const LinkingAddress = ({route}) => {
  const translation = useTranslation();
  const {userInfo} = useUser();
  const bankInfo = route.params;
  return (
    <>
      <ScrollView style={[styles.container]}>
        <HeaderBg>
          <Header back title={'Nhập địa chỉ khai báo tại ngân hàng'} />
        </HeaderBg>
        <Button
          mt={30}
          onPress={() => Navigator.navigate(SCREEN.LINKING_CONFIRM)}
          label={translation.connect_now}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default LinkingAddress;

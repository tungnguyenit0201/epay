import React from 'react';
import {
  ScrollView,
  Pressable,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Text,
  Icon,
  Header,
  HeaderBg,
  ActionSheet,
  Modal,
  TextInput,
} from 'components';
import {SCREEN, PERSONAL_IC, GENDER, FUNCTION_TYPE} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

import {useUser} from 'context/User';
import {usePhone} from 'context/Auth/utils';
import {useTranslation} from 'context/Language';
import {useUserStatus, useUserInfo, useVerifyInfo} from 'context/User/utils';

const Transfer = () => {
  const {phone} = usePhone();
  const {userInfo} = useUser();
  const translation = useTranslation();

  const PersonalInfo = userInfo.personalInfo;

  return (
    <>
      <HeaderBg mb={0}>
        <Header back title="Chuyển tiền số điện thoại" />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={[styles.block]}>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <View style={styles.avatar}>
              <Image
                style={{width: 94, height: 94}}
                source={
                  PersonalInfo?.Avatar
                    ? {uri: PersonalInfo.Avatar}
                    : Images.DefaultUser
                }
                resizeMode="cover"
              />
            </View>

            <Text fs="h5" bold mb={5}>
              {PersonalInfo?.FullName}
            </Text>
            <Text mb={10}>{phone}</Text>
          </View>

          <View style={[base.boxShadow]}>
            <TextInput numeric maxLength={1} selectTextOnFocus />
          </View>
        </View>

        <View style={styles.boxBottom}>
          <Button
            //onPress={onLogout}
            type={1}
            label={translation.log_out}
            bold
          />
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  block: {
    paddingHorizontal: Spacing.PADDING,
    borderBottomColor: Colors.l2,
    borderBottomWidth: 10,
  },
  avatar: {
    overflow: 'hidden',
    height: 94,
    width: 94,
    borderRadius: 99,
    backgroundColor: Colors.g4,
  },
  boxBottom: {
    marginTop: 30,
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
    paddingBottom: scale(60),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default Transfer;

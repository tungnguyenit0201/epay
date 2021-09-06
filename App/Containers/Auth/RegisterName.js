import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, InputBlock, Header, Button, Icon, TextInput} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {useUserInfo} from 'context/User/utils';
import {scale} from 'utils/Functions';
import {values} from 'lodash';

import BigLogo from 'components/Common/Login/BigLogo';
import Content from 'components/Common/Login/Content';
const RegisterName = () => {
  let [disable, setDisable] = useState(true);
  const translation = useTranslation();
  const {onUpdatePersonalInfo, setPersonalInfo} = useUserInfo();
  return (
    <>
      <View style={styles.container}>
        <View>
          <Header
            back
            blackIcon
            style={styles.header}
            renderRightComponent={() => (
              <TouchableOpacity style={styles.pRight}>
                <Icon
                  icon={Images.Register.Info}
                  style={styles.firstIcon}
                  tintColor={Colors.BLACK}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <BigLogo />
        <Content
          title="Nhập tên"
          text={
            translation.password_for_account_security_and_transaction_confirmation_at_checkout
          }
        />

        <View style={[styles.wrap, {marginTop: 48}]}>
          <TextInput
            required
            onFocus={e => setDisable(false)}
            onChange={val => setPersonalInfo('FullName', val)}
            // onBlur={handleBlur('newPassword')}
            placeholder={translation.enter_your_name}
            // value={values}
            isDeleted
            // error={touched.passwordConfirm && errors.incorrect_password}
            // value={values.newPassword}
            // scrollViewRef={scrollViewRef}
            // leftIcon={Images.Transfer.Lock}
          />

          {/* <InputBlock
            style={[styles.input]}
            placeholder="Nhập Họ và Tên"
            onFocus={e => setDisable(false)}
            onChange={val => setPersonalInfo('FullName', val)}
          /> */}
        </View>
      </View>

      <View
        style={[
          styles.wrap,
          {
            paddingVertical: Spacing.PADDING,
            backgroundColor: Colors.BACKGROUNDCOLOR,
          },
        ]}>
        <Button
          disabled={disable}
          label={translation.done}
          style={styles.btn}
          onPress={onUpdatePersonalInfo}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  pRight: {
    position: 'absolute',
    right: 15,
  },
  firstIcon: {
    width: scale(24),
    height: scale(24),
  },
  header: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    color: Colors.BLACK,
  },
});

export default RegisterName;

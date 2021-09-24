import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors, Images} from 'themes';
import {useCommon} from 'context/Common';
import Debug from './Debug';
import {useCheckInfo, useModalSmartOTP} from 'context/Home/utils';
import {useTranslation} from 'context/Language';
import {SCREEN} from 'configs/Constants';
import {Modal, Alert, FWLoading, Button, Text} from 'components';
import {useModalPermission} from 'context/Common/utils';
import {useRegister} from 'context/Auth/utils';
const Wrapper = React.memo(
  ({
    barStyle = 'light-content',
    children,
    disableAvoidKeyboard = false,
    avoidStatusBar = false,
  }) => {
    const {loading, error} = useCommon();
    const modalSmartOTP = useModalSmartOTP();
    const {KYC, connectBank, checkInfo, onNavigate} = useCheckInfo();
    const translation = useTranslation();
    const {permissionCamera, showModalCamera, askPermission} =
      useModalPermission();
    const {setFirstLogin} = useRegister();

    return (
      // TODO: translate
      <View style={styles.flexFill}>
        <KeyboardAvoidingView
          style={styles.flexFill}
          behavior={'padding'}
          enabled={Platform.OS === 'ios' && !disableAvoidKeyboard}>
          <StatusBar
            barStyle={barStyle}
            translucent
            backgroundColor={'transparent'}
          />
          {avoidStatusBar && <View style={styles.avoidStatusBar} />}
          <View style={styles.flexFill}>{children}</View>
          {loading && <FWLoading />}
          {!!error?.errorCode && <Alert />}
          {__DEV__ && <Debug />}
          {modalSmartOTP.smartOTP && (
            <Modal
              icon={Images.Modal.Lock}
              visible={modalSmartOTP.smartOTP}
              onClose={() => setFirstLogin(false)}
              title="Nhanh và bảo mật hơn với smart OTP"
              content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
              buttonGroup={() => (
                <View style={styles.buttonGroup}>
                  <Button
                    mb={10}
                    label="Cài smart OTP ngay"
                    onPress={modalSmartOTP.onGoSmartOTP}
                  />
                  <TouchableOpacity onPress={modalSmartOTP.onPressNever}>
                    <Text style={styles.underline}>Không, cảm ơn</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={modalSmartOTP.onClose}>
                    <Text style={styles.underline}>Nhắc tôi sau</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
          {KYC && (
            <Modal
              icon={Images.Modal.UserTick}
              visible={KYC}
              onClose={() => checkInfo({value: false})}
              title={translation.notification}
              content="Cập nhật định danh để tăng cường bảo mật cho tài khoản của bạn."
              buttonGroup={() => (
                <View style={styles.buttonGroup}>
                  <Button
                    mb={10}
                    label="Định danh"
                    onPress={() => onNavigate(SCREEN.CHOOSE_IDENTITY_CARD)}
                  />
                  {/* <TouchableOpacity onPress={() => checkInfo({value: false})}>
                    <Text style={styles.underline}>Nhắc tôi sau</Text>
                  </TouchableOpacity> */}
                </View>
              )}
            />
          )}
          {connectBank && (
            <Modal
              visible={connectBank}
              onClose={() => checkInfo({value: false})}
              title={translation.notification}
              content="Liên kết ngân hàng để thực hiện giao dịch."
              buttonGroup={() => (
                <View style={styles.buttonGroup}>
                  <Button
                    mb={10}
                    label={translation.connect_now}
                    onPress={() => onNavigate(SCREEN.BANK_LINKED)}
                  />
                  <TouchableOpacity onPress={() => checkInfo({value: false})}>
                    <Text>Nhắc tôi sau</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
          {permissionCamera && (
            <Modal
              visible={permissionCamera}
              onClose={() => showModalCamera(false)}
              title={'Truy cập camera'}
              content="Epay muốn truy cập camera trên điện thoại của bạn"
              icon={Images.Modal.Camera}
              buttonGroup={() => (
                <View style={styles.buttonGroup}>
                  <Button
                    mb={10}
                    label={'Cho phép'}
                    onPress={() => askPermission()}
                  />
                  <TouchableOpacity onPress={() => showModalCamera(false)}>
                    <Text style={styles.underline}>Nhắc tôi sau</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  avoidStatusBar: {height: getStatusBarHeight()},
  buttonGroup: {
    alignItems: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default Wrapper;

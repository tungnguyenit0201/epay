import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors, Fonts, Images, Spacing} from 'themes';
import {useCommon} from 'context/Common';
import Debug from './Debug';
import {
  useCheckInfo,
  useModalSmartOTP as useModalSmartOTPSuggestion,
} from 'context/Home/utils';
import {useTranslation} from 'context/Language';
import {SCREEN} from 'configs/Constants';
import {
  Modal as ModalCustom,
  Alert,
  FWLoading,
  Button,
  Text,
  Icon,
  InputBlock,
} from 'components';
import {useModalPassword, useModalPermission} from 'context/Common/utils';
import {useRegister} from 'context/Auth/utils';
import {useModalSmartOTP as useModalSmartOTPPassword} from 'context/User/utils';
import {scale} from 'utils/Functions';
import SmartOTPInput from 'components/User/SmartOTP/SmartOTPInput';
import {Formik} from 'formik';
import {passwordSchema} from 'utils/ValidationSchemas';

const Wrapper = React.memo(
  ({
    barStyle = 'light-content',
    children,
    disableAvoidKeyboard = false,
    avoidStatusBar = false,
  }) => {
    const {loading, error} = useCommon();
    const modalSmartOTP = useModalSmartOTPSuggestion();
    const {KYC, connectBank, checkInfo, onNavigate} = useCheckInfo();
    const translation = useTranslation();
    const {permissionCamera, showModalCamera, askPermission} =
      useModalPermission();
    const {setFirstLogin} = useRegister();
    const smartOTPPassword = useModalSmartOTPPassword();
    const modalPassword = useModalPassword();

    return (
      // TODO: translate
      <View style={styles.flexFill}>
        <KeyboardAvoidingView
          style={styles.flexFill}
          behavior={'padding'}
          enabled={Platform.OS === 'ios' && !disableAvoidKeyboard}
        >
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
          {modalSmartOTP.smartOTPSuggestion && (
            <ModalCustom
              icon={Images.Modal.Lock}
              visible={modalSmartOTP.smartOTPSuggestion}
              onClose={() => setFirstLogin(false)}
              title="Nhanh và bảo mật hơn với smart OTP"
              content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
              buttonGroup={() => (
                <View style={styles.buttonGroup}>
                  <Button
                    mb={10}
                    style={styles.btn}
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
            <ModalCustom
              icon={Images.Modal.UserTick}
              visible={KYC}
              onClose={() => checkInfo({value: false})}
              title={translation.notification}
              content="Cập nhật định danh để tăng cường bảo mật cho tài khoản của bạn."
              buttonGroup={() => (
                <View style={styles.buttonGroup}>
                  <Button
                    style={styles.btn}
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
            <ModalCustom
              visible={connectBank}
              onClose={() => checkInfo({value: false})}
              title={translation.notification}
              content="Liên kết ngân hàng để thực hiện giao dịch."
              buttonGroup={() => (
                <View style={styles.buttonGroup}>
                  <Button
                    mb={10}
                    style={styles.btn}
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
            <ModalCustom
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
                    <Text>Nhắc tôi sau</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
          {smartOTPPassword.smartOTPPassword?.show && (
            <View style={styles.backdrop}>
              <Pressable
                onPress={smartOTPPassword.onHideModal}
                style={{flex: 1}}
              />
              <View style={styles.bottomModalContainer}>
                <TouchableOpacity onPress={smartOTPPassword.onHideModal}>
                  <Icon
                    icon={Images.CloseThin}
                    tintColor={Colors.black}
                    size={scale(10)}
                    style={styles.iconCloseSmartOTPPassword}
                  />
                </TouchableOpacity>
                {/* TODO: translate */}
                <Text bold style={styles.modalTitle} mb={scale(54)}>
                  Nhập mật khẩu Smart OTP hiện tại
                </Text>
                <SmartOTPInput
                  onFilled={smartOTPPassword.onCodeFilled}
                  message={smartOTPPassword.smartOTPPassword?.message}
                />
                <Text
                  mt={scale(130)}
                  style={styles.modalForgetPasswordText}
                  onPress={smartOTPPassword.onForgetSmartOTPPassword}
                >
                  {translation.forgot_password}
                </Text>
              </View>
            </View>
          )}
          {modalPassword.password?.show && (
            <View style={styles.backdrop}>
              <Pressable
                onPress={modalPassword.onHideModal}
                style={{flex: 1}}
              />
              <View style={styles.bottomModalContainer}>
                <TouchableOpacity onPress={modalPassword.onHideModal}>
                  <Icon
                    icon={Images.CloseThin}
                    tintColor={Colors.black}
                    size={scale(10)}
                    style={styles.iconCloseSmartOTPPassword}
                  />
                </TouchableOpacity>
                {/* TODO: translate */}
                <Text bold style={styles.modalTitle}>
                  Nhập mật khẩu
                </Text>
                <Formik
                  initialValues={{
                    password: '',
                  }}
                  onSubmit={modalPassword.onPasswordFilled}
                  validationSchema={passwordSchema}
                >
                  {({
                    handleChange: _handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    touched,
                    errors,
                    values,
                  }) => {
                    const handleChange = field => value => {
                      setFieldValue(field, value);
                      setFieldTouched(field, true, false);
                    };
                    return (
                      <View style={{paddingHorizontal: Spacing.PADDING}}>
                        <InputBlock
                          password
                          placeholder="Nhập mật khẩu"
                          onChange={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          autoFocus
                          error={
                            modalPassword.password?.message ||
                            (touched.password && errors.password)
                          }
                        />
                        <Button
                          mb={Spacing.PADDING}
                          label="Xác nhận"
                          onPress={handleSubmit}
                          disabled={!values.password || errors.password}
                        />
                      </View>
                    );
                  }}
                </Formik>
                <Text
                  style={styles.modalForgetPasswordText}
                  onPress={modalPassword.onForgetPassword}
                >
                  {translation.forgot_password}
                </Text>
              </View>
            </View>
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
  btn: {width: '100%'},
  backdrop: {
    backgroundColor: '#00000099',
    ...StyleSheet.absoluteFill,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomModalContainer: {
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    backgroundColor: Colors.white,
  },
  iconCloseSmartOTPPassword: {
    position: 'absolute',
    right: scale(20),
    top: Spacing.PADDING,
  },
  modalTitle: {
    marginTop: scale(36),
    textAlign: 'center',
    fontSize: Fonts.H5,
  },
  modalForgetPasswordText: {
    marginBottom: Spacing.PADDING,
    textAlign: 'center',
  },
});

export default Wrapper;

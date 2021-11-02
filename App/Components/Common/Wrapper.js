import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  BackHandler,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors, Fonts, Images, Spacing} from 'themes';
import {useCommon} from 'context/Common';
import Debug from './Debug';
import {useModalSmartOTP as useModalSmartOTPSuggestion} from 'context/Home/utils';
import {useTranslation} from 'context/Language';
import {
  Modal as ModalCustom,
  Alert,
  FWLoading,
  Button,
  Text,
  Icon,
  InputBlock,
} from 'components';
import {
  useError,
  useModalPassword,
  useModalPermission,
} from 'context/Common/utils';
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
    const translation = useTranslation();
    const {permissionCamera, showModalCamera, askPermission} =
      useModalPermission();
    const {setFirstLogin} = useRegister();
    const smartOTPPassword = useModalSmartOTPPassword();
    const modalPassword = useModalPassword();
    const {setError} = useError();

    useEffect(() => {
      modalSmartOTP.smartOTPSuggestion &&
        setError({
          title: translation.faster_and_more_secure_with_smart_otp,
          ErrorCode: -1,
          ErrorMessage:
            translation.security_method_proactively_obtains_onetime_transaction_verification_code_otp_and_automatically_enters_it_into_the_system_when_performing_online_transactions,
          onClose: () => setFirstLogin(false),
          action: [
            {
              label: translation.install_smart_otp,
              onPress: modalSmartOTP?.onGoSmartOTP,
            },
          ],
          icon: Images.Modal.Lock,
        });
    }, [modalSmartOTP?.smartOTPSuggestion]);

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandler.remove();
    }, []);
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
          {!!error?.errorMessage && <Alert />}
          <Debug />

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
                    tintColor={Colors.tp2}
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
                    tintColor={Colors.tp2}
                    size={scale(10)}
                    style={styles.iconCloseSmartOTPPassword}
                  />
                </TouchableOpacity>
                {/* TODO: translate */}
                <Text bold style={styles.modalTitle}>
                  {translation.enter_password}
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
                          placeholder={translation.enter_password}
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
    backgroundColor: Colors.bs4,
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
    backgroundColor: Colors.bs4,
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

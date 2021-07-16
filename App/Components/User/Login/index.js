import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import {Text, FWLoading} from 'components';
import Modal from 'react-native-modal';
import {Header} from 'components';
import Colors from 'themes/Colors';
import {scale} from 'utils/Functions';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';
import {Fonts, Spacing} from 'themes';

const Login = ({route}) => {
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef(null);
  const {width} = useWindowDimensions();

  const onChangeTab = value => {
    if (value === tab) {
      return;
    }
    Keyboard.dismiss();
    scrollViewRef.current.scrollTo({
      x: tab === 'login' ? width : 0,
    });
    setTab(value);
  };

  const onLoading = value => setLoading(value);

  const onDoneRegister = () => {
    onChangeTab('login');
    setMessage(
      'Bạn đã đăng ký tài khoản thành công. Vui lòng kiểm tra email hoặc số điện thoại để xác nhận tài khoản.',
    );
  };

  const onLoginFailed = () => {
    message && setMessage('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={{backgroundColor: Colors.BACKGROUNDCOLOR, flex: 1}}>
        <Header
          title="Cá nhân"
          titleStyle={styles.headerText}
          cart
          back={route?.params?.back}
        />
        {!!message && <Text style={styles.message}>{message}</Text>}
        <Tabs tab={tab} onPress={onChangeTab}></Tabs>
        <View
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}>
            <LoginTab onLoading={onLoading} onLoginFailed={onLoginFailed} />
            <RegisterTab
              onLoading={onLoading}
              onDoneRegister={onDoneRegister}
            />
          </ScrollView>
        </View>
        <Modal
          isVisible={loading}
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={{flex: 1}}
          useNativeDriver
          hideModalContentWhileAnimating
          backdropTransitionOutTiming={0}>
          <FWLoading />
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const Tabs = ({tab, onPress}) => {
  return (
    <View style={{flexDirection: 'row', backgroundColor: '#FAFAFA'}}>
      <Pressable style={styles.tabItem} onPress={() => onPress('login')}>
        <View
          style={[
            styles.tabTextWrapper,
            tab === 'login' ? styles.tabTextWrapperActive : {},
          ]}>
          <Text
            style={[
              styles.tabText,
              tab === 'login' ? styles.tabTextActive : {},
            ]}>
            Đăng nhập
          </Text>
        </View>
      </Pressable>
      {/* <View style={styles.seperator}></View> */}
      <Pressable style={styles.tabItem} onPress={() => onPress('register')}>
        <View
          style={[
            styles.tabTextWrapper,
            tab === 'register' ? styles.tabTextWrapperActive : {},
          ]}>
          <Text
            style={[
              styles.tabText,
              tab === 'register' ? styles.tabTextActive : {},
            ]}>
            Đăng ký
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: Fonts.FONT_LARGE,
    color: Colors.BLACKTEXT,
  },
  seperator: {
    width: 1,
    height: scale(35),
    backgroundColor: Colors.BORDER,
    marginTop: scale(5),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Spacing.PADDING,
  },
  tabTextWrapper: {
    borderBottomColor: Colors.PRIMARY,
  },
  tabTextWrapperActive: {
    borderBottomWidth: scale(2),
    paddingBottom: scale(20),
    width: '100%',
    alignItems: 'center',
  },
  tabText: {
    fontSize: Fonts.FONT_LARGE,
    color: Colors.GRAY,
  },
  tabTextActive: {
    fontWeight: 'bold',
    color: Colors.BLACKTEXT,
  },
  loginButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: scale(5),
    alignItems: 'center',
    marginTop: scale(13),
  },
  loginButtonText: {
    fontWeight: 'bold',
    color: Colors.BACKGROUNDCOLOR,
    marginVertical: scale(10),
  },
  forgetPassword: {
    color: Colors.ALERT,
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: scale(16),
  },
  loginSocialButton: {
    borderRadius: scale(5),
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: scale(9),
    marginTop: scale(20),
  },
  message: {
    backgroundColor: '#CEECFF',
    paddingVertical: scale(9),
    paddingHorizontal: scale(22),
    textAlign: 'center',
  },
});

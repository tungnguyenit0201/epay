import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Navigator from './Navigator';
import KeyboardStateProvider from 'utils/KeyboardStateProvider';
import {ASYNC_STORAGE_KEY, SCREEN} from 'configs/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'context/Language';
import SplashScreen from 'react-native-splash-screen';
import {Platform, Alert, Linking} from 'react-native';
import {useAsyncStorage, useConfig} from 'context/Common/utils';
import messaging from '@react-native-firebase/messaging';
import {useNotify} from 'context/User/utils';
import {useUser} from 'context/User';
import {Text} from 'components';

const Stack = createStackNavigator();

import TabNavigation from './TabNavigation';

import Language from 'containers/Language';
import Home from 'containers/Home';
import Auth from 'containers/Auth';
import Login from 'containers/Auth/Login';
import ForgetPassword from 'containers/Auth/ForgetPassword';
import RegisterPassword from 'containers/Auth/RegisterPassword';
import Policy from 'containers/Auth/Policy';
import Agreement from 'containers/Auth/Agreement';
import RegisterName from 'containers/Auth/RegisterName';
import RegisterFailure from 'containers/Auth/RegisterFailure';
import OTP from 'containers/Auth/OTP';
import SmartOTP from 'containers/User/SmartOTP';
import ActiveSmartOTP from 'containers/User/SmartOTP/ActiveSmartOTP';
import BankList from 'containers/Wallet/Bank/LinkingList';
import BankInfo from 'containers/Wallet/Bank/LinkingInfo';
import LinkingAddress from 'containers/Wallet/Bank/LinkingAddress';
import LinkingConfirm from 'containers/Wallet/Bank/LinkingConfirm';
import BankResult from 'containers/Wallet/Bank/LinkingResult';
import Notification from 'containers/Notification';
import EpaySuccess from 'containers/Notification/EpaySuccess';
import TopUp from 'containers/Wallet/TopUp';
import Withdraw from 'containers/Wallet/Withdraw';
import MyQR from 'containers/Wallet/MyQR';
import Transfer from 'containers/Wallet/Transfer';
import TrafficFee from 'containers/Service/TrafficFee';
import TrafficViolationPayment from 'containers/Service/TrafficViolationPayment';
import RegisterFee from 'containers/Service/TrafficFee/Register';
import Confirmation from 'containers/Wallet/Confirmation';
import Security from 'containers/User/Security';
import ChangePassword from 'containers/User/ChangePassword';
import UserInfo from 'containers/User/UserInfo';
import PaymentSettings from 'containers/User/PaymentSettings';
import EditInfo from 'containers/User/EditInfo';
import NewPassword from 'containers/User/NewPassword';
import Contacts from 'containers/Wallet/Contacts';
import ChooseIdentityCard from 'containers/User/VerifyInfo/ChooseIdentityCard';
import VerifyUserInfo from 'containers/User/VerifyInfo/VerifyUserInfo';
import VerifyIdentityCard from 'containers/User/VerifyInfo/VerifyIdentityCard';
import VerifyUserPortrait from 'containers/User/VerifyInfo/VerifyUserPortrait';
import VerifyEmail from 'containers/User/VerifyInfo/VerifyEmail';
import VerifySuccess from 'containers/User/VerifyInfo/VerifySuccess';
import RegionSelect from 'containers/User/RegionSelect';
import TransactionResult from 'containers/Wallet/TransactionResult';
import LanguageSetting from 'containers/User/LanguageSetting';
import MyWallet from 'containers/Home/MyWallet';
import TransferPhone from 'containers/Wallet/TransferPhone';
import AutoPayment from 'containers/User/AutoPayment';
import TransferBank from 'containers/Wallet/TransferBank';
import SmartOTPPassword from 'containers/User/SmartOTP/SmartOTPPassword';
import SmartOTPResult from 'containers/User/SmartOTP/SmartOTPResult';
import SmartOTPFailure from 'containers/User/SmartOTP/SmartOTPFailure';
import SyncSmartOTP from 'containers/User/SmartOTP/SyncSmartOTP';
import OTPBySmartOTP from 'containers/Wallet/OTPBySmartOTP';
import MapBankFlow from 'containers/Wallet/Bank/MapBankFlow';
import BankLinked from 'containers/Wallet/Bank/BankLinked';
import BankLinkKYCInfo from 'containers/Wallet/Bank/BankLinkKYCInfo';
import BankDetail from 'containers/Wallet/Bank/BankDetail';
import LimitSetting from 'containers/Wallet/LimitSetting';
import SelectMoney from 'containers/Wallet/SelectMoney';
import ForgetNewPassword from 'containers/Auth/ForgetNewPassword';
import History from 'containers/Wallet/History';
import VerifyEmailResult from 'containers/User/VerifyInfo/VerifyEmailResult';
import DetailHistory from 'containers/Wallet/History/Detail';
import BottomModal from 'containers/Modal/BottomModal';
import PopupModal from 'containers/Modal/PopupModal';
import AlertModal from 'containers/Modal/AlertModal';
import QRPay from 'containers/Wallet/QRPay';
import QRTransfer from 'containers/Wallet/QRPay/Transfer';
import TransferResults from 'containers/Wallet/QRPay/TransferResults';
import TransferSuccess from 'containers/Wallet/QRPay/TransferSuccess';
import QRPromotion from 'containers/Wallet/QRPay/Promotion';
import BankOTP from 'containers/Wallet/BankOTP';

const AppNavigator = () => {
  let initialRoute = SCREEN.AUTH;
  const {setLanguage} = useTranslation();
  const {getToken} = useAsyncStorage();
  const {onGetConfig} = useConfig();
  const isReadyRef = React.useRef(false);
  const {onPressNotify} = useNotify();
  const {dispatch} = useUser();

  const openNotificaiton = async remoteMessage => {
    const token = await getToken();

    if (isReadyRef.current) {
      if (token) onPressNotify(remoteMessage?.data);
      else {
        dispatch({
          type: 'SET_ROUTE',
          route: {
            screen: SCREEN.EPAY_SUCCESS,
            params: {data: remoteMessage?.data},
          },
        });
        Navigator.navigate(SCREEN.AUTH);
      }
    }
  };

  React.useEffect(() => {
    const getConfig = async () => {
      await onGetConfig();
    };
    getConfig();
  }, []); // eslint-disable-line

  React.useEffect(() => {
    const getCurrentLanguage = async () => {
      let currentLanguage = await AsyncStorage.getItem(
        ASYNC_STORAGE_KEY.LANGUAGE.CURRENT_LANGUAGE,
      );
      if (!currentLanguage && isReadyRef.current)
        Navigator.navigate(SCREEN.LANGUAGE);
      else setLanguage(currentLanguage);
    };

    getCurrentLanguage();
  }, [isReadyRef.current]); // eslint-disable-line

  React.useEffect(() => {
    Platform.OS == 'android' && SplashScreen.hide();
  }, []); // eslint-disable-line

  React.useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      await openNotificaiton(remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (isReadyRef.current && remoteMessage) {
          dispatch({
            type: 'SET_ROUTE',
            route: {
              screen: SCREEN.EPAY_SUCCESS,
              params: {data: remoteMessage?.data},
            },
          });
        }
      });
  }, [isReadyRef.current]); // eslint-disable-line

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage?.notification?.title,
        remoteMessage?.notification?.body,
        [
          {
            text: 'Huỷ',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Xem', onPress: () => openNotificaiton(remoteMessage)},
        ],
      );
    });

    return unsubscribe;
  }, []); // eslint-disable-line

  const modalOptions = {
    animationEnabled: true,
    cardOverlayEnabled: true,
    cardStyle: {
      backgroundColor: 'rgba(0,0,0,0.15)',
    },
    cardStyleInterpolator: ({current: {progress}}) => {
      return {
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.25],
            extrapolate: 'clamp',
          }),
        },
      };
    },
  };

  const linking = {
    prefixes: ['epay://'],
    config: {
      [SCREEN.QR_TRANSFER]: {path: ':id', parse: {id: id => `${id}`}},
    },
    // getStateFromPath: (path, options) => {
    //   console.log('path, options :> ', path, options);
    // },
    getInitialURL: async () => {
      let url = await Linking.getInitialURL();
      console.log('Linking.getInitialURL() :>> ', url);
      // Alert.alert('', url);
    },
  };
  return (
    <NavigationContainer
      ref={Navigator.setContainer}
      linking={linking}
      fallback={<Text></Text>}
      onReady={() => (isReadyRef.current = true)}
    >
      <KeyboardStateProvider>
        <Stack.Navigator
          initialRouteName={initialRoute}
          mode="modal"
          headerMode="none"
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        >
          <Stack.Screen
            name={SCREEN.MODAL_NAVIGATION}
            component={ModalNavigation}
            options={modalOptions}
          />
          <Stack.Screen
            name={SCREEN.TAB_NAVIGATION}
            component={TabNavigation}
          />
          <Stack.Screen name={SCREEN.LANGUAGE} component={Language} />
          <Stack.Screen name={SCREEN.HOME} component={Home} />
          <Stack.Screen name={SCREEN.AUTH} component={Auth} />
          <Stack.Screen name={SCREEN.LOGIN} component={Login} />
          <Stack.Screen
            name={SCREEN.FORGET_PASSWORD}
            component={ForgetPassword}
          />
          <Stack.Screen
            name={SCREEN.REGISTER_PASSWORD}
            component={RegisterPassword}
          />
          <Stack.Screen name={SCREEN.POLICY} component={Policy} />
          <Stack.Screen name={SCREEN.AGREEMENT} component={Agreement} />
          <Stack.Screen name={SCREEN.REGISTER_NAME} component={RegisterName} />
          <Stack.Screen
            name={SCREEN.REGISTER_FAILURE}
            component={RegisterFailure}
          />
          <Stack.Screen name={SCREEN.OTP} component={OTP} />
          <Stack.Screen name={SCREEN.SMART_OTP} component={SmartOTP} />
          <Stack.Screen
            name={SCREEN.ACTIVE_SMART_OTP}
            component={ActiveSmartOTP}
          />
          <Stack.Screen name={SCREEN.BANK_LIST} component={BankList} />
          <Stack.Screen name={SCREEN.BANK_INFO} component={BankInfo} />
          <Stack.Screen
            name={SCREEN.LINKING_ADDRESS}
            component={LinkingAddress}
          />
          <Stack.Screen
            name={SCREEN.LINKING_CONFIRM}
            component={LinkingConfirm}
          />
          <Stack.Screen name={SCREEN.BANK_RESULT} component={BankResult} />
          <Stack.Screen name={SCREEN.NOTIFICATION} component={Notification} />
          <Stack.Screen
            name={SCREEN.TRANSACTION_RESULT}
            component={TransactionResult}
          />
          <Stack.Screen name={SCREEN.EPAY_SUCCESS} component={EpaySuccess} />
          <Stack.Screen name={SCREEN.TOP_UP} component={TopUp} />
          <Stack.Screen name={SCREEN.WITHDRAW} component={Withdraw} />
          <Stack.Screen name={SCREEN.MY_QR} component={MyQR} />
          <Stack.Screen name={SCREEN.TRANSFER} component={Transfer} />
          <Stack.Screen
            name={SCREEN.TRANSFER_RESULTS}
            component={TransferResults}
          />
          <Stack.Screen
            name={SCREEN.TRANSFER_SUCCESS}
            component={TransferSuccess}
          />
          <Stack.Screen name={SCREEN.TRAFFIC_FEE} component={TrafficFee} />
          <Stack.Screen
            name={SCREEN.TRAFFIC_REGISTER}
            component={RegisterFee}
          />
          <Stack.Screen name={SCREEN.CONFIRMATION} component={Confirmation} />
          <Stack.Screen name={SCREEN.SECURITY} component={Security} />
          <Stack.Screen name={SCREEN.USER_INFO} component={UserInfo} />
          <Stack.Screen name={SCREEN.EDIT_INFO} component={EditInfo} />
          <Stack.Screen name={SCREEN.NEW_PASSWORD} component={NewPassword} />
          <Stack.Screen
            name={SCREEN.PAYMENT_SETTINGS}
            component={PaymentSettings}
          />
          <Stack.Screen
            name={SCREEN.CHANGE_PASSWORD}
            component={ChangePassword}
          />
          <Stack.Screen
            name="TrafficViolationPayment"
            component={TrafficViolationPayment}
          />
          <Stack.Screen name={SCREEN.CONTACTS} component={Contacts} />
          <Stack.Screen
            name={SCREEN.CHOOSE_IDENTITY_CARD}
            component={ChooseIdentityCard}
          />
          <Stack.Screen
            name={SCREEN.VERIFY_USER_INFO}
            component={VerifyUserInfo}
          />
          <Stack.Screen
            name={SCREEN.VERIFY_IDENTITY_CARD}
            component={VerifyIdentityCard}
          />
          <Stack.Screen
            name={SCREEN.VERIFY_USER_PORTRAIT}
            component={VerifyUserPortrait}
          />
          <Stack.Screen name={SCREEN.VERIFY_EMAIL} component={VerifyEmail} />
          <Stack.Screen
            name={SCREEN.VERIFY_SUCCESS}
            component={VerifySuccess}
          />
          <Stack.Screen name={SCREEN.REGION_SELECT} component={RegionSelect} />
          <Stack.Screen
            name={SCREEN.LANGUAGE_SETTING}
            component={LanguageSetting}
          />
          <Stack.Screen name={SCREEN.MY_WALLET} component={MyWallet} />
          <Stack.Screen
            name={SCREEN.TRANSFER_PHONE}
            component={TransferPhone}
          />
          <Stack.Screen name={SCREEN.AUTOPAYMENT} component={AutoPayment} />
          <Stack.Screen name={SCREEN.TRANSFER_BANK} component={TransferBank} />
          <Stack.Screen
            name={SCREEN.SMART_OTP_PASSWORD}
            component={SmartOTPPassword}
          />
          <Stack.Screen
            name={SCREEN.SMART_OTP_RESULT}
            component={SmartOTPResult}
          />
          <Stack.Screen name={SCREEN.MAP_BANK_FLOW} component={MapBankFlow} />
          <Stack.Screen
            name={SCREEN.BANK_KYC_SCREEN}
            component={BankLinkKYCInfo}
          />
          <Stack.Screen name={SCREEN.BANK_DETAIL} component={BankDetail} />
          <Stack.Screen name={SCREEN.LIMIT_SETTING} component={LimitSetting} />
          <Stack.Screen
            name={SCREEN.SMART_OTP_FAILURE}
            component={SmartOTPFailure}
          />
          <Stack.Screen name={SCREEN.SYNC_SMART_OTP} component={SyncSmartOTP} />
          <Stack.Screen name={SCREEN.SELECT_MONEY} component={SelectMoney} />
          <Stack.Screen
            name={SCREEN.OTP_BY_SMART_OTP}
            component={OTPBySmartOTP}
          />
          <Stack.Screen
            name={SCREEN.FORGET_NEW_PASSWORD}
            component={ForgetNewPassword}
          />
          <Stack.Screen name={SCREEN.HISTORY} component={History} />
          <Stack.Screen
            name={SCREEN.VERIFY_EMAIL_RESULT}
            component={VerifyEmailResult}
          />
          <Stack.Screen
            name={SCREEN.DETAIL_HISTORY}
            component={DetailHistory}
          />
          <Stack.Screen name={SCREEN.QRPAY} component={QRPay} />
          <Stack.Screen name={SCREEN.QR_TRANSFER} component={QRTransfer} />
          <Stack.Screen name={SCREEN.QR_PROMOTION} component={QRPromotion} />
          <Stack.Screen name={SCREEN.BANK_OTP} component={BankOTP} />
        </Stack.Navigator>
      </KeyboardStateProvider>
    </NavigationContainer>
  );
};

const ModalNavigation = () => {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
          opacity: 0.99,
        },
      }}
    >
      <Stack.Screen name={SCREEN.ALERT_MODAL} component={AlertModal} />
      <Stack.Screen name={SCREEN.POPUP_MODAL} component={PopupModal} />
      <Stack.Screen name={SCREEN.BOTTOM_MODAL} component={BottomModal} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

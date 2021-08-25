import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Navigator from './Navigator';
import KeyboardStateProvider from 'utils/KeyboardStateProvider';
import {SCREEN} from 'configs/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'context/Language';

const Stack = createStackNavigator();

import TabNavigation from './TabNavigation';

import Home from 'containers/Home';
import Auth from 'containers/Auth';
import Login from 'containers/Auth/Login';
import Register from 'containers/Auth/Register';
import ForgetPassword from 'containers/Auth/ForgetPassword';
import RegisterPassword from 'containers/Auth/RegisterPassword';
import RegisterName from 'containers/Auth/RegisterName';
import OTP from 'containers/Auth/OTP';
import SmartOTP from 'containers/User/SmartOTP';
import ActiveOTP from 'containers/User/ActiveOTP';
import BankList from 'containers/Wallet/Bank/BankList';
import BankInfo from 'containers/Wallet/Bank/BankInfo';
import BankResult from 'containers/Wallet/Bank/BankResult';
import Notification from 'containers/Notification';
import TransactionSuccess from 'containers/Notification/TransactionSuccess';
import EpaySuccess from 'containers/Notification/EpaySuccess';
import TopUp from 'containers/Wallet/TopUp';
import Withdraw from 'containers/Wallet/Withdraw';
import QRPay from 'containers/Wallet/QRPay';
import Transfer from 'containers/Wallet/Transfer';
import TrafficFee from 'containers/Service/TrafficFee';
import TrafficViolationPayment from 'containers/Service/TrafficViolationPayment';
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
import RegionSelect from 'containers/User/RegionSelect';
import CheckoutFailure from 'containers/Wallet/CheckoutFailure';
import CheckoutSuccess from 'containers/Wallet/CheckoutSuccess';
import LanguageSetting from 'containers/User/LanguageSetting';
import MyWallet from 'containers/Home/MyWallet';
import TransferPhone from 'containers/Wallet/TransferPhone';
import AutoPayment from 'containers/User/AutoPayment';
import TransferBank from 'containers/Wallet/TransferBank';
import BankLinked from 'containers/Wallet/Bank/BankLinked';
import BankDetail from 'containers/Wallet/Bank/BankDetail';
import LimitSetting from 'containers/Wallet/LimitSetting';
const AppNavigator = () => {
  const initialRoute = SCREEN.AUTH;
  const {setLanguage} = useTranslation();

  const getCurrentLanguage = async () => {
    let currentLanguage = await AsyncStorage.getItem('currentLanguage');
    setLanguage(currentLanguage ? currentLanguage : 'vi');
  };
  React.useEffect(() => {
    getCurrentLanguage();
  }, []);
  return (
    <NavigationContainer ref={Navigator.setContainer}>
      <KeyboardStateProvider>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}>
          <Stack.Screen
            name={SCREEN.TAB_NAVIGATION}
            component={TabNavigation}
          />
          <Stack.Screen name={SCREEN.HOME} component={Home} />
          <Stack.Screen name={SCREEN.AUTH} component={Auth} />
          <Stack.Screen name={SCREEN.LOGIN} component={Login} />
          <Stack.Screen name={SCREEN.REGISTER} component={Register} />
          <Stack.Screen
            name={SCREEN.FORGET_PASSWORD}
            component={ForgetPassword}
          />
          <Stack.Screen
            name={SCREEN.REGISTER_PASSWORD}
            component={RegisterPassword}
          />
          <Stack.Screen name={SCREEN.REGISTER_NAME} component={RegisterName} />
          <Stack.Screen name={SCREEN.OTP} component={OTP} />
          <Stack.Screen name={SCREEN.SMART_OTP} component={SmartOTP} />
          <Stack.Screen name={SCREEN.ACTIVE_OTP} component={ActiveOTP} />
          <Stack.Screen name={SCREEN.BANK_LIST} component={BankList} />
          <Stack.Screen name={SCREEN.BANK_INFO} component={BankInfo} />
          <Stack.Screen name={SCREEN.BANK_RESULT} component={BankResult} />
          <Stack.Screen name={SCREEN.NOTIFICATION} component={Notification} />
          <Stack.Screen
            name={SCREEN.TRANSACTION_SUCCESS}
            component={TransactionSuccess}
          />
          <Stack.Screen name={SCREEN.EPAY_SUCCESS} component={EpaySuccess} />
          <Stack.Screen name={SCREEN.TOP_UP} component={TopUp} />
          <Stack.Screen name={SCREEN.WITHDRAW} component={Withdraw} />
          <Stack.Screen name={SCREEN.QRPAY} component={QRPay} />
          <Stack.Screen name={SCREEN.TRANSFER} component={Transfer} />
          <Stack.Screen name={SCREEN.TRAFFIC_FEE} component={TrafficFee} />
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
            name={SCREEN.CHECKOUT_FAILURE}
            component={CheckoutFailure}
          />
          <Stack.Screen
            name={SCREEN.CHECKOUT_SUCCESS}
            component={CheckoutSuccess}
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
          <Stack.Screen name={SCREEN.BANK_LINKED} component={BankLinked} />
          <Stack.Screen name={SCREEN.BANK_DETAIL} component={BankDetail} />
          <Stack.Screen name={SCREEN.LIMIT_SETTING} component={LimitSetting} />
        </Stack.Navigator>
      </KeyboardStateProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;

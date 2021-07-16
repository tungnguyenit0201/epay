import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Navigator from './Navigator';
import KeyboardStateProvider from 'utils/KeyboardStateProvider';

const Stack = createStackNavigator();

import TabNavigation from './TabNavigation';

import Home from 'containers/Home';
import Auth from 'containers/Auth';
import Login from 'containers/Auth/Login';
import OTP from 'containers/Auth/OTP';
import Bank from 'containers/Bank';
import Notification from 'containers/Notification';
import TopUp from 'containers/TopUp';
import Withdraw from 'containers/Withdraw';
import QRPay from 'containers/QRPay';
import Transfer from 'containers/Transfer';
import TrafficFee from 'containers/Service/TrafficFee';
import TrafficViolationPayment from 'containers/Service/TrafficViolationPayment';

const AppNavigator = () => {
  const initialRoute = 'Auth';

  return (
    <NavigationContainer ref={Navigator.setContainer}>
      <KeyboardStateProvider>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="Bank" component={Bank} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="TopUp" component={TopUp} />
          <Stack.Screen name="Withdraw" component={Withdraw} />
          <Stack.Screen name="QRPay" component={QRPay} />
          <Stack.Screen name="Transfer" component={Transfer} />
          <Stack.Screen name="TrafficFee" component={TrafficFee} />
          <Stack.Screen
            name="TrafficViolationPayment"
            component={TrafficViolationPayment}
          />
        </Stack.Navigator>
      </KeyboardStateProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;

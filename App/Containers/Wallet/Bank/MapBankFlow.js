import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import BankDetail from './BankDetail';
import BankLinked from './BankLinked';
import BankPickerScreen from './BankPickerScreen';
import BankLinkResult from './BankLinkResult';
import BankLinkKYCInfo from './BankLinkKYCInfo';
import BankLinkConfirm from './BankLinkConfirm';
import BankLinkInfo from './BankLinkInfo';
const Stack = createNativeStackNavigator();

const MapBankFlow = () => {
  return (
    <Stack.Navigator
      initialRouteName={MapBankRoutes.BankLinked}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={MapBankRoutes.BankLinked}
        component={BankLinked}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={MapBankRoutes.BankDetail}
        component={BankDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={MapBankRoutes.BankPickerScreen}
        component={BankPickerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={MapBankRoutes.BankLinkInfo}
        component={BankLinkInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={MapBankRoutes.BankLinkKYCInfo}
        component={BankLinkKYCInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={MapBankRoutes.BankLinkConfirm}
        component={BankLinkConfirm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={MapBankRoutes.BankLinkResult}
        component={BankLinkResult}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MapBankFlow;
export const MapBankRoutes = {
  BankLinked: 'BankLinked',
  BankDetail: 'BankDetail',
  BankPickerScreen: 'BankPickerScreen',
  BankLinkKYCInfo: 'BankLinkKYCInfo',
  BankLinkConfirm: 'BankLinkConfirm',
  BankLinkResult: 'BankLinkResult',
  BankLinkInfo: 'BankLinkInfo',
};

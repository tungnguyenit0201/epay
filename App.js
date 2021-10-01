import React, {useState, useEffect} from 'react';
import Navigation from 'navigations';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserProvider} from 'App/Context/User';
import {WalletProvider} from 'App/Context/Wallet';
import {CommonProvider} from 'App/Context/Common';
import {LanguageProvider} from 'App/Context/Language';
import {Wrapper} from 'components';
import messaging from '@react-native-firebase/messaging';
import {Platform, Alert} from 'react-native';
import {ASYNC_STORAGE_KEY} from 'configs/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Storybook from './storybook';
// import {MODE} from '@env';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  const saveTokenToDatabase = async token => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY.USER.PUSH_TOKEN, token);
  };

  const getFcmToken = async () => {
    let token = await messaging().getToken();
    if (token) return saveTokenToDatabase(token);
  };

  useEffect(() => {
    const requestUserPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (
        authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        getFcmToken();
      }
    };
    requestUserPermission();

    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []); // eslint-disable-line

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CommonProvider>
          <UserProvider>
            <WalletProvider>
              <Wrapper>
                <Navigation />
              </Wrapper>
            </WalletProvider>
          </UserProvider>
        </CommonProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

// __DEV__ && console.log('Running app with mode:', MODE);
// const route = MODE === 'storybook' ? Storybook : App;
export default App;

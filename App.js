import React, {useState, useEffect} from 'react';
import Navigation from 'navigations';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserProvider} from 'App/Context/User';
import {WalletProvider} from 'App/Context/Wallet';
import {CommonProvider} from 'App/Context/Common';
import {LanguageProvider} from 'App/Context/Language';
import {Wrapper} from 'components';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Platform, Alert} from 'react-native';
// import Storybook from './storybook';
// import {MODE} from '@env';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  const saveTokenToDatabase = async token => {
    // Assume user is already signed in
    const userId = auth().currentUser.uid;
    console.log('userId :>> ', userId);
    // Add the token to the users datastore
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        tokens: firestore.FieldValue.arrayUnion(token),
      });
  };

  const getFcmToken = async () => {
    let token = await messaging().getToken();
    console.log('token :>> ', token);
    // if (token) return saveTokenToDatabase(token);
  };

  useEffect(() => {
    // Get the device token

    const requestUserPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      // const x = await messaging().registerDeviceForRemoteMessages();
      if (
        authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('Permission status:', authorizationStatus);

        getFcmToken();
      }
    };
    requestUserPermission();
    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('message :>> ', remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
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

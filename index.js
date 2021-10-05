import 'react-native-gesture-handler';
import 'configs/AppConfig';

import {AppRegistry, LogBox, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {enableScreens} from 'react-native-screens';

LogBox.ignoreLogs(['threshold of 32ms', 'directly use the ref instead']);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

//Setup for run node core module running in react native
//TODO: Move to setup file
import 'react-native-get-random-values';
global.Buffer = require('buffer').Buffer;

Platform.OS === 'android' && enableScreens(false);

AppRegistry.registerComponent(appName, () => App);

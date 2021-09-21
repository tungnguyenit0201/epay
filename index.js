import 'react-native-gesture-handler';
import 'configs/AppConfig';

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreLogs(['threshold of 32ms', 'directly use the ref instead']);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

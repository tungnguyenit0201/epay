import 'react-native-gesture-handler';
import 'configs/AppConfig';

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['threshold of 32ms', 'directly use the ref instead']);

AppRegistry.registerComponent(appName, () => App);

import {createMigrate} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const migrations = {
  21022801: ({_persist}) => {
    return {_persist};
  },
};

const REDUX_PERSIST = {
  key: 'root',
  version: 21020401,
  storage: AsyncStorage,
  // whitelist: ['user', '_persist'],
  whitelist: ['user', 'cart'],
  // whitelist: [],
  debug: __DEV__,
  migrate: createMigrate(migrations, {debug: __DEV__}),
};

export default REDUX_PERSIST;

module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'react-native/no-color-literals': 2,
    'react-native/no-unused-styles': 2,
  },
};

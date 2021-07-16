import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const triggerHaptic = (type = 'impactMedium', options = {}) => {
  ReactNativeHapticFeedback.trigger(type, {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
    ...options
  });
};

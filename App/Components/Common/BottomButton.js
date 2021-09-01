import React from 'react';
import {Pressable, Image, View} from 'react-native';
import {Colors} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from './Text';

import {KeyboardContext} from 'utils/KeyboardStateProvider';

export default ({
  onPress,
  label,
  icon,
  backgroundColor = Colors.cl1,
  mt,
  mb,
  ml,
  mr,
  mh,
  mv,
  flex = null,
  style,
}) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <KeyboardContext.Consumer>
      {isKeyboardShown => (
        <Pressable
          onPress={onPress}
          style={[
            {
              flex,
              backgroundColor,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 19,
              paddingBottom: (isKeyboardShown ? 0 : bottom / 2) + 19,
              paddingHorizontal: 19,
              marginTop: mt || mv,
              marginBottom: mb || mv,
              marginLeft: ml || mh,
              marginRight: mr || mh,
            },
            style,
          ]}>
          {!!icon && (
            <Image
              source={icon}
              style={{
                width: 20,
                height: 20,
                tintColor: Colors.white,
                marginRight: 9,
              }}
              resizeMode={'contain'}
            />
          )}
          <Text centered semibold color={Colors.white}>
            {label}
          </Text>
        </Pressable>
      )}
    </KeyboardContext.Consumer>
  );
};

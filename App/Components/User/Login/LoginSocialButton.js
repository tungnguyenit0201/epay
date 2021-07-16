import React from 'react';
import {StyleSheet, View, Pressable, Image} from 'react-native';
import {Text, TextInput} from 'components';
import {scale} from 'utils/Functions';

const LoginSocialButton = ({title, image, color, onPress}) => {
  return (
    <Pressable
      style={[styles.loginSocialButton, {borderColor: color}]}
      onPress={onPress}>
      <View
        style={{
          position: 'absolute',
          left: scale(13),
          top: 0,
          bottom: 0,
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: scale(24),
            height: scale(24),
          }}
          source={image}></Image>
      </View>
      <Text style={{color}}>{title}</Text>
    </Pressable>
  );
};

export default LoginSocialButton;

const styles = StyleSheet.create({
  loginSocialButton: {
    borderRadius: scale(5),
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: scale(9),
    marginTop: scale(20),
  },
});

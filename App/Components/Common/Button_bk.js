import React from 'react';
import {Pressable, Image, StyleSheet} from 'react-native';
import {Colors} from 'themes';
import {scale} from 'utils/Functions';
import Text from './Text';
import {useSelector} from 'react-redux';

export default ({
  onPress,
  label,
  lableColor = Colors.bs4,
  icon,
  backgroundColor = Colors.tp2,
  mt,
  mb,
  ml,
  mr,
  mh,
  mv,
  flex = null,
  disabled,
  style,
  labelStyle,
  mode = 'contained', //text, outlined, contained
  className = 'button-primary',
}) => {
  let textColor = mode == 'contained' ? lableColor : Colors.tp2;
  let tintColor = mode == 'contained' ? Colors.bs4 : Colors.tp2;
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          flex,
          backgroundColor: disabled ? Colors.tp3 : backgroundColor,
          marginTop: mt || mv,
          marginBottom: mb || mv,
          marginLeft: ml || mh,
          marginRight: mr || mh,
        },
        styles.button,
        style,
        mode == 'text' && styles.textButton,
        mode == 'outlined' && styles.outlinedButton,
      ]}
    >
      <Text centered semibold color={textColor} style={labelStyle}>
        {typeof label == 'function' ? label() : label}
      </Text>
      {!!icon && (
        <Image
          source={icon}
          style={[styles.image, tintColor]}
          resizeMode={'contain'}
        />
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    paddingHorizontal: 19,
    borderRadius: 5,
  },
  textButton: {backgroundColor: Colors.bs4},
  outlinedButton: {
    borderColor: Colors.tp3,
    borderWidth: 1,
    backgroundColor: Colors.bs4,
  },
  image: {
    width: scale(15),
    height: scale(15),
    marginRight: scale(9),
  },
  // ...stylesCss,
});

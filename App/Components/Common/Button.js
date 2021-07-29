import React from 'react';
import {Pressable, Image, StyleSheet, View} from 'react-native';
import {Colors, Var} from 'themes';
import {scale} from 'utils/Functions';
import Text from './Text';
import {useSelector} from 'react-redux';


export default ({
  onPress,
  label,
  icon,
  border,
  color,
  bg,
  radius,
  fs,
  size,
  mt,mb,ml,mr,mh,mv,
  disabled,
  style,

}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        border    && { borderColor: border, borderWidth: 1},
        radius    && { borderRadius: radius},
        bg        && { backgroundColor: bg},
        mt        && { marginTop: mt},
        mb        && { marginBottom: mb},
        ml        && { marginLeft: ml},
        mr        && { marginRight: mr},
        mv        && { marginVertical: mv},
        mh        && { marginHorizontal: mh},
        size == 'sm'  ? styles.sm:'' ,
        size == 'lg'  ? styles.lg:'' ,
        size == 'xl'  ? styles.xl:'' ,
        style,
        disabled  && { backgroundColor: Colors.g4},
      ]}>

      <Text centered semibold  
        style={[
          fs    && { fontSize: fs},
          {
            color: color ? color : '#fff',
          },
        ]}>
        {label}
      </Text>
      {!!icon && (
        <Image
          source={icon}
          style={[styles.image]}
          resizeMode={'contain'}
        />
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor : Colors.cl1,
  },
  sm: {paddingVertical: 5},
  lg: {paddingVertical: 20},
  xl: {paddingVertical: 30},

  image: {
    width: scale(15),
    height: scale(15),
    marginRight: scale(9),
  },
  // ...stylesCss,
});

{/* <Button
  label="Đăng ký" 
  border='#fff'
  color='#f00'
  bg='#999'
  radius={50}
  style={[{marginTop:30}]}
  onPress={() => Navigator.navigate(SCREEN.REGISTER)}
/> */}
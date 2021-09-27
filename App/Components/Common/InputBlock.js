import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import { Icon, Text, TextInput } from 'components';
import { Colors, Images, Spacing } from 'themes';
import { scale } from 'utils/Functions';
import { ColorSwatch } from 'react-native-ui-lib';

const InputBlock = ({
  label,
  password,
  email,
  numeric,
  error,
  value,
  required,
  onChange,
  onFocus,
  onBlur,
  rightIcon,
  rightIconBgGray,
  isSelect,
  onPress,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const positionRef = useRef(0);

  const _onFocus = event => {
    setIsFocused(true);
    onFocus && onFocus(event);
  };

  const _onBlur = event => {
    setIsFocused(false);
    onBlur && onBlur(event);
  };

  return (
    <View>
      <Text style={styles.inputLabel}>
        {label} {required && <Text color={'red'}>* </Text>}
      </Text>
      {!isSelect ? (
        <TextInput
          textContentType={'oneTimeCode'}
          style={[
            styles.input,
            { borderColor: isFocused ? Colors.cl1 : Colors.BORDER },
            inputStyle,
          ]}
          placeholderTextColor={Colors.l5}
          password={password && !showPassword}
          email={email}
          numeric={numeric}
          error={error}
          value={value}
          required={required}
          onChange={onChange}
          onFocus={_onFocus}
          onBlur={_onBlur}
          {...props}
        />
      ) : (
        <>
          <TouchableOpacity
            style={[styles.select, !!error && styles.error]}
            onPress={onPress}>
            <Text style={{ color: Colors.TEXT }}>
              {value ? value : props?.defaultValue}
            </Text>
          </TouchableOpacity>
          {!!error && (
            <Text color={Colors.ALERT} mt={3} size={scale(12)}>
              {error}
            </Text>
          )}
        </>
      )}
      {rightIcon && (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.absolute, styles.top1, styles.right1]}>
          <Icon icon={rightIcon} resizeMode="contain" tintColor={Colors.gray} />
        </TouchableOpacity>
      )}
      {rightIconBgGray && (
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.h1,
            styles.justifyCenter,
            styles.alignCenter,
            styles.w1,
            styles.bgGray,
            styles.absolute,
            styles.top2,
            styles.rightZero,
            styles.botRadius1,
            styles.topRadius1,
          ]}>
          <Image
            source={rightIconBgGray}
            resizeMode="contain"
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      )}
      {!!password && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={[styles.absolute, styles.top1, styles.right1]}>
          <Image
            source={showPassword ? Images.Eye : Images.EyeGray}
            style={[styles.w2, styles.h2]}
            resizeMode="contain"
          />
        </Pressable>
      )}
    </View>
  );
};

export default InputBlock;

const styles = StyleSheet.create({
  input: { backgroundColor: Colors.BACKGROUNDCOLOR },
  //---------------
  absolute: { position: 'absolute' },
  rightZero: { right: 0 },
  //----------------
  top1: { top: scale(45) },
  top2: { top: scale(35) },
  //----------------
  right1: { right: scale(10) },
  //----------------
  w1: { width: 48 },
  w2: { width: scale(20) },
  //----------------
  h1: { height: scale(48) },
  h2: { height: scale(20) },
  //----------------
  justifyCenter: { justifyContent: 'center' },
  alignCenter: { alignItems: 'center' },
  //----------------
  bgGray: { backgroundColor: Colors.l4 },
  //----------------
  topRadius1: { borderTopRightRadius: 8 },
  //----------------
  botRadius1: { borderBottomRightRadius: 8 },
  //----------------
  inputLabel: {
    marginTop: scale(5),
    marginBottom: scale(10),
  },
  select: {
    paddingHorizontal: Spacing.PADDING / 2,
    paddingVertical: scale(10),
    marginBottom: scale(10),
    height: scale(48),
    borderColor: Colors.cl4,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    borderColor: Colors.ALERT,
    borderWidth: 1,
  },
  rightIcon: {
    width: 16,
    height: 16,
  },
});

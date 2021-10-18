import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {Icon, Text, TextInput} from 'components';
import {Colors, Images, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import {ColorSwatch} from 'react-native-ui-lib';

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
            {borderColor: isFocused ? Colors.cl1 : Colors.BORDER},
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
        <View style={styles.mb1}>
          <TouchableOpacity
            style={[styles.select, !!error && styles.error]}
            onPress={onPress}>
            <Text style={{color: Colors.TEXT}}>
              {value ? value : props?.defaultValue}
            </Text>
          </TouchableOpacity>
          {rightIconBgGray && (
            <TouchableOpacity
              onPress={onPress}
              style={[styles.blockArrowRight, styles.pos1]}>
              <Image
                source={rightIconBgGray}
                resizeMode="contain"
                style={styles.rightIcon}
              />
            </TouchableOpacity>
          )}
          {!!error && (
            <Text color={Colors.ALERT} mt={3} size={scale(12)}>
              {error}
            </Text>
          )}
        </View>
      )}
      {rightIcon && (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.absolute, styles.top1, styles.right1]}>
          <Icon icon={rightIcon} resizeMode="contain" tintColor={Colors.gray} />
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
  input: {backgroundColor: Colors.BACKGROUNDCOLOR},
  //---------------
  absolute: {position: 'absolute'},
  //----------------
  top1: {top: scale(45)},
  //----------------
  right1: {right: scale(10)},
  //----------------
  w2: {width: scale(20)},
  //----------------
  h2: {height: scale(20)},
  //----------------
  mb1: {marginBottom: scale(10)},
  //----------------
  pos1: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  //----------------
  inputLabel: {
    marginTop: scale(5),
    marginBottom: scale(10),
  },
  select: {
    paddingHorizontal: Spacing.PADDING / 2,
    paddingVertical: scale(10),
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
  //---------------
  blockArrowRight: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    backgroundColor: Colors.l4,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

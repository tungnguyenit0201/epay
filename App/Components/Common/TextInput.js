import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'components';
import {Colors, Fonts, Images, Spacing} from 'themes';
import Text from './Text';
import {View} from 'react-native-ui-lib';
import {scale} from 'utils/Functions';

export default React.forwardRef(
  (
    {
      placeholder,
      onChange,
      style,
      email,
      password,
      numeric,
      phone,
      marginBottom = scale(10),
      error,
      showErrorLabel = true,
      errorStyle,
      label,
      required,
      rightComponent,
      placeholderTextColor,
      autoCompleteType = 'off',
      textContentType = 'none',
      isDeleted,
      leftIcon,
      alphanumeric,
      regex,
      value,
      trimOnBlur,
      onBlur,
      textStyle,
      ...props
    },
    ref,
  ) => {
    const keyboardType = email
      ? 'email-address'
      : numeric
      ? 'number-pad'
      : phone
      ? 'phone-pad'
      : 'default';

    const [showPassword, setShowPassword] = useState(false);

    const onChangeText = text => {
      if (alphanumeric) {
        const regexForNonAlphaNum = new RegExp(/[^\p{L}\p{N} ]+/gu);
        onChange?.(text.replace(regexForNonAlphaNum, ''));
      } else {
        const regexValid = new RegExp(regex).test(text);
        regexValid && onChange?.(text);
      }
    };

    return (
      <>
        <View row spread centerV>
          <View>
            {!!label && (
              <Text medium mb={scale(10)}>
                {required && <Text color={'red'}>* </Text>}
                {label}
              </Text>
            )}
          </View>
          {rightComponent}
        </View>

        <View>
          {Boolean(leftIcon) && (
            <View
              style={[
                styles.icon_lock,
                {
                  position: 'absolute',
                  top: 14,
                  left: 14,
                },
              ]}>
              <Image source={leftIcon} style={styles.icon_lock_img} />
            </View>
          )}

          <View
            style={[
              styles.inputContainer,
              error && [styles.error, errorStyle],
              Boolean(leftIcon) && {paddingLeft: 50},
              (isDeleted || password) && {paddingRight: Spacing.PADDING * 2},
              style,
            ]}>
            <TextInput
              ref={ref}
              autoCapitalize={'none'}
              autoFocus={false}
              // autoCorrect={false}
              autoCompleteType={autoCompleteType}
              textContentType={textContentType}
              importantForAutofill={'yes'}
              placeholder={placeholder}
              style={[styles.textStyle, textStyle, errorStyle]}
              placeholderTextColor={placeholderTextColor || Colors.BOTTOMBORDER}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              secureTextEntry={password && !showPassword}
              value={value}
              onBlur={event => {
                if (value && trimOnBlur) {
                  onChangeText?.(value.trim?.());
                }
                onBlur?.(event);
              }}
              {...props}
            />
          </View>
          {!!password && (
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: scale(12),
                top: scale(12),
              }}>
              <Image
                source={showPassword ? Images.Eye : Images.EyeGray}
                style={{width: scale(20), height: scale(20)}}
                resizeMode="contain"
              />
            </Pressable>
          )}

          {Boolean(isDeleted) && (
            <TouchableOpacity
              onPress={() => onChange('')}
              style={{
                position: 'absolute',
                right: 15,
                top: 14,
              }}>
              <Icon
                icon={Images.Transfer.CloseCircle}
                style={{
                  width: scale(17),
                  height: scale(17),
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        {!!error && showErrorLabel && (
          <Text color={Colors.ALERT} mt={3} size={scale(12)}>
            {error}
          </Text>
        )}
        <View style={{marginBottom}} />
      </>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(2),
    height: 48,
    borderRadius: scale(8),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.cl4,
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.TEXT,
    fontSize: Fonts.FONT_MEDIUM,
  },
  error: {
    borderColor: Colors.ALERT,
    borderWidth: 1,
  },
  icon_lock: {
    paddingRight: 10,
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    borderColor: Colors.GRAY,
    zIndex: 1,
  },
  icon_lock_img: {
    width: 17,
    height: 17,
  },
});

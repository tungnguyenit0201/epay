import React, {useState, useCallback} from 'react';
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
import _ from 'lodash';

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
      disableSpace,
      name,
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
      autoHeight,
      ...props
    },
    ref,
  ) => {
    const keyboardType = email
      ? 'email-address'
      : numeric
      ? 'numeric'
      : phone
      ? 'phone-pad'
      : 'default';

    const [showPassword, setShowPassword] = useState(false);

    const onChangeText = text => {
      if (!!phone && text[0] !== '0') return;
      if (!!disableSpace && text[text.length - 1] === ' ') return;
      if (alphanumeric) {
        const regexForNonAlphaNum = new RegExp(/[^\p{L}\p{N} ]+/gu);
        onChange?.(text.replace(regexForNonAlphaNum, ''));
      } else {
        const regexValid = new RegExp(regex).test(text);
        if (regexValid && regex) {
          const regexText = new RegExp(regex);
          onChange?.(text?.replace(regexText, ''));
        } else {
          if (name) {
            onChange?.(
              text.replace(/(^\w|\s\w)/g, (match, p1) => p1.toUpperCase()),
            );
          } else {
            onChange?.(text);
          }
        }
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
              ]}
            >
              <Image source={leftIcon} style={styles.icon_lock_img} />
            </View>
          )}

          <View
            style={[
              styles.inputContainer,
              error && !!value && [styles.error, errorStyle],
              Boolean(leftIcon) && {paddingLeft: 50},
              (isDeleted || password) && {paddingRight: Spacing.PADDING * 2},
              !!autoHeight ? styles.autoHeight : styles.fixedHeight,
              style,
            ]}
          >
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
              placeholderTextColor={placeholderTextColor || Colors.tp5}
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
              }}
            >
              <Image
                source={showPassword ? Images.Eye2 : Images.EyeGray2}
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
                top: 18,
              }}
            >
              <Icon
                icon={Images.CloseThin}
                style={{
                  width: scale(12),
                  height: scale(12),
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        {!!error && showErrorLabel && !!value && (
          <Text color={Colors.hl1} mt={3} size={scale(12)}>
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
    borderRadius: scale(8),
    backgroundColor: Colors.bs4,
    borderWidth: 1,
    borderColor: Colors.bs1,
    justifyContent: 'center',
    maxHeight: 160,
  },
  fixedHeight: {
    height: 48,
  },
  autoHeight: {
    maxHeight: 160,
    paddingVertical: 0,
    minHeight: 48,
  },

  textStyle: {
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.tp3,
    fontSize: Fonts.MD,
  },
  error: {
    borderColor: Colors.hl1,
    borderWidth: 1,
  },
  icon_lock: {
    paddingRight: 10,
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    borderColor: Colors.tp3,
    zIndex: 1,
  },
  icon_lock_img: {
    width: 17,
    height: 17,
  },
});

import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors, Fonts} from 'themes';
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
      label,
      required,
      rightComponent,
      placeholderTextColor,
      autoCompleteType = 'off',
      textContentType = 'none',
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
        <TextInput
          ref={ref}
          autoCapitalize={'none'}
          autoFocus={false}
          // autoCorrect={false}
          autoCompleteType={autoCompleteType}
          textContentType={textContentType}
          importantForAutofill={'yes'}
          placeholder={placeholder}
          style={[styles.textInput, error && styles.error, style]}
          placeholderTextColor={placeholderTextColor || Colors.BOTTOMBORDER}
          onChangeText={onChange}
          keyboardType={keyboardType}
          secureTextEntry={password}
          {...props}></TextInput>
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
  textInput: {
    margin: 0,
    paddingHorizontal: scale(10),
    height: 48,
    borderRadius: scale(8),
    backgroundColor: '#fff',
    fontFamily: Fonts.FONT_REGULAR,
    borderWidth: 1,
    borderColor: '#CCCCCB',
    color: Colors.TEXT,
    fontSize: Fonts.FONT_MEDIUM,
  },
  error: {
    borderColor: Colors.ALERT,
    borderWidth: 1,
  },
});

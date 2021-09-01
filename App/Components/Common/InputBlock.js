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
  isSelect,
  onPress,
  scrollViewRef,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const positionRef = useRef(0);

  const _onFocus = event => {
    setIsFocused(true);
    scrollViewRef &&
      scrollViewRef.current &&
      scrollViewRef.current.scrollTo({
        x: 0,
        y: positionRef.current - scale(100),
        animated: true,
      });
    onFocus && onFocus(event);
  };

  const _onBlur = event => {
    setIsFocused(false);
    onBlur && onBlur(event);
  };
  return (
    <View
      {...(scrollViewRef
        ? {
            onLayout: event => {
              positionRef.current = event.nativeEvent.layout.y;
            },
          }
        : {})}>
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
            <Text style={{color: Colors.TEXT}}>
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
          style={{
            position: 'absolute',
            right: scale(10),
            top: scale(48),
          }}>
          <Icon icon={rightIcon} />
        </TouchableOpacity>
      )}
      {!!password && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: scale(10),
            top: scale(48),
          }}>
          <Image
            source={showPassword ? Images.Eye : Images.EyeGray}
            style={{width: scale(20), height: scale(20)}}
            resizeMode="contain"
          />
        </Pressable>
      )}
    </View>
  );
};

export default InputBlock;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  inputLabel: {
    color: Colors.GRAY,
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
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    borderColor: Colors.ALERT,
    borderWidth: 1,
  },
});

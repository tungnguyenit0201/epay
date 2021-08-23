import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import Text from './Text'
// import TextInput from 'components/Common/TextInput';
import {Colors, Images, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import TextInput from './TextInput';

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
    // scrollViewRef &&
    //   scrollViewRef.current &&
    //   scrollViewRef.current.scrollTo({
    //     x: 0,
    //     y: positionRef.current - scale(100),
    //     animated: true,
    //   });
    onFocus && onFocus(event);
  };

  const _onBlur = event => {
    setIsFocused(true);
    onBlur && onBlur(event);
  };

  return (
    <View>
      <Text style={{color: Colors.GRAY, marginTop: scale(5), marginBottom: scale(10)}}>
        {label} {required && <span style={{color: "red"}}>* </span>}
      </Text>
      {!isSelect ? (
        <TextInput
          textContentType={'oneTimeCode'}
          style={
            {
              backgroundColor: Colors.BACKGROUNDCOLOR,
              outlineColor: isFocused ? Colors.PRIMARY : Colors.BORDER,
              borderColor: isFocused ? Colors.PRIMARY : Colors.BORDER,
              inputStyle
            }
          }
            password={password && !showPassword}
            email={email}
            numeric={numeric}
            error={error}
            value={value}
            required={required}
            onChange={onChange}
            onFocus={() => _onFocus()}
            onPress={_onBlur}
            {...props}
          />
        ) : (
          <TouchableOpacity style={styles.select} onPress={onPress}>
            <Text style={{color: Colors.TEXT}}>
              {value ? value : props?.defaultValue}
            </Text>
          </TouchableOpacity>
        )}
    </View>
  );
};

export default InputBlock;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
    borderColor: Colors.BORDER
  },
  inputLabel: {
    color: Colors.GRAY,
    marginTop: scale(5),
    marginBottom: scale(10),
  },
  select: {
    paddingHorizontal: Spacing.PADDING,
    paddingVertical: 3,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

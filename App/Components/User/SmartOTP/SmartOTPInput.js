import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Row, Text} from 'components';
import {Colors, Spacing} from 'themes';
import {useIsFocused} from '@react-navigation/native';

const SmartOTPInput = ({onFilled, message, numDigits = 6}) => {
  const isFocused = useIsFocused();
  const [code, setCode] = useState('');
  const textInputRef = useRef(null);

  const onChange = value => {
    if (value.length >= 6) {
      onFilled && onFilled(value);
    }
    setCode(value);
  };

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    setCode('');
    textInputRef.current && textInputRef.current.focus();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        value={code}
        keyboardType="numeric"
        style={styles.textInput}
        onChangeText={onChange}
      />
      <Row>
        {[...Array(numDigits)].map((digit, index) => (
          <View
            style={[
              styles.circle,
              index >= code.length ? styles.activeCirle : null,
              index ? {marginLeft: Spacing.PADDING} : null,
            ]}
          />
        ))}
      </Row>
      <Text style={styles.message} mt={Spacing.PADDING}>
        {message}
      </Text>
    </View>
  );
};

export default SmartOTPInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  message: {
    color: Colors.Highlight,
  },
  textInput: {
    display: 'none',
  },
  circle: {
    width: Spacing.PADDING,
    height: Spacing.PADDING,
    borderRadius: Spacing.PADDING / 2,
    backgroundColor: Colors.g9,
  },
  activeCirle: {
    backgroundColor: Colors.l4,
  },
});

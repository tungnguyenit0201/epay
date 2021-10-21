import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Row, Text} from 'components';
import {Colors, Spacing} from 'themes';
import {useIsFocused} from '@react-navigation/native';

const SmartOTPInput = ({onFilled, message, numDigits = 6}) => {
  let isFocused;
  try {
    /* eslint-disable-next-line */
    isFocused = useIsFocused();
  } catch {
    isFocused = true;
  }
  const [code, setCode] = useState('');
  const textInputRef = useRef(null);

  const onChange = value => {
    if (value.length >= numDigits) {
      onFilled && onFilled(value.substring(0, numDigits));
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

  useEffect(() => {
    if (!!message) {
      setCode('');
    }
  }, [message]);
  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        value={code}
        keyboardType="number-pad"
        style={styles.textInput}
        onChangeText={onChange}
      />
      <Row>
        {[...Array(numDigits)].map((digit, index) => (
          <View
            key={index}
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
    textAlign: 'center',
  },
  textInput: {
    display: 'none',
  },
  circle: {
    width: Spacing.PADDING,
    height: Spacing.PADDING,
    borderRadius: Spacing.PADDING / 2,
    backgroundColor: Colors.tp2,
  },
  activeCirle: {
    backgroundColor: Colors.bs1,
  },
});

import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import _ from 'lodash';
import {scale} from 'utils/Functions';

const OTP = ({
  numDigits = 6,
  onChange,
  containerStyle,
  inputStyle,
  seperatorStyle,
}) => {
  const contentRef = useRef({
    values: [],
    refs: [],
  });

  const _onChange = (value, index) => {
    contentRef.current.values[index] = value;
    const nextInputRef = contentRef.current.refs[index + 1];
    value && nextInputRef && nextInputRef.focus();
    onChange && onChange(contentRef.current.values.join(''));
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {[...Array(numDigits)].map((item, index) => (
        <>
          {!!index && <View style={[styles.seperator, seperatorStyle]} />}
          <TextInput
            ref={ref => contentRef.current.refs.push(ref)}
            onChange={value => _onChange(value, index)}
            style={[styles.otp, inputStyle]}
            numeric
            maxLength={1}
            selectTextOnFocus
            key={index}
          />
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: Spacing.PADDING * 2,
  },
  otp: {
    width: scale(40),
    backgroundColor: 'transparent',
    fontSize: Fonts.FONT_LARGE,
    textAlign: 'center',
    borderColor: Colors.BLACKTEXT,
    borderWidth: 1,
    borderRadius: 0,
  },
  seperator: {
    width: Spacing.PADDING / 2,
  },
});

export default OTP;

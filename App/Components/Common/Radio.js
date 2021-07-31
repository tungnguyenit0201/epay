import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Colors, Fonts} from 'themes';
import {scale} from 'utils/Functions';
import Text from './Text';

export default ({
  items,
  onChange,
  style,
  marginBottom = 19,
  error,
  active,
  showErrorLabel = true,
}) => {
  const [checked, setChecked] = React.useState(active ? active : 1);
  const renderRadio = item => {
    //const isSelected = item?.value === value;
    return (
      <Pressable
        //onPress={() => onChange?.(item?.value)}
        onPress={() => setChecked(item?.value)}
        key={item?.value}
        style={styles.radio}>
        <View style={styles.tickWrap}>
          {checked === item?.value && <View style={styles.tick} />}
        </View>
        <Text mt={2}>{item?.label}</Text>
      </Pressable>
    );
  };

  return (
    <>
      <View style={[{marginBottom}, style]}>
        <View style={styles.wrap}>{items?.map(renderRadio)}</View>
        {!!error && showErrorLabel && (
          <Text color={'#FF0600'} mt={3} size={12}>
            {error}
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(40),
  },
  tickWrap: {
    width: 15,
    height: 15,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  tick: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.cl1,
  },
});

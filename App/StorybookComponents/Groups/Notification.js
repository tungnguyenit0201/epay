import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../Atoms/Icon';
import Text from '../Atoms/Text';
import {Images} from 'themes';

const Notification = ({data, style}) => {
  return (
    <TouchableOpacity
      style={[{marginLeft: 'auto', position: 'relative'}]}
      onPress={() => {
        console.log('press')
      }}>
      <Icon icon={Images.Noti} tintColor="#fff" />
      <View style={styles.number}>
        <Text
          color="#fff"
          size={10}
          style={{
            lineHeight: 16,
            textAlign: 'center',
          }}>
          {data}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  number: {
    width: 16,
    height: 16,
    backgroundColor: '#D70000',
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 99,
  },
});

export default Notification;

import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text} from 'components';
import {Colors, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

const Notification = ({data, style}) => {
  return (
    <TouchableOpacity
      style={[{marginLeft: 'auto', position: 'relative'}]}
      onPress={() => {
        Navigator.navigate(SCREEN.NOTIFICATION);
      }}
    >
      <Icon icon={Images.Noti} tintColor={Colors.bs4} />
      <View style={styles.number}>
        <Text
          color={Colors.bs4}
          size={10}
          style={{
            lineHeight: 16,
            textAlign: 'center',
          }}
        >
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
    backgroundColor: Colors.Highlight,
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 99,
  },
});

export default Notification;

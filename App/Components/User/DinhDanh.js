import React from 'react';
import {Text, Button} from 'components';
import {View, Image, StyleSheet} from 'react-native';
import {Colors} from 'themes';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
const DinhDanh = () => {
  //TODO : translation
  return (
    <View style={[styles.box]}>
      <View style={styles.ico}>
        <Image
          style={[{width: 40, height: 40}]}
          source={require('images/profile/User.png')}
        />
      </View>
      <Text fs="h4" centered bold mb={10}>
        Định danh tài khoản
      </Text>
      <Text centered mb={20}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>
      <Button
        type="img"
        label="Định danh ngay"
        bold
        onPress={() => {
          Navigator.push(SCREEN.VERIFY_USER_INFO);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    position: 'relative',
    marginBottom: 20,
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ico: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
export default DinhDanh;

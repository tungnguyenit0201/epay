import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN, USER_STATUS} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {Images} from 'themes';
import {useUserStatus} from 'context/User/utils';

const User = () => {
  const {status} = useUserStatus();

  return status != USER_STATUS.DONE && status != USER_STATUS.VERIFYING_KYC ? (
    <TouchableOpacity
      onPress={() => {
        status == USER_STATUS.INACTIVE_KYC &&
          Navigator.navigate(SCREEN.CHOOSE_IDENTITY_CARD);
        status == USER_STATUS.ACTIVED_KYC_NO_CONNECTED_BANK &&
          Navigator.navigate(SCREEN.MAP_BANK_FLOW);
      }}
      style={[styles.item]}
    >
      <Image
        style={styles.img}
        resizeMode={'contain'}
        source={Images.Homes.Avatar}
      />
      <Text style={styles.text}>
        {status == USER_STATUS.INACTIVE_KYC
          ? 'Cập nhật định danh để tăng cường bảo mật cho tài khoản của bạn.'
          : 'Liên kết ngân hàng để thực hiện giao dịch'}
      </Text>
      <Image style={styles.arrow} source={Images.Homes.Arrow} />
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    //flexWrap: 'wrap',
  },
  text: {
    paddingHorizontal: scale(40),
  },
  img: {
    width: scale(40),
    height: scale(40),
    marginRight: 'auto',
  },
  arrow: {
    width: scale(24),
    height: scale(24),
    marginLeft: 'auto',
  },
});

export default User;

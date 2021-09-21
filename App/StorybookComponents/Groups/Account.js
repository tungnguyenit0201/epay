import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {Colors, Fonts, Images, base} from 'themes';
import {scale, formatMoney} from '../Utils/Functions';
import Text from '../Atoms/Text';
import Icon from '../Atoms/Icon';
const Account = () => {
  const translation = require('../../Context/Language/vi.json');
  const [showMoney, setShowMoney] = useState(false);

  // TODO: translate
  return (
    <View style={base.boxShadow}>
      <View style={styles.wbg}>
        <Image
          style={styles.bg}
          source={require('images/profile/wave.png').default}
        />
      </View>

      <View style={[base.row, styles.row]}>
        <Image
          style={[{width: 32, height: 32}]}
          source={Images.Profile.SoDu.default}
        />
        <Text ml={10} semibold>
          Số dư
        </Text>
        <Image
          style={[base.leftAuto, {width: 88, height: 32}]}
          source={require('images/profile/epay.png').default}
        />
      </View>

      <View style={base.row}>
        {!showMoney ? (
          <Text style={[styles.number, {paddingTop: 5}]}>******</Text>
        ) : (
          <TouchableOpacity style={styles.item}>
            <Text style={[styles.number]} bold>
              20.000 VND
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={base.leftAuto}
          onPress={() => setShowMoney(!showMoney)}>
          <Icon icon={showMoney ? Images.Eye : Images.EyeGray} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.line}></View>

      <TouchableOpacity style={[base.row, {marginBottom: 10}]}>
        <Text semibold mr={5}>
          {translation.bank_linking}
          <Text>0</Text>
        </Text>
        <Image
          style={{width: 20, height: 20}}
          source={require('images/profile/plus.png').default}
        />
      </TouchableOpacity>

      <TouchableOpacity style={[base.row]}>
        <Image
          style={{width: 40, height: 40}}
          source={require('images/profile/plus2.png').default}
        />
        <Text semibold ml={10}>
          Liên kết ngân hàng ngay
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  wbg: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  bg: {
    width: scale(233),
    height: scale(233),
    position: 'absolute',
    right: 0,
    top: 32,
  },
  row: {
    marginBottom: 10,
  },
  number: {
    height: 40,
    lineHeight: 40,
    color: Colors.cl1,
    fontSize: scale(30),
  },
  line: {
    height: 1,
    backgroundColor: Colors.l2,
    marginTop: 5,
    marginBottom: 15,
  },
});
export default Account;

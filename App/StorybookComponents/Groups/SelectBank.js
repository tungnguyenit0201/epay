import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Text from '../Atoms/Text';
import Row from '../Atoms/Row';
import Col from '../Atoms/Col';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale} from 'utils/Functions';
import _ from 'lodash';

const SelectBank = ({data, feeData, label, style, onChange, setClick}) => {
  const translation = require('../../Context/Language/vi.json');
  const [checked, setChecked] = useState(null);

  const onChangeBank = value => {
    setChecked(value);
    onChange && onChange(value);
  };

  return (
    <View style={[styles.block, style]}>
      <Text bold size={Fonts.H6} mb={20}>
        {label}
      </Text>

      {/* {_.map(data, (data, type) => ( */}
      <Row space="10" key={1}>
        {data?.map((item, index) => {
          const {BankName, BankLogoUrl} = item;
          return (
            <Col width="33.33%" space="10" key={index}>
              <Pressable
                style={[styles.item]}
                onPress={() => {
                  onChangeBank(index);
                  setClick && setClick(true);
                }}>
                <View style={[styles.wicon]}>
                  <Image source={{uri: item.icon}} style={[styles.icon]} />
                  {index == checked && (
                    <View style={styles.active}>
                      <Image
                        source={Images.Down.default}
                        style={styles.activeImg}
                      />
                    </View>
                  )}
                </View>
                <Text centered size={12} mt={5}>
                  {BankName}
                </Text>
              </Pressable>
            </Col>
          );
        })}
        <Pressable style={[styles.item, {marginLeft: 22}]}>
          <View style={[styles.wicon]}>
            <Image
              source={Images.Bank.Plus.default}
              style={{
                width: 15,
                height: 15,
                position: 'relative',
                top: 17,
                left: 16,
              }}
            />
          </View>
          <Text centered size={12} mt={5}>
            Liên kết NH
          </Text>
        </Pressable>
      </Row>
      {/* ))} */}
      {/* <View style={styles.itemAddBank}>
        <Image source={Images.Bank.Plus.default} style={[styles.iconAddBank]} />
        <Text centered>{translation.add_cardbank_account}</Text>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
  },
  item: {
    alignItems: 'center',
    marginBottom: 20,
  },
  wicon: {
    width: scale(48),
    height: scale(48),
    backgroundColor: Colors.g2,
    borderRadius: 100,
    marginBottom: 5,
  },
  icon: {
    width: scale(28),
    height: scale(28),
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: scale(-14)}, {translateY: scale(-14)}],
  },

  itemAddBank: {
    alignItems: 'center',
    borderColor: Colors.l5,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  iconAddBank: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    marginBottom: 10,
  },

  active: {
    backgroundColor: Colors.cl1,
    width: 15,
    height: 15,
    borderRadius: 99,
    overflow: 'hidden',
    padding: 2,
    position: 'absolute',
    top: -4,
    right: -4,
  },
  activeImg: {
    width: 12,
    height: 12,
    tintColor: Colors.white,
  },
});
export default SelectBank;

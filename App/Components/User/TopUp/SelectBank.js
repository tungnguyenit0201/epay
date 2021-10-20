import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Text, Row, Col} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import _ from 'lodash';
import {SCREEN} from 'configs/Constants';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import Navigator from 'navigations/Navigator';

const SelectBank = forwardRef(
  ({data, feeData, label, style, onChange}, ref) => {
    const translation = useTranslation();
    const [checked, setChecked] = useState({
      type: null,
      index: null,
    });

    useImperativeHandle(ref, () => ({
      reset,
    }));

    const mapBank = () => {
      Navigator.push(SCREEN.MAP_BANK_FLOW, {
        screen: MapBankRoutes.BankPickerScreen,
      });
    };

    const reset = () => {
      onChangeBank(null);
    };

    const onChangeBank = value => {
      setChecked(value);
      onChange && onChange(value);
    };

    return (
      <View style={[styles.block, style]}>
        <Text bold fs="h6" mb={20}>
          {label}
        </Text>

        {_.map(data, (bankType, type) => (
          <Row space="10" key={type} style={styles.row}>
            {bankType.map((item, index) => {
              const {BankName, BankLogoUrl} = item;
              return (
                <Col width="33.33%" space="10" key={index}>
                  <Pressable
                    style={[styles.item]}
                    onPress={() => onChangeBank({index, type})}
                  >
                    <View style={[styles.wicon]}>
                      <Image
                        source={{uri: BankLogoUrl}}
                        style={[styles.icon]}
                      />
                      {checked &&
                        checked.type === type &&
                        checked.index === index && (
                          <Image
                            source={require('images/qrpay/CircleDown.png')}
                            style={styles.activeImg}
                          />
                        )}
                    </View>
                    <Text centered size={12} mt={5}>
                      {BankName}
                    </Text>
                  </Pressable>
                </Col>
              );
            })}
          </Row>
        ))}
        <Row space="10" style={styles.row}>
          <Col width="33.33%" space="10">
            <Pressable style={[styles.item]} onPress={mapBank}>
              <View style={[styles.wicon]}>
                <Image
                  source={require('images/qrpay/plus.png')}
                  style={[styles.icon]}
                />
              </View>
              <Text centered size={12} mt={5}>
                Liên kết NH
              </Text>
            </Pressable>
          </Col>
        </Row>
      </View>
    );
  },
);
const styles = StyleSheet.create({
  row: {
    marginBottom: 0,
  },
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
    backgroundColor: Colors.bs2,
    borderRadius: 99,
    marginBottom: 5,
    position: 'relative',
  },
  icon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: scale(-15)}, {translateY: scale(-15)}],
  },

  activeImg: {
    width: 18,
    height: 18,
    borderRadius: 99,
    overflow: 'hidden',
    padding: 2,
    position: 'absolute',
    top: -2,
    right: -2,
  },
});
export default SelectBank;

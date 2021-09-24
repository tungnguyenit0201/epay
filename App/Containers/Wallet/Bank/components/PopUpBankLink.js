import React from 'react';
import {Image, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Button, Radio, Text} from 'components';
import BankImages from '../images';
import {useTranslation} from 'context/Language';
import {GENDER} from 'configs/Constants';
import {Colors, Spacing, Images} from 'themes';
const {width} = Dimensions.get('window');
const mockIc = [
  {
    value: 'ssss',
    label: 'aaa',
  },
];
const PopUpBankLink = props => {
  const {icData: ic, onChooseIc, onContinue, requestClose} = props || {};
  const translation = useTranslation();

  const handleChange = item => {
    onChooseIc?.(item);
  };

  const renderOptionIc = () => {
    if (!Array.isArray(ic)) {
      return null;
    }
    return (
      <Radio
        onChange={handleChange}
        items={ic}
        selectedValue={ic?.[0]?.value}
        style={[
          {
            marginRight: 0,
            justifyContent: 'center',
            alignSelf: 'flex-start',
          },
        ]}
      />
    );
  };

  return (
    <View
      style={{
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
      }}>
      <Image
        source={require('../images/bg-popup.png')}
        style={{
          height: 124,
          width: 400,
        }}
        resizeMode={'stretch'}
      />
      <View
        style={{
          padding: Spacing.PADDING,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            alignItems: 'center',
            marginTop: Spacing.PADDING,
          }}>
          {translation.connect_bank}
        </Text>
        <Text style={{}}>
          Thông tin giấy tờ tuỳ thân mà bạn chọn để liên kết phải trùng khớp với
          thông tin giấy tờ tuỳ thân được khai báo tại ngân hàng.{' '}
        </Text>
        {renderOptionIc()}
        <View>
          <Button
            label={translation.continue}
            bold
            size="lg"
            style={{
              paddingTop: 15,
              paddingBottom: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              requestClose?.();
              onContinue?.(ic[0]);
            }}
          />
          <Button
            label={'Dùng giấy tờ tùy thân khác'}
            bold
            size="lg"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Spacing.PADDING,
              padding: 15,
            }}
            onPress={() => {
              requestClose?.();
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default PopUpBankLink;
const styles = StyleSheet.create({});

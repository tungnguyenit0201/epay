import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Radio, Header, Button, FWLoading} from 'components';

import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN, TEXT} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import SelectImage from 'components/User/VerifyInfo/SelectImage';
import {base} from 'themes';
import region from '../RegionSelect/region';

const VerifyUserPortrait = ({route}) => {
  const {data, onChange} = useVerifyInfo(route?.params);
  const {type} = route?.params;

  const onPress = () => {
    console.log('data', data);
    alert(data);
  };
  const pleaseChooseFirst = type => {
    Alert.alert('Lỗi', `Vui lòng chọn ${type} trước`);
  };

  const goRegionSelect = _type => {
    switch (_type) {
      case 'cites':
        Navigator.navigate('RegionSelect', {
          items: region?.cites,
          type: _type,
          parentType: type,
        });
        break;
      case 'districts':
        if (!region?.city?.value) {
          pleaseChooseFirst('thành phố / tỉnh');
        } else {
          Navigator.navigate('RegionSelect', {
            items: region?.districts?.[region?.city?.value],
            type: _type,
            parentType: type,
          });
        }
        break;
      case 'wards':
        if (!region?.city?.value) {
          pleaseChooseFirst('huyện / xã');
        } else {
          Navigator.navigate('RegionSelect', {
            items: region?.wards?.[region?.district?.value],
            type: _type,
            parentType: type,
          });
        }
        break;
    }
  };
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Header back title={TEXT.VERIFY_ACCOUNT} />
      <View style={[base.container, {paddingTop: 20}]}>
        <Progress step={3} />
        <InputBlock
          label="Họ và Tên"
          value="Nguyen Van A"
          style={{marginBottom: 10}}
        />
        <InputBlock
          label="Ngày sinh"
          value="09/09/1999"
          style={{marginBottom: 10}}
        />
        <Radio
          items={[
            {label: 'Nữ', value: 1},
            {label: 'Nam', value: 2},
          ]}
        />

        <InputBlock
          label="CMND / CCCD"
          value="356789099"
          style={{marginBottom: 10}}
        />
        <InputBlock
          label="Nơi cấp"
          value="TP. HỒ Chí Minh"
          style={{marginBottom: 10}}
        />
        <InputBlock
          label="Tỉnh / Thành phố"
          onChange={value => true}
          rightIcon={Images.Down}
          isSelect
          required
          onPress={() => goRegionSelect('cites')}
        />

        <InputBlock
          label="Quận / Huyện"
          onChange={value => true}
          rightIcon={Images.Down}
          isSelect
          required
          onPress={() => goRegionSelect('districts')}
        />
        <InputBlock
          label="Phường / Xã"
          onChange={value => true}
          rightIcon={Images.Down}
          isSelect
          required
          onPress={() => goRegionSelect('wards')}
        />
        <Button label={TEXT.DONE} onPress={onPress} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
});
export default VerifyUserPortrait;

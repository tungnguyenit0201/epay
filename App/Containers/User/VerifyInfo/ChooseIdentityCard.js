import React, {useRef, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text, SelectInput, Header, Button, HeaderBg} from 'components';
import {base, Colors} from 'themes';
import {SCREEN} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';

const ChooseIdentityCard = () => {
  const {onChange, onContinue} = useVerifyInfo();

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title="Định danh tài khoản" />
        </HeaderBg>

        <View style={[base.container, {paddingTop: 20}]}>
          <Text fs="h5" bold mb={10}>
            Định danh tài khoản để bảo mật và nhận được nhiều ưu đãi hơn
          </Text>
          <Text mb={20}>Chọn giấy tờ tuỳ thân</Text>
          <SelectInput
            optionList={cardList}
            defaultValue={1}
            showInputStyle={false}
          />
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label={'Tiếp tục'}
          onPress={() => onContinue(SCREEN.VERIFY_USER_INFO)}
        />
      </View>
    </>
  );
};
const cardList = [
  {label: 'Chứng minh nhân dân', value: 1},
  {label: 'Căn cước công dân', value: 2},
  {label: 'Chứng minh thư quân đội', value: 3},
  {label: 'Hộ chiếu', value: 4},
];
const styles = StyleSheet.create({});
export default ChooseIdentityCard;

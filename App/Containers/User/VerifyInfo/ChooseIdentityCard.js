import React, {useRef, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  Text,
  Header,
  Button,
  HeaderBg,
  ActionSheet,
  InputBlock,
} from 'components';
import {base, Colors, Images} from 'themes';
import {SCREEN} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import {useTranslation} from 'context/Language';

const ChooseIdentityCard = () => {
  const {verifyInfo, onChange, onContinue} = useVerifyInfo();
  const translation = useTranslation();
  const [visible, setVisible] = useState(false);

  //translate
  let cardList = [
    {label: translation?.id_card, value: 1},
    {label: 'Chứng minh thư quân đội', value: 2},
    {label: translation?.passport, value: 3},
  ];
  cardList?.map((item, index) => {
    cardList[index] = {...item, onPress: () => onChange('identifyCard', item)};
  });
  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title={translation?.verify_your_account} />
        </HeaderBg>

        <View style={[base.container, {paddingTop: 20}]}>
          <Text fs="h5" bold mb={10}>
            Định danh tài khoản để bảo mật và nhận được nhiều ưu đãi hơn
          </Text>

          <InputBlock
            label="Chọn giấy tờ tuỳ thân"
            isSelect
            onPress={() => setVisible(true)}
            rightIcon={Images.Down}
            value={
              verifyInfo?.identifyCard
                ? verifyInfo?.identifyCard?.label
                : cardList[0].label
            }
          />
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label={translation?.continue}
          onPress={() => onContinue(SCREEN.VERIFY_USER_INFO)}
        />
        <ActionSheet
          visible={visible}
          setVisible={setVisible}
          data={cardList}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
export default ChooseIdentityCard;

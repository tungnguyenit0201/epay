import React, {useRef, useState} from 'react';
import {ScrollView, View, StyleSheet, Pressable, Image} from 'react-native';
import {
  Text,
  Header,
  Button,
  HeaderBg,
  ActionSheet,
  InputBlock,
} from 'components';
import {base, Colors, Images} from 'themes';
import {IC_TPYE, SCREEN} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import {useTranslation} from 'context/Language';
import {DropDown} from 'components';

const ChooseIdentityCard = ({route}) => {
  const {verifyInfo, onChange, onContinue} = useVerifyInfo(route?.params);
  const translation = useTranslation();
  const [visible, setVisible] = useState(false);

  // TODO: translate
  let cardList = [
    {label: translation?.id_card, ICType: IC_TPYE.CMND},
    {label: 'Chứng minh thư quân đội', ICType: IC_TPYE.CMNDQD},
    {label: translation?.passport, ICType: IC_TPYE.PASSPORT},
  ];

  return (
    <>
      <View style={styles.bgWhite}>
        <HeaderBg>
          <Header back title={translation?.verify_your_account} />
        </HeaderBg>
      </View>

      <View style={[base.container, styles.bgWhite, styles.flex1, styles.pt1]}>
        <Text fs="h6" bold mb={24}>
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

      <View style={base.bottom}>
        <Button
          label={translation?.continue}
          onPress={() => onContinue(SCREEN.VERIFY_USER_INFO)}
        />
        <DropDown
          visible={visible}
          setVisible={setVisible}
          title={'Chọn giấy tờ tuỳ thân'}
          data={cardList}
          onPress={item => onChange('identifyCard', item)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: Colors.white,
  },
  flex1: {flex: 1},
  pt1: {paddingTop: 20},
});
export default ChooseIdentityCard;

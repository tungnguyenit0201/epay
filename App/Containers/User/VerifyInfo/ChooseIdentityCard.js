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

const ChooseIdentityCard = () => {
  const {verifyInfo, onChange, onContinue} = useVerifyInfo();
  const translation = useTranslation();
  const [visible, setVisible] = useState(false);

  // TODO: translate
  let cardList = [
    {label: translation?.id_card, ICType: IC_TPYE.CMND},
    {label: 'Chứng minh thư quân đội', ICType: IC_TPYE.CMNDQD},
    {label: translation?.passport, ICType: IC_TPYE.PASSPORT},
  ];
  cardList?.map((item, index) => {
    cardList[index] = {...item, onPress: () => onChange('identifyCard', item)};
  });
  return (
    <>
      <View style={styles.bgWhite}>
        <HeaderBg>
          <Header back title={translation?.verify_your_account} />
        </HeaderBg>
      </View>

      <View
        style={[
          base.container,
          styles.bgWhite,
          {
            // paddingTop: 20,
            flex: 1,
          },
        ]}>
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
        <ActionSheet
          visible={visible}
          setVisible={setVisible}
          data={cardList}
          // cancelButtonIndex={0}
          useNativeIOS={true}
          showCancelButton={false}
          renderTitle={() => (
            <View style={styles.childModal}>
              <Text bold fs="h6" centered color={Colors.cl1}>
                Trợ giúp
              </Text>
              <Pressable style={styles.btn}>
                <Image
                  source={Images.WidthDraw.Plus}
                  style={styles.iconClose}
                />
              </Pressable>
            </View>
          )}
          // title={'Trợ giúp'}
          // message={'dssd'}
          containerStyle={[
            styles.bgWhite,
            {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          ]}
          // dialogStyle={[{
          //   color: 'red',
          //   backgroundColor: 'red'
          // }]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: Colors.white,
  },
  iconClose: {
    height: 13,
    width: 13,
    transform: [{rotate: '45deg'}],
  },
  childModal: {
    padding: 16,
    borderStyle: 'solid',
    borderBottomColor: Colors.l2,
    borderBottomWidth: 1,
  },
});
export default ChooseIdentityCard;

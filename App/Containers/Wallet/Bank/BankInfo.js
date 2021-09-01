import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {Button, Header, SelectInput, TextInput, HeaderBg} from 'components';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import {useBankLinking} from 'context/Wallet/utils/bankLinking';

const BankInfo = ({route}) => {
  const translation = useTranslation();
  const {onLinkDomesticBank} = useBankLinking(route?.params);
  let [cardOption, setCardOption] = useState(false);
  let [accountOption, setAccountOption] = useState(false);

  let chooseCard = () => {
    setCardOption(true);
    setAccountOption(false);
  };

  let chooseAccount = () => {
    setCardOption(false);
    setAccountOption(true);
  };

  useEffect(() => {
    setCardOption(true);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
      </HeaderBg>

      <View style={[styles.wrap, {paddingBottom: 30}]}>
        <View
          style={[
            styles.flex,
            {
              alignItems: 'center',
              marginBottom: 24,
            },
          ]}>
          <Text bold size={Fonts.H6} style={{fontWeight: 'bold'}}>
            Loại liên kết
          </Text>

          <View style={styles.flex}>
            <Button
              bg={cardOption ? Colors.cl2 : Colors.BORDER}
              color={!cardOption && Colors.gray}
              label="Thẻ"
              onPress={chooseCard}
              mr={10}
              style={styles.btn}
            />

            <Button
              bg={accountOption ? Colors.cl2 : Colors.BORDER}
              color={!accountOption && Colors.gray}
              label="Tài khoản"
              onPress={chooseAccount}
              style={styles.btn}
            />
          </View>
        </View>

        <View style={styles.mb_1}>
          <TextInput placeholder={translation.card_number} />
          <Text style={{color: Colors.Highlight}}>
            {translation.incorrect_card_number}
          </Text>
        </View>

        <View style={styles.mb_1}>
          <TextInput placeholder={translation.cardholder_name} />
        </View>

        <View style={styles.mb_1}>
          <TextInput placeholder={translation.issue_date} />
        </View>

        <View style={styles.mb_1}>
          <TextInput placeholder={translation.cvv} />
        </View>

        <SelectInput
          optionList={[
            {label: 'Số CMND', value: 'cmnd'},
            {label: 'Căn cước', value: 'cancuoc'},
          ]}
          defaultValue={'cmnd'}
          style={{
            paddingHorizontal: 10,
            marginHorizontal: 0,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: Colors.cl4,
          }}
          inputStyle={{color: Colors.cl4}}
        />
      </View>

      <View
        style={{
          backgroundColor: Colors.BORDER,
          height: 8,
        }}></View>

      <View style={[styles.wrap, styles.pt_1]}>
        <Text
          size={Fonts.H6}
          style={{
            marginBottom: 8,
            fontWeight: 'bold',
          }}>
          {translation.conditions_to_connect}
        </Text>

        <View style={[styles.flex_2, styles.items_center]}>
          <View style={styles.dot}></View>
          <Text style={styles.text_gray}>
            {translation.bank_account_balance_50000_vnd}
          </Text>
        </View>

        <View style={[styles.flex_2, styles.items_center]}>
          <View style={styles.dot}></View>
          <Text style={styles.text_gray}>
            {translation.the_phone_number_signing_up_for_epay_must_be}
          </Text>
        </View>

        <Button
          mt={30}
          onPress={() => Navigator.push(SCREEN.BANK_RESULT)}
          label={translation.connect_now}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  pt_1: {paddingTop: 24},
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  flex_2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  items_center: {
    alignItems: 'center',
  },
  btn: {
    minWidth: 102,
    borderRadius: 16,
    height: 32,
  },

  mb_1: {marginBottom: 16},
  dot: {
    width: 3,
    height: 3,
    marginRight: 8,
    backgroundColor: Colors.gray,
    borderRadius: 100,
  },
  text_gray: {color: Colors.gray},
});

export default BankInfo;

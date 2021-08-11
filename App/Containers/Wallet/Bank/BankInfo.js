import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Button, Header, InputBlock} from 'components';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import HeaderBg from 'components/Common/HeaderBg';

const BankInfo = () => {
  const translation = useTranslation();
  let [cardOption, setCardOption] = useState(false);
  let [accountOption, setAccountOption] = useState(false);

  let chooseCard = useCallback(() => {
    setCardOption(true);
    setAccountOption(false);
  });

  let chooseAccount = useCallback(() => {
    setCardOption(false);
    setAccountOption(true);
  });

  useEffect(() => {
    setCardOption(true);
  },[]);

  return (
    <ScrollView style={styles.container}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
      </HeaderBg>

      <View style={[styles.wrap,{paddingBottom: 30}]}>
        <View style={[styles.flex,{
            alignItems: "center"
          }]}>
          <Text bold size={Fonts.H6}
            style={{fontWeight: "bold"}}>
            Loại liên kết
          </Text>

          <View style={styles.flex} mb={30}>
            <Button bg={cardOption?"#6FC3EA":Colors.BORDER}
              color={!cardOption && "#666"} 
              label='Thẻ' onPress={chooseCard} mr={10}
              style={styles.btn}/>

            <Button bg={accountOption?"#6FC3EA":Colors.BORDER}
              color={!accountOption && "#666"}
              label='Tài khoản' 
              onPress={chooseAccount}
              style={styles.btn}/>
          </View>
        </View>

        <InputBlock placeholder={translation.card_number}
          style={styles.mb_minus_1}/>
        <Text style={{color:"red"}}>{translation.incorrect_card_number}</Text>
        <InputBlock placeholder={translation.cardholder_name}
          style={styles.mb_minus_1}/>
        <InputBlock placeholder={translation.issue_date}
          style={styles.mb_minus_1}/>
        <InputBlock placeholder={translation.cvv}/>
      </View>
      
      <View style={{
        backgroundColor: Colors.BORDER,
        height: 8
      }}></View>

      <View style={[styles.wrap, styles.pt_1]}>
        <Text size={Fonts.H6}
          style={{
            marginBottom: 8,
            fontWeight: "bold",
          }}>{translation.conditions_to_connect}</Text>

        <View style={[styles.flex_2,styles.items_center]}>
          <View style={styles.dot}></View>
          <Text style={styles.text_gray}>{translation.bank_account_balance_50000_vnd}</Text>
        </View>

        <View style={[styles.flex_2,styles.items_center]}>
          <View style={styles.dot}></View>
          <Text style={styles.text_gray}>{translation.the_phone_number_signing_up_for_epay_must_be}</Text>
        </View>
        
        <Button
          mt={30}
          onPress={() => Navigator.push(SCREEN.BANK_RESULT)}
          label={translation.connect_now}/>
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
  pt_1: { paddingTop: 24 },
  flex: {
    flexDirection: "row",
    justifyContent:"space-between",
    flexWrap: "wrap",
  },
  flex_2: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  items_center: {
    alignItems: "center",
  },
  btn: {
    minWidth: 102,
    borderRadius: 16,
    height: 32,
  },
  input: {
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: '#fff'
  },
  mb_minus_1: { marginBottom: -5 },
  dot: {
    width: 3,
    height: 3,
    marginRight: 8,
    backgroundColor: '#666666',
    borderRadius: 100
  },
  text_gray: { color: '#666666' }
});

export default BankInfo;

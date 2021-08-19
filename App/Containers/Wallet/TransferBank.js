import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Button, Header, SelectInput, TextInput} from 'components';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
import HeaderBg from 'components/Common/HeaderBg';
import { Checkbox } from 'react-native-ui-lib';

const BankTransferInfo = () => {
  const translation = useTranslation();
  
  return (
    <ScrollView style={styles.container}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
        <Text style={[styles.title,{
          marginTop: 28,
          marginBottom: 10
        }]}>
          {translation.transfer_to}
        </Text>

        <TouchableOpacity
          style={[styles.flex_row,{
            alignItems: 'center',
          }]}>
          <View
            style={{
              width: 48,
              height: 48,
              marginRight: 16,
              borderRadius: 100,
              backgroundColor: Colors.BORDER,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Images.ConnectBank.logoVtb}
              style={{
                width: scale(26),
                height: scale(26),
              }}/>
          </View>
          
          <View>
            <Text style={[styles.text_white,{
              marginBottom: 1,
              fontWeight: '600',
              fontSize: Fonts.H6
            }]}>Vietinbank</Text>
            <Text style={styles.text_white}>{translation.free}</Text>
          </View>
        </TouchableOpacity>
      </HeaderBg>

      <View style={[styles.wrap,{paddingTop: 10}]}>
        <View style={styles.mb_1}>
          <TextInput placeholder={translation.enter_the_recipients_account_number}/>
          <Text style={{color:"red"}}>
            *{translation.incorrect_card_number}
          </Text>
        </View>

        <View style={styles.mb_1}>
          <TextInput placeholder={translation.recipients_name}/>
        </View>

        <View style={styles.mb_1}>
          <TextInput placeholder={translation.enter_the_amount}
            style={{paddingRight: 60}}/>
          <Text style={{
            position: 'absolute',
            right: 15,
            top: 10,
            fontWeight: 'bold',
            fontSize: 18,
          }}>vnđ</Text>
        </View>

        <View style={styles.mb_1}>
          <TextInput placeholder={translation.enter_message}/>
        </View>

        <View style={[styles.mb_1,styles.flex_row]}>
          <Checkbox onPress
            label={translation.save_transfer_information}/>
        </View>
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
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Fonts.H6
  },
  flex_row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text_white: { color: Colors.white, },
  mb_1: { marginBottom: 8 },
});

export default BankTransferInfo;

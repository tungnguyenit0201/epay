import React, {useCallback, useState} from 'react';
import {ScrollView, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts, base} from 'themes';

//example:
{/* <BlockLogoBlue title={'Ví EPAY'} iconEdit 
  status="Miễn phí" mb={32}/> */}

const BlockLogoBlue = ({title, item, callback, mb=10, iconEdit=false,
  text="Số dư: 5.000.000đ", status="X% phí giao dịch"}) => (
  <TouchableOpacity
    style={[styles.boxItem1, styles.boxShadowBlue,
      {marginBottom: mb}]}
    onPress={() => {
      callback?.(item);
    }}
  >
    <Image
      source={Images.TrafficFee.LogoType1}
      style={[
        styles.mr1,
        {
          width: scale(24),
          aspectRatio: 1,
        },
      ]}
      resizeMode='contain'
    />
    <View flex={1}>
      <View flexDirection='row'>
        <View flex={1} style={styles.pr1}>
          <Text fs="h6" bold mb={10}>{title}</Text>
        </View>

        {!!iconEdit && <Image
          source={Images.TrafficFee.Edit}
          style={{
            width: scale(24),
            aspectRatio: 1,
          }}
          resizeMode='contain'
        />}
      </View>

      <View flexDirection='row'>
        <View style={styles.pr1} width="50%">
          <Text size={Fonts.SM} color={Colors.tp3}>
            {text}
          </Text>
        </View>

        <View width="50%">
          <Text size={Fonts.SM} right color={Colors.tp3}>
						{status}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mr1: {marginRight: 10},
  //---------------
  pr1: {paddingRight: 8},
  //---------------
  boxItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  boxShadowBlue: {
    backgroundColor: Colors.bg1,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 8,
  },
});

export default BlockLogoBlue;

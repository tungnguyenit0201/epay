import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import Button from '../../../Atoms/Button';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import {Colors, Fonts, Spacing, Images} from 'themes';

const BankResult = () => {
  const translation = require('../../../../Context/Language/vi.json');
  const blue_color = '#437EC0';
  return (
    <>
      <ScrollView style={[styles.container]}>
        <HeaderBg>
          <Header back title={translation.connect_bank} />
        </HeaderBg>

        <View style={[styles.wrap, {marginTop: 86}]}>
          <Text
            style={{
              marginBottom: 32,
              fontWeight: 'bold',
              textAlign: 'center',
              width: '100%',
              fontSize: Fonts.H5,
            }}>
            {translation.successfully_connect}
          </Text>

          <Pressable
            onPress={() => console.log('hello')}
            style={styles.items_center}>
            <Image
              source={Images.Avatar.default}
              style={{
                width: 166,
                height: 166,
                borderRadius: 100,
              }}
            />
          </Pressable>
        </View>
      </ScrollView>

      <View
        style={[
          styles.wrap,
          {
            padding: Spacing.PADDING,
            backgroundColor: Colors.BACKGROUNDCOLOR,
          },
        ]}>
        {/* <View style={[styles.flex_row,styles.justify_between]}>
          <Button bg={Colors.white}
            color={blue_color}
            label={translation.back_to_wallet}
            border={blue_color}
            style={{width: "49%"}}/>
          
          <Button bg={blue_color}
            color={Colors.white} 
            label={translation.minimum_topup_amount_is_10000_vnd}
            style={{width: "49%"}}/>
        </View> */}

        <Button
          bg={blue_color}
          color={Colors.white}
          label={translation.back}
          style={{width: '100%'}}
          onPress={() => console.log('hello')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  h_full: {
    height: '100%',
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  flex_row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  items_center: {alignItems: 'center'},
  justify_between: {justifyContent: 'space-between'},
});

export default BankResult;

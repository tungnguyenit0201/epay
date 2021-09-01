import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {HeaderBg, Header, Icon, InputBlock, Row, Col} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {useBankList} from 'context/Wallet/utils';

const BankList = () => {
  const {bankList} = useBankList();
  console.log('walletInfo :>> ', bankList);
  const translation = useTranslation();

  const Item = ({title, icon, iconHeight, iconWidth, item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => Navigator.push(SCREEN.BANK_INFO, {bank: item})}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 100,
          backgroundColor: Colors.BORDER,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: icon}}
          style={{
            width: iconWidth ? iconWidth : scale(26),
            height: iconHeight ? scale(iconHeight) : scale(26),
          }}
          resizeMode="contain"
        />
      </View>
      <Text centered style={{marginTop: 10}}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
      </HeaderBg>

      <View style={[styles.wrap, styles.mb_1, {marginTop: -16}]}>
        <View>
          <View style={styles.icon}>
            <Image source={Images.TabBar.Search} style={styles.image} />
          </View>

          <InputBlock
            placeholder={translation.which_back_are_you_looking_for}
            style={styles.input_text}
          />
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: 7,
          backgroundColor: Colors.l4,
        }}></View>

      <View style={[styles.wrap, styles.py_1]}>
        <Text size={Fonts.h6} style={{fontWeight: 'bold', marginBottom: 16}}>
          {translation.bank_linking}
        </Text>
        <Row space={10}>
          {bankList?.map((item, index) => {
            return (
              <Col
                width={`33.333%`}
                space={10}
                key={index}
                style={{marginBottom: 16}}>
                <Item
                  title={item?.BankName}
                  icon={item?.BankLogoUrl}
                  iconHeight={item?.iconHeight}
                  item={item}
                />
              </Col>
            );
          })}
        </Row>
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
  mb_1: {marginBottom: 24},
  py_1: {paddingVertical: 25},
  image: {
    width: 20,
    height: 20,
  },
  icon: {
    position: 'absolute',
    top: 48,
    left: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.GRAY,
    zIndex: 1,
  },
  input_text: {
    paddingLeft: 50,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.l4,
    backgroundColor: Colors.white,
  },
  item: {alignItems: 'center'},
});

export default BankList;

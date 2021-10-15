import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Header, Row, Col, Icon, HeaderBg} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN, TEXT} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import Monney from 'components/Home/Monney';
import ListItem from 'components/Common/ListItem';
import {scale} from 'utils/Functions';
import {useUser} from 'context/User';
const MyWallet = ({route}) => {
  const listBankConnect = route.params.ListBankConnect;
  const {userInfo} = useUser();
  const translation = useTranslation();
  const dataMenu = [
    {
      icon: Images.Homes.NapTien,
      name: translation.top_up,
      screen: SCREEN.TOP_UP,
    },
    {
      icon: Images.Homes.RutTien,
      name: translation.withdraw,
      screen: SCREEN.WITHDRAW,
    },
    {
      icon: Images.Homes.ChuyenTien,
      name: translation.transfer,
      screen: SCREEN.TRANSFER,
    },
  ];
  return (
    <>
      <ScrollView style={styles.container}>
        <HeaderBg>
          <Header back title="Ví của tôi" style={{marginBottom: 25}} />
          <Monney
            style={[
              {
                position: 'absolute',
                bottom: -20,
                left: Spacing.PADDING,
                right: Spacing.PADDING,
                shadowColor: 'black',
              },
            ]}
          />
        </HeaderBg>

        <View style={[styles.wrap, {marginTop: 24, marginBottom: 14}]}>
          <ListItem
            scroll
            space={10}
            col={4}
            data={dataMenu}
            styleText={[{fontSize: 14}]}
            styleWicon={[{backgroundColor: '#437EC0'}]}
            styleIcon={[{tintColor: '#fff'}]}
          />
        </View>

        <View
          style={{
            backgroundColor: Colors.BORDER,
            height: 8,
          }}
        ></View>

        <View style={[styles.wrap, styles.py_1]}>
          {listBankConnect ? (
            <View>
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: Fonts.H6,
                  fontWeight: 'bold',
                }}
              >
                {translation.connect_cardbank_account}
              </Text>
              <Text style={styles.text}>
                {translation.you_have_not_connected_your_cardbank_account_yet}
              </Text>
              <Text style={styles.text}>
                {translation.connect_now_to_use_epays_payment_services}
              </Text>
            </View>
          ) : (
            ''
          )}

          <Row justify="space-between">
            {listBankConnect
              ? listBankConnect.map(value => (
                  <Col key={value.id} width="30%" style={styles.mb_15}>
                    <TouchableOpacity style={styles.flexCenter}>
                      <View style={styles.bankBlock}>
                        <Image
                          style={styles.bankImage}
                          source={value?.BankLogoUrl}
                        />
                      </View>
                      <Text>{value?.BankName}</Text>
                    </TouchableOpacity>
                  </Col>
                ))
              : ''}
            <Col width="30%" style={styles.mb_15}>
              <TouchableOpacity style={styles.addBank}>
                <Icon icon={Images.Transfer.UNION} tintColor={Colors.brd1} />
                <Text style={styles.fontSmall}>Thêm liên kết NH</Text>
              </TouchableOpacity>
            </Col>
          </Row>
        </View>
      </ScrollView>

      <View
        style={[
          styles.wrap,
          {
            padding: Spacing.PADDING,
            backgroundColor: Colors.BACKGROUNDCOLOR,
          },
        ]}
      >
        <Button
          label={translation.add_bank}
          onPress={() => Navigator.navigate(SCREEN.BANK_LIST)}
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
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  py_1: {paddingVertical: Spacing.PADDING},
  text: {
    color: Colors.gray,
    lineHeight: 20,
    marginBottom: 15,
  },
  itemAddBank: {
    maxWidth: '33.333%',
    alignItems: 'center',
    borderColor: Colors.l5,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  iconAddBank: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    marginBottom: 10,
  },
  mb_15: {
    marginBottom: scale(15),
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankBlock: {
    width: scale(48),
    height: scale(48),
    backgroundColor: Colors.g2,
    borderRadius: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  bankImage: {
    width: scale(28),
    height: scale(28),
  },
  addBank: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: Colors.g4,
    width: scale(108),
    height: scale(72),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  fontSmall: {
    fontSize: Fonts.SM,
  },
});

export default MyWallet;

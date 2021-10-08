import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  Button,
  Header,
  InputBlock,
  TextInput,
  Icon,
  Text,
  Row,
  Col,
} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import {useTranslation} from 'context/Language';
import {formatMoney, scale} from 'utils/Functions';
import HeaderBg from 'components/Common/HeaderBg';
import {useWallet} from 'context/Wallet';
import {useUser} from 'context/User';
import {useUserInfo} from 'context/User/utils';
import {useMoney} from 'context/Wallet/utils';
import ListBank from 'components/Wallet/Bank/ListBank';
// import FooterContainer from 'components/Auth/FooterContainer';

import {useBankInfo} from 'context/Wallet/utils';
import BankList from 'containers/Wallet/Bank/components/BankList';
import {BANK_TYPE} from 'context/Wallet/utils/bankInfo';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
const BankLinked = props => {
  const translation = useTranslation();
  const {walletInfo} = useWallet();
  const {listConnectBank, listDomesticBank, listInternationalBank} = walletInfo;
  const {onGetAllBank, onContinue} = useBankInfo();
  const {onGetConnectedBank} = useUserInfo();
  const {showMoney, setShowMoney} = useMoney();
  const {userInfo} = useUser();
  let {width} = useWindowDimensions();

  const Item = ({title, icon, screen, iconHeight, iconWidth}) => (
    <TouchableOpacity
      style={styles.alignCenter}
      onPress={() => {
        Navigator.navigate(screen);
      }}
    >
      <Image
        source={icon}
        style={[
          styles.mb3,
          {
            width: iconWidth ? iconWidth : scale(27),
            height: iconHeight ? scale(iconHeight) : scale(32),
          },
        ]}
        resizeMode="contain"
      />
      <Text centered color={Colors.white} bold fs="h6">
        {title}
      </Text>
    </TouchableOpacity>
  );
  const dataTest_1 = [
    {
      icon: Images.ConnectBank.Deposit,
      name: translation.top_up,
      screen: SCREEN.TOP_UP,
    },
    {
      icon: Images.ConnectBank.Withdraw,
      name: translation.withdraw,
      screen: SCREEN.WITHDRAW,
    },
    {
      icon: Images.ConnectBank.Exchange,
      name: translation.transfer,
      screen: SCREEN.TRANSFER,
    },
  ];

  const mapBank = () => {
    onContinue(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankPickerScreen,
    });
  };

  const onPressBank = () => {
    onContinue(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankDetail,
    });
  };

  return (
    //TODO: Translate
    <>
      <HeaderBg>
        <Header back title={'Ví của tôi'} />

        <View style={[base.row, styles.block1]}>
          {!showMoney ? (
            <Text
              style={[styles.pr1, styles.pt2, styles.textSize2]}
              color={Colors.white}
            >
              ******
            </Text>
          ) : (
            <TouchableOpacity onPress={onGetConnectedBank} style={styles.pr1}>
              <Text bold color={Colors.white}>
                {formatMoney(userInfo?.myWallet, true)}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setShowMoney(!showMoney)}>
            <Icon
              icon={showMoney ? Images.Eye : Images.EyeGray}
              size={20}
              tintColor={Colors.white}
            />
          </TouchableOpacity>
        </View>

        <Row space={1}>
          {dataTest_1.map((item, index) => (
            <Col
              width={'33.333%'}
              space={1}
              key={index}
              style={[styles.mb4, styles.alignCenter]}
            >
              <Item title={item.name} icon={item.icon} screen={item.screen} />
            </Col>
          ))}
        </Row>
      </HeaderBg>

      <View style={[styles.container, styles.pt1]}>
        <Image
          source={Images.Kyc.Wave}
          resizeMode="stretch"
          style={[styles.bgImg1, {width: width}]}
        />

        <ScrollView>
          <View style={[styles.wrap, styles.pb1]}>
            <Text bold fs="h6" mb={12}>
              Thêm ngân hàng nhận tiền
            </Text>

            <TouchableOpacity
              style={[base.row, styles.btnAddBank]}
              onPress={mapBank}
            >
              <View style={styles.flex1}>
                <Text color={Colors.black} fs="h6">
                  {translation.add_bank_account}
                </Text>
              </View>
              <Image
                source={Images.ConnectBank.Plus}
                style={styles.iconPlus}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <BankList
            title={translation.bank_linking}
            key={'ListBankConnect'}
            type={BANK_TYPE.LIST_BANK_CONNECT}
            callback={onPressBank}
            navigation={props?.navigation}
          />
        </ScrollView>
      </View>

      {/* <FooterContainer
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          paddingBottom: Spacing.PADDING * 1.5
        }}>
        <Button
          label={translation.connect_bank}
          onPress={() => Navigator.navigate(SCREEN.BANK_LIST)}
        />
      </FooterContainer> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  //---------------
  wrap: {paddingHorizontal: Spacing.PADDING},
  //---------------
  flex1: {flex: 1},
  //---------------
  alignCenter: {alignItems: 'center'},
  //---------------
  mb1: {marginBottom: Spacing.PADDING},
  mb2: {marginBottom: 15},
  mb3: {marginBottom: 8},
  mb4: {marginBottom: 16},
  //---------------
  ptb1: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  //---------------
  pt1: {paddingTop: 30},
  pt2: {paddingTop: 12},
  //---------------
  pb1: {paddingBottom: 8},
  //---------------
  pr1: {paddingRight: 7},
  //---------------
  textSize1: {fontSize: 18},
  textSize2: {fontSize: 25},
  //---------------
  block1: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    marginTop: 7,
    marginBottom: 25,
  },
  //---------------
  blockShadow: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
  bgImg1: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 400,
  },
  btnAddBank: {
    marginBottom: Spacing.PADDING,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.cl4,
    borderRadius: 8,
  },
  iconPlus: {
    width: scale(24),
    height: scale(24),
  },
});

export default BankLinked;

import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import Header from '../../../Atoms/Header';
import Icon from '../../../Atoms/Icon';
import Text from '../../../Atoms/Text';
import Row from '../../../Atoms/Row';
import Col from '../../../Atoms/Col';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import {formatMoney, scale} from '../../../Utils/Functions';
import HeaderBg from '../../../Atoms/HeaderBg';
/* import ListBank from '../../../Groups/Bank'; */
// import FooterContainer from 'components/Auth/FooterContainer';

const BankLinked = () => {
  const translation = require('../../../../Context/Language/vi.json');
  const [showMoney, setShowMoney] = useState(false);
  let {width} = useWindowDimensions();

  const dataTest_1 = [
    {
      icon: Images.ConnectBank.Deposit,
      name: translation.top_up,
    },
    {
      icon: Images.ConnectBank.Withdraw,
      name: translation.withdraw,
    },
    {
      icon: Images.ConnectBank.Exchange,
      name: translation.transfer,
    },
  ];
  const dataTest_2 = [
    {
      icon: Images.ConnectBank.logoAgribank,
      name: 'Agribank',
    },
    {
      icon: Images.ConnectBank.logoBidv,
      name: 'BIDV',
    },
    {
      icon: Images.ConnectBank.logoVcb,
      name: 'Vietcombank',
    },
    {
      icon: Images.ConnectBank.logoVtb,
      name: 'Vietinbank',
    },
    {
      icon: Images.ConnectBank.logoExb,
      name: 'Eximbank',
    },
    {
      icon: Images.ConnectBank.logoHdb,
      name: 'HDbank',
    },
    {
      icon: Images.ConnectBank.logoMbb,
      name: 'MBbank',
      iconHeight: 13,
    },
    {
      icon: Images.ConnectBank.logoScob,
      name: 'Sacombank',
    },
    {icon: Images.ConnectBank.logoScb, name: 'SCB'},
    {
      icon: Images.ConnectBank.logoVbb,
      name: 'VPbank',
    },
    {icon: Images.ConnectBank.logoShb, name: 'SHB'},
    {
      icon: Images.ConnectBank.logoTpb,
      name: 'TPbank',
    },
  ];

  const Item = ({title, icon, screen, iconHeight, iconWidth}) => (
    <TouchableOpacity style={styles.alignCenter}>
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

  const renderListBank = banks => {
    if (banks && banks.length !== 0) {
      return (
        <Row space={5}>
          {banks.map((item, index) => {
            return (
              <Col width={`33.333%`} space={5} key={index} style={styles.mb2}>
                <Pressable style={styles.alignCenter}>
                  <Image
                    source={Images.ConnectBank.logoAgribank}
                    style={[
                      styles.mb3,
                      {
                        width: scale(27),
                        height: scale(32),
                      },
                    ]}
                    resizeMode="contain"
                  />

                  <Text centered color={Colors.white} bold fs="h6">
                    {item?.BankName}
                  </Text>
                </Pressable>
              </Col>
            );
          })}
        </Row>
      );
    } else {
      return <Text>Chưa có</Text>;
    }
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
              color={Colors.white}>
              ******
            </Text>
          ) : (
            <TouchableOpacity style={styles.pr1}>
              <Text bold color={Colors.white}>
                7.000000 vnđ
              </Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity onPress={() => setShowMoney(!showMoney)}>
            <Icon
              icon={showMoney ? Images.Eye : Images.EyeGray}
              size={20}
              tintColor={Colors.white}
            />
          </TouchableOpacity> */}
        </View>

        <Row space={1}>
          {dataTest_1.map((item, index) => (
            <Col
              width={`33.333%`}
              space={1}
              key={index}
              style={[styles.mb4, styles.alignCenter]}>
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

            <TouchableOpacity style={[base.row, styles.btnAddBank]}>
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

            <View style={[styles.blockShadow, styles.ptb1, styles.mb1]}>
              <Text color={Colors.black} bold mb={16} style={styles.textSize1}>
                {translation.bank_linking}
              </Text>
              {/* {renderListBank} */}

              {/* use component ListBank to test layout,
                delete when no use 
                * component ListBank will not be use in future,
                remember to delete it*/}
              {/* <ListBank listBank={dataTest_2} /> */}
            </View>

            <View style={[styles.blockShadow, styles.ptb1]}>
              <Text color={Colors.black} bold mb={16} style={styles.textSize1}>
                {translation.bank_linking}
              </Text>
              {/* <ListBank listBank={dataTest_2} /> */}
            </View>
          </View>
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
  pb1: {paddingBottom: 40},
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

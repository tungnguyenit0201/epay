import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import {Button, Header, HeaderBg, Text} from 'components';
import {Colors, Images, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import FooterContainer from 'components/Auth/FooterContainer';

const VerifySuccess = () => {
  const translation = useTranslation();
  let {width} = useWindowDimensions();
  return (
    // TODO: translate
    <>
      <View style={[styles.pb1, styles.bgWhite]}>
        <HeaderBg>
          {/* <Header title={translation?.account_verification}/> */}
          <View>
            <Text centered fs="h6" color={Colors.white} bold mb={5}>
              {translation?.account_verification}
            </Text>
          </View>
        </HeaderBg>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.alignCenter}>
          <View style={[styles.w1, styles.pxy1]}>
            <Image
              source={Images.Kyc.Test}
              style={[styles.fullWidth, styles.h1, styles.circleRadius]}
              resizeMode="contain"
            />
            <Image
              source={Images.Kyc.BigCircle}
              style={[
                styles.absolute,
                styles.topZero,
                styles.leftZero,
                styles.iconBigCircle,
              ]}
            />
            <Image
              source={Images.Kyc.SpecialArrow}
              style={[
                styles.absolute,
                styles.bot1,
                styles.right1,
                styles.iconArrow,
              ]}
            />
          </View>
        </View>

        <View style={styles.alignCenter}>
          <Text
            centered
            fs="h5"
            mt={25}
            mb={Spacing.PADDING - 4}
            bold
            style={styles.maxWidth1}>
            Thông tin của bạn đã gửi đi và đang chờ duyệt
          </Text>
          <Text centered style={styles.maxWidth1}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </View>
      </ScrollView>
      <Image
        source={Images.Kyc.Wave}
        resizeMode="stretch"
        style={[
          styles.absolute,
          styles.botZero,
          styles.rightZero,
          {
            width: width,
            height: 400,
          },
        ]}
      />

      <FooterContainer
        style={[
          styles.absolute,
          styles.botZero,
          styles.leftZero,
          styles.fullWidth,
          styles.pb2,
        ]}>
        <Button
          type={1}
          label={translation?.back_to_home_page}
          style={styles.btn}
          onPress={() => Navigator.navigate(SCREEN.TAB_NAVIGATION)}
        />
      </FooterContainer>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  //---------------
  alignCenter: {alignItems: 'center'},
  //---------------
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  leftZero: {left: 0},
  rightZero: {right: 0},
  botZero: {bottom: 0},
  //---------------
  bot1: {bottom: 8},
  //---------------
  right1: {right: 6},
  fullWidth: {width: '100%'},
  //---------------
  w1: {width: 130},
  //---------------
  maxWidth1: {maxWidth: 300},
  //---------------
  h1: {height: 110},
  //---------------
  pxy1: {padding: 10},
  //---------------
  pb1: {paddingBottom: 70},
  pb2: {paddingBottom: Spacing.PADDING * 2},
  //---------------
  bgWhite: {backgroundColor: Colors.white},
  //---------------
  circleRadius: {borderRadius: 100},
  //---------------
  iconBigCircle: {
    width: 130,
    height: 130,
  },
  iconArrow: {
    width: 25,
    height: 30,
  },
  // btn: {
  //   position: 'absolute',
  //   bottom: Spacing.PADDING * 4,
  // },
});
export default VerifySuccess;

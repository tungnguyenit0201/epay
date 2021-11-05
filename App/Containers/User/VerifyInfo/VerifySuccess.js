import React, {useMemo} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import {Button, HeaderBg, Text, Header, FooterContainer} from 'components';
import {Colors, Images, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useUser} from 'context/User';
import WebView from 'components/WebView/Partial';
import {scale} from 'utils/Functions';
const VerifySuccess = ({route}) => {
  const {resultContent = {}, KYCFlow} = route?.params || {};
  const {title, message, success} = resultContent;
  const {userInfo} = useUser();
  const avatar = userInfo?.personalInfo?.Avatar
    ? {uri: userInfo.personalInfo.Avatar}
    : Images.User;
  const translation = useTranslation();
  let {width} = useWindowDimensions();
  const waveImageStyle = {
    width: width,
    height: 400,
  };

  const action = useMemo(() => {
    switch (KYCFlow) {
      case 'bank': //ToDo
        return {
          doneTitle: '',
          backTitle: '',
          onDone: () => Navigator.reset('BankScreen'),
          onBack: () => Navigator.reset('BankScreen'),
        };
      default:
        return {
          doneTitle: translation?.homePage,
          backTitle: translation?.back_to_home_page,
          onDone: () => Navigator.reset(SCREEN.TAB_NAVIGATION),
          onBack: () => Navigator.reset(SCREEN.TAB_NAVIGATION),
        };
    }
  }, [KYCFlow, translation]);

  const onPressDone = () => {
    const {onDone} = action;
    onDone();
  };

  const onPressBack = () => {
    const {onBack} = action;
    onBack();
  };

  return (
    <>
      <View style={[styles.pb1, styles.bgWhite]}>
        <HeaderBg>
          {/* <View>
            <Text centered fs="h6" color={Colors.bs4} bold mb={5}>
              {translation?.account_verification}
            </Text>
          </View> */}
          <Header back title={translation?.account_verification} />
        </HeaderBg>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.alignCenter}>
          <View style={[styles.w1, styles.pxy1]}>
            <>
              <Image
                source={avatar}
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
            </>
          </View>
        </View>

        <View style={styles.alignCenter}>
          <Text
            centered
            fs="h5"
            mt={25}
            mb={Spacing.PADDING - 4}
            bold
            style={styles.maxWidth1}
          >
            {title}
          </Text>
        </View>
        {!!message && (
          <WebView
            style={[styles.maxWidth1, styles.ml]}
            source={{
              html: ` ${message}`,
            }}
          />
        )}
      </ScrollView>
      <Image
        source={Images.Kyc.Wave}
        resizeMode="stretch"
        style={[
          styles.absolute,
          styles.botZero,
          styles.rightZero,
          waveImageStyle,
        ]}
      />

      <FooterContainer>
        <Button
          label={action.doneTitle}
          style={styles.btn}
          onPress={onPressDone}
        />
      </FooterContainer>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bs4,
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
  bgWhite: {backgroundColor: Colors.bs4},
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonHalf: {
    flex: 0.48,
  },
  homeButton: {
    backgroundColor: Colors.bs4,
    borderColor: Colors.grd3,
    borderWidth: 1,
  },
  homeText: {
    color: Colors.grd3,
  },
  warningIcon: {
    width: 64,
    height: 52,
    alignSelf: 'center',
  },
  ml: {
    marginLeft: scale(50),
  },
});
export default VerifySuccess;

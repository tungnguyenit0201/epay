import React, {useMemo} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import {Button, HeaderBg, Text} from 'components';
import {Colors, Images, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import FooterContainer from 'components/Auth/FooterContainer';
import {useUser} from 'context/User';

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
            {success ? (
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
            ) : (
              <Image
                source={Images.warning}
                style={styles.warningIcon}
                resizeMode="contain"
              />
            )}
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
            {title}
          </Text>
          {!!message && (
            <Text centered style={styles.maxWidth1}>
              {message}
            </Text>
          )}
        </View>
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
        {success ? (
          <Button
            label={action.doneTitle}
            style={styles.btn}
            onPress={onPressDone}
          />
        ) : (
          <View style={styles.buttonRow}>
            <Button
              label={action.backTitle}
              style={[styles.buttonHalf, styles.homeButton]}
              onPress={onPressBack}
              bgImg={0}
              labelStyle={styles.homeText}
            />
            <Button
              label={translation?.verifyAgain}
              style={styles.buttonHalf}
              onPress={() => Navigator.navigate(SCREEN.CHOOSE_IDENTITY_CARD)}
            />
          </View>
        )}
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonHalf: {
    flex: 0.48,
  },
  homeButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  homeText: {
    color: Colors.primary,
  },
  warningIcon: {
    width: 64,
    height: 52,
    alignSelf: 'center',
  },
});
export default VerifySuccess;

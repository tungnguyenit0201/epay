import React, {useState, useCallback, useEffect} from 'react';
import DashedLine from 'react-native-dashed-line';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import Text from '../../../Atoms/Text';
import Button from '../../../Atoms/Button';
import Icon from '../../../Atoms/Icon';
import Wrapper from '../../../Groups/Wrapper';
import FooterContainer from '../../../Atoms/FooterContainer';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import _ from 'lodash';
/* import FooterContainer from 'components/Auth/FooterContainer'; */
import {formatMoney} from '../../../Utils/Functions';
const TRANS_DETAIL = {
  SERVICE: [
    {value: 0, label: 'all'},
    {value: 1, label: 'top_up'},
    {value: 2, label: 'withdraw'},
    {
      value: 3,
      label: 'transfer',
    },
    {
      value: 4,
      label: 'automatically_top_up',
    },
    {
      value: 5,
      label: 'receive',
    },
    {
      values: [6, 9],
      value: '6,9',
      label: 'bill_pay',
    },
  ],
  STATUS: {
    0: 'all',
    1: 'successful',
    2: 'failed',
    3: 'processing',
  },
};
const ToggleRightText = ({text}) => {
  const [textShown, setTextShown] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [numLines, setNumLines] = useState(undefined);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };
  useEffect(() => {
    setNumLines(textShown ? undefined : 2);
  }, [textShown]);

  //show link show more/less if line length > 2
  const onTextLayout_1 = useCallback(
    e => {
      if (e.nativeEvent.lines.length > 2 && !textShown) {
        setShowMoreButton(true);
        setNumLines(2);
      }
    },
    [textShown],
  );

  return (
    <>
      <Text
        fs="md"
        bold
        style={[styles.textRight]}
        onTextLayout={onTextLayout_1}
        numberOfLines={numLines}>
        {text}
      </Text>
      {showMoreButton && (
        <Text
          onPress={toggleTextShown}
          style={[styles.textRight]}
          color={Colors.cl1}
          bold>
          {textShown ? 'Thu gọn' : 'Xem thêm'}
        </Text>
      )}
    </>
  );
};

const LinkingResult = ({route}) => {
  const translation = require('../../../../Context/Language/vi.json');

  const blue = '#FAFCFF';
  const blue_1 = '#1F5CAB';

  return (
    <Wrapper>
      <HeaderBg>
        <Header back title={translation?.transaction_details} />
      </HeaderBg>
      <ScrollView style={styles.bgWhite}>
        <View style={[styles.pt1, {backgroundColor: blue}]}>
          <View style={[styles.alignCenter, styles.wrap, styles.pb1]}>
            <Image
              source={Images.TransactionHistory.Fail.default}
              style={styles.iconSuccess}
              resizeMode="contain"
            />
          </View>

          <View style={[styles.alignCenter, styles.pb2]}>
            <Text fs="h5" bold style={styles.maxWidth1} centered mb={7}>
              {`Liên kết không thành công`}
            </Text>
            <View style={styles.mt2}>
              <Text fs="md" centered color={Colors.gray}>
                {`Lý do liên kết không thành công`}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Image source={require('images/wave.png').default} style={styles.bgImg} />
      <FooterContainer>
        <Image
          source={require('images/storybook/double.png').default}
          style={[base.buttonSB, {width: 350, marginLeft: -5}]}
        />
      </FooterContainer>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING - 4},
  //------------------
  flexRow: {flexDirection: 'row'},
  flex1: {flex: 1},
  //------------------
  alignCenter: {alignItems: 'center'},
  //------------------
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  rightZero: {right: 0},
  botZero: {bottom: 0},
  leftZero: {left: 0},
  //------------------
  haftWidth: {width: '50%'},
  //------------------
  maxWidth1: {maxWidth: 291},
  //margin and padding
  mt1: {marginTop: 12},
  //------------------
  mt2: {marginTop: 15},
  //------------------
  mb2: {marginBottom: 32},
  //------------------
  px1: {paddingHorizontal: 17},
  px2: {paddingHorizontal: 12},
  //------------------
  py1: {paddingVertical: 11},
  py2: {paddingVertical: 5},
  //------------------
  pt1: {paddingTop: 22},
  pt2: {paddingTop: 13},
  //------------------
  pr1: {paddingRight: 5},
  //------------------
  pb1: {paddingBottom: 22},
  pb2: {paddingBottom: 38},
  pb3: {paddingBottom: 13},
  //end
  textRight: {textAlign: 'right'},
  //-----------------
  bgWhite: {backgroundColor: Colors.white},
  //-----------------
  borderRadius1: {borderRadius: 8},
  //-----------------
  iconSuccess: {
    width: 50,
    height: 50,
  },
  logoBg: {
    width: 109,
    height: 101,
  },
  iconPhone: {
    width: 17,
    height: 17,
  },
  blockShadow: {
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1.8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
  bgImg: {
    width: 375,
    height: 375,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
export default LinkingResult;

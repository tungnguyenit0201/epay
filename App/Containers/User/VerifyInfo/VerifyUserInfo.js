import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Text, InputBlock, Header, Button, HeaderBg} from 'components';
import {base, Images, Colors, Spacing} from 'themes';
import {IC_TPYE, SCREEN} from 'configs/Constants';
import Progress from 'components/User/VerifyInfo/Progress';
import {useVerifyInfo} from 'context/User/utils';
import SelectImage from 'components/User/VerifyInfo/SelectImage';
import DropImage from 'components/User/VerifyInfo/DropImage';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import Modal from 'react-native-modal';
import _ from 'lodash';
import Row from 'components/Common/Row';
import Col from 'components/Common/Col';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

const VerifyUserInfo = ({route}) => {
  const {disabledIdentify, onChange, onContinue, verifyInfo} = useVerifyInfo(
    route?.params,
  );
  const translation = useTranslation();
  const identityCard = _.get(route, 'params.identifyCard.ICType', IC_TPYE.CMND);
  const [showModal, setShowModal] = useState(false);
  const ruleTexts = [
    'Hình chụp phải đủ sáng, không bị mờ, chói sáng.',
    'Chứng từ phải nguyên vẹn, không mất góc.',
    'Chứng từ là bản gốc, còn hạn sử dụng.',
  ];

  const listFailedIndetityCard = [
    {img: Images.VerifyUserInfo.cmndBlur, title: 'Chụp bị mờ'},
    {img: Images.VerifyUserInfo.cmndDark, title: 'Dư, thiếu sáng'},
    {img: Images.VerifyUserInfo.cmndFail, title: 'Chụp mất góc'},
  ];

  const onShowModal = () => {
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };
  return (
    //TODO: translate
    <>
      <HeaderBg style={[styles.bgWhite, styles.headerContainer]}>
        <Header back title={translation?.account_verification} />
        <TouchableOpacity onPress={onShowModal} style={styles.guildBtn}>
          <Text fs="md" color={Colors.white}>
            Hướng dẫn
          </Text>
        </TouchableOpacity>
        <Progress step={1} />
        <Image
          source={Images.VerifyUserInfo.iconDown}
          style={[styles.triangleDown, styles.triangleDownImg]}
          resizeMode="contain"
        />
      </HeaderBg>
      <ScrollView style={styles.container}>
        <DropImage
          title="Ảnh mặt trước" // TODO: translate
          onDropImage={value => {
            onChange('ICFrontPhoto', value);
            identityCard == IC_TPYE.PASSPORT &&
              onChange('ICBackPhoto', value?.data);
          }}
          identify={identityCard}
          draft={verifyInfo?.ICFrontPhoto}
          style={styles.mb3}
        />
        {identityCard != IC_TPYE.PASSPORT && (
          <DropImage
            title="Ảnh mặt sau" // TODO: translate
            onDropImage={value => {
              onChange('ICBackPhoto', value);
            }}
            draft={verifyInfo?.ICBackPhoto}
            style={styles.mb3}
          />
        )}
      </ScrollView>
      <View style={base.bgWhite}>
        <View style={[styles.btnBottom, base.shadow]}>
          <Button
            disabled={!verifyInfo?.ICFrontPhoto || !verifyInfo?.ICBackPhoto}
            label="Tiếp tục" // TODO: translate
            onPress={() => onContinue(SCREEN.VERIFY_IDENTITY_CARD)}
          />
        </View>
      </View>
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={[styles.widthFull, styles.mlZero, styles.mbZero]}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        onBackdropPress={onHideModal}>
        <View
          style={[
            styles.modalContainer,
            styles.absolute,
            styles.widthFull,
            styles.ptbZero,
            styles.botZero,
          ]}>
          <ScrollView style={[styles.wrap, styles.pt2]}>
            <View style={[styles.mb1, styles.alignCenter]}>
              <Text
                bold
                fs="h4"
                centered
                color={Colors.cl1}
                style={[styles.height1, styles.maxWidth1]}>
                Hướng dẫn chụp hình 2 mặt chứng từ
              </Text>
            </View>

            <Text bold fs="h6" mb={16}>
              GTTT phải đảm bảo các yêu cầu dưới đây:
            </Text>

            {ruleTexts.map((e, index) => (
              <View
                key={index}
                style={[
                  styles.flexRow,
                  styles.mb3,
                  // index<(ruleTexts.length-1)&& {marginBottom: 10},
                ]}>
                <Image
                  source={Images.VerifyUserInfo.tick}
                  style={[styles.tickIcon, styles.mr1]}
                />
                <Text bold fs="h6" color={Colors.gray} style={styles.flex1}>
                  {e}
                </Text>
              </View>
            ))}
            <Text bold fs="h6" mb={24}>
              Những trường hợp chụp GTTT sai:
            </Text>

            <Row space={16}>
              {listFailedIndetityCard.map((e, index) => (
                <Col width="33.3333%" space={16} key={index} style={styles.mb2}>
                  <View style={styles.ptb1}>
                    <Image
                      source={e.img}
                      style={[styles.widthFull, styles.height1]}
                      resizeMode="contain"
                    />

                    <Image
                      source={Images.VerifyUserInfo.topLeftAngle}
                      style={[
                        styles.angle,
                        styles.absolute,
                        styles.topZero,
                        styles.leftZero,
                      ]}
                      resizeMode="contain"
                    />
                    <Image
                      source={Images.VerifyUserInfo.topRightAngle}
                      style={[
                        styles.angle,
                        styles.absolute,
                        styles.topZero,
                        styles.rightZero,
                      ]}
                      resizeMode="contain"
                    />
                    <Image
                      source={Images.VerifyUserInfo.botLeftAngle}
                      style={[
                        styles.angle,
                        styles.absolute,
                        styles.botZero,
                        styles.leftZero,
                      ]}
                      resizeMode="contain"
                    />
                    <Image
                      source={Images.VerifyUserInfo.botRightAngle}
                      style={[
                        styles.angle,
                        styles.absolute,
                        styles.botZero,
                        styles.rightZero,
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                  <Text bold fs="md" centered mt={8}>
                    {e.title}
                  </Text>
                </Col>
              ))}
            </Row>
          </ScrollView>

          <View
            style={[styles.wrap, styles.py1, styles.bgWhite, styles.blockBtn]}>
            <Button label="Đã hiểu" bold onPress={onHideModal} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Spacing.PADDING,
  },
  wrap: {paddingHorizontal: Spacing.PADDING},
  flexRow: {flexDirection: 'row'},
  flex1: {flex: 1},
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  leftZero: {left: 0},
  rightZero: {right: 0},
  botZero: {bottom: 0},
  widthFull: {width: '100%'},
  maxWidth1: {maxWidth: 270},
  height1: {height: 65},
  mlZero: {marginLeft: 0},
  mr1: {marginRight: 9},
  mbZero: {marginBottom: 0},
  mb1: {marginBottom: 32},
  mb2: {marginBottom: 16},
  mb3: {marginBottom: 10},
  py1: {paddingVertical: Spacing.PADDING},
  pt2: {paddingTop: 37},
  ptbZero: {padding: 0},
  ptb1: {padding: 4},
  bgWhite: {backgroundColor: Colors.white},
  headerContainer: {
    position: 'relative',
    paddingBottom: 0,
    marginBottom: 0,
    zIndex: 1,
  },
  guildBtn: {
    position: 'absolute',
    right: 20,
    top: 72,
  },
  alignCenter: {alignItems: 'center'},
  triangleDown: {
    position: 'absolute',
    left: Spacing.PADDING * 2 + 10 / 2,
    bottom: -9,
  },
  triangleDownImg: {
    width: 20,
    height: 10,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
  },
  tickIcon: {
    width: scale(13),
    height: scale(13),
  },
  angle: {
    width: 8,
    height: 8,
  },
  blockBtn: {
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
  btnBottom: {
    padding: Spacing.PADDING,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    // marginBottom: Spacing.PADDING,
  },
});

export default VerifyUserInfo;
